import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="text-accent mb-6">
        <svg className="w-16 h-16 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4 tracking-tight">You took a wrong turn.</h1>
      <p className="text-text-muted mb-8 max-w-md">
        This page doesn't exist — or the project has moved. Head back to the portal and find what you're looking for.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 border border-border-hover rounded-md text-sm font-medium hover:bg-surface-hover hover:border-white/30 transition-all duration-200"
      >
        Back to Portal
      </Link>
    </div>
  );
}
