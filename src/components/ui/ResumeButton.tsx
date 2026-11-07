import { useEffect, useState } from 'react';
import { Download, FileClock } from 'lucide-react';
import { profile } from '@/lib/content';

type ResumeStatus = 'checking' | 'available' | 'missing';

export default function ResumeButton() {
  const [status, setStatus] = useState<ResumeStatus>('checking');

  useEffect(() => {
    const controller = new AbortController();

    fetch(profile.resumeUrl, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        const isPdf = (response.headers.get('content-type') ?? '').includes('pdf');
        setStatus(response.ok && isPdf ? 'available' : 'missing');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('missing');
      });

    return () => controller.abort();
  }, []);

  const baseClasses =
    'group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300';

  if (status !== 'available') {
    return (
      <span
        aria-disabled="true"
        className={`${baseClasses} cursor-not-allowed border border-white/10 text-ink-400`}
      >
        {status === 'checking' ? 'Checking resume' : 'Resume coming soon'}
        <FileClock className="h-4 w-4" />
      </span>
    );
  }

  return (
    <a
      href={profile.resumeUrl}
      download
      data-cursor="hover"
      className={`${baseClasses} border border-white/15 bg-white/[0.04] text-ink-100 backdrop-blur-md hover:-translate-y-0.5 hover:border-sunset-400/60 hover:bg-white/10`}
    >
      Download Resume
      <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
    </a>
  );
}
