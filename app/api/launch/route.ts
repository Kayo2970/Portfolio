import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const activeProjects: Record<string, number> = {};
let currentPort = 3001;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing project id' }, { status: 400 });
  }

  // Use the incoming host to build the redirect URL, so if accessed via a phone
  // (e.g. 192.168.1.5:3000), it redirects to 192.168.1.5:3001 instead of breaking on localhost.
  const hostValue = request.headers.get('host') || 'localhost';
  const hostname = hostValue.split(':')[0];
  const protocol = request.headers.get('x-forwarded-proto') || 'http';

  // If already running, redirect using the same hostname
  if (activeProjects[id]) {
    return NextResponse.redirect(`${protocol}://${hostValue}/api/proxy/${activeProjects[id]}/`);
  }

  const projectDir = path.resolve(process.cwd(), '..', id);
  if (!fs.existsSync(projectDir)) {
    return NextResponse.json({ error: 'Project directory not found locally at ' + projectDir }, { status: 404 });
  }

  const port = currentPort++;
  activeProjects[id] = port;

  try {
    // We pass both standard Next.js (-H 0.0.0.0) and Vite (--host 0.0.0.0) network binding
    // flags so the spun-up project isn't stuck behind `localhost` and can be accessed on phones!
    const child = spawn('npm', ['run', 'dev', '--', '-p', port.toString(), '--port', port.toString(), '-H', '0.0.0.0', '--host', '0.0.0.0'], {
      cwd: projectDir,
      detached: true,
      stdio: 'ignore',
      shell: true
    });
    
    child.unref();

    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Launch server-side screenshot crawler dynamically completely in the background
    const backendWorkerScript = path.resolve(process.cwd(), 'scripts', 'dynamic-screenshot.js');
    const worker = spawn('node', [backendWorkerScript, id, `http://localhost:${port}`], {
        detached: true,
        stdio: 'ignore',
        shell: true
    });
    worker.unref();

    return NextResponse.redirect(`${protocol}://${hostValue}/api/proxy/${port}/`);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to start project', details: error?.message || error?.toString() }, { status: 500 });
  }
}
