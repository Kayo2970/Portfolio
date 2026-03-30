import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    port: string;
    path: string[];
  };
}

async function handler(request: NextRequest, { params }: RouteParams) {
  const { port, path } = params;
  const pathStr = path ? path.join('/') : '';
  const searchParams = request.nextUrl.searchParams.toString();
  const targetUrl = `http://localhost:${port}/${pathStr}${searchParams ? `?${searchParams}` : ''}`;

  // Forward original headers, strip host so it doesn't conflict
  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.set('host', `localhost:${port}`);
  forwardHeaders.delete('x-forwarded-for');
  forwardHeaders.delete('x-forwarded-host');
  forwardHeaders.delete('x-forwarded-proto');

  // Read body for methods that support it
  let body: BodyInit | null = null;
  if (!['GET', 'HEAD'].includes(request.method)) {
    body = await request.arrayBuffer();
  }

  try {
    const upstream = await fetch(targetUrl, {
      method: request.method,
      headers: forwardHeaders,
      body: body ?? undefined,
      // @ts-ignore - duplex needed for streaming in some Node versions
      duplex: 'half',
      redirect: 'manual',
    });

    // Build response headers, stripping problematic hop-by-hop headers
    const responseHeaders = new Headers();
    upstream.headers.forEach((value, key) => {
      const skip = ['transfer-encoding', 'connection', 'keep-alive', 'upgrade'];
      if (!skip.includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    // Handle redirects from the upstream — rewrite location to go through proxy
    const location = upstream.headers.get('location');
    if (location) {
      try {
        const redirectUrl = new URL(location);
        const rewrittenLocation = `/api/proxy/${port}${redirectUrl.pathname}${redirectUrl.search}`;
        responseHeaders.set('location', rewrittenLocation);
      } catch {
        // relative redirect — pass through as-is
      }
    }

    return new NextResponse(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  } catch (err: any) {
    // Port is not responding
    return NextResponse.json(
      { error: `Project not running on port ${port}` },
      { status: 502 }
    );
  }
}

export const GET     = handler;
export const POST    = handler;
export const PUT     = handler;
export const PATCH   = handler;
export const DELETE  = handler;
export const HEAD    = handler;
export const OPTIONS = handler;
