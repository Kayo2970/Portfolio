'use server';

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function runSyncEngine() {
  if (process.env.NODE_ENV !== 'development') {
    return { success: false, message: 'Security: Sync engine can only be run sequentially from a local development environment.' };
  }
  
  try {
    const { stdout, stderr } = await execAsync('npm run sync');
    if (stderr && !stdout) {
      return { success: false, message: stderr };
    }
    return { success: true, message: "Sync successful" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
