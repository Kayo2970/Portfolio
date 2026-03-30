'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { runSyncEngine } from '@/app/actions/sync';

export function SyncButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{success: boolean, message: string} | null>(null);

  const handleSync = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await runSyncEngine();
      if (res.success) {
        // Force a hard refresh to pull the new projects.json into view 
        window.location.reload();
      } else {
        setResult(res);
      }
    } catch (e: any) {
      setResult({ success: false, message: e.message || 'Unknown error configuring sync' });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button 
        onClick={handleSync}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-1.5 bg-surface hover:bg-surface-hover border border-border hover:border-border-hover rounded-md text-sm font-medium transition-all text-text-muted hover:text-white"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-accent' : ''}`} />
        {loading ? 'Syncing repos...' : 'Sync GitHub'}
      </button>

      {result && !result.success && (
        <span className="text-[10px] text-red-400 font-mono tracking-wide mt-1 max-w-[200px] text-right">
          {result.message}
        </span>
      )}
    </div>
  );
}
