import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink-950 px-6 text-center text-ink-100">
          <h1 className="font-display text-3xl font-bold uppercase">Something went wrong</h1>
          <p className="max-w-md text-ink-300">The page could not finish loading. Please refresh to try again.</p>
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
