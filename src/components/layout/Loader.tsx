import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/lib/content';

type LoaderProps = {
  onComplete: () => void;
};

const DURATION_MS = 1800;

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const ratio = Math.min((now - start) / DURATION_MS, 1);
      setProgress(Math.round(ratio * 100));
      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    const timeout = window.setTimeout(onComplete, DURATION_MS + 450);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-12 h-20 w-20"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-500 via-hotpink-500 to-sunset-500 animate-gradient-shift" />
        <div className="absolute inset-[3px] flex items-center justify-center rounded-[14px] bg-ink-950">
          <span className="font-display text-2xl font-bold text-ink-100">{profile.shortName}</span>
        </div>
      </motion.div>

      <div className="flex w-64 flex-col gap-4">
        <div className="h-px w-full overflow-hidden bg-ink-700">
          <motion.div
            className="h-full bg-gradient-to-r from-electric-500 via-hotpink-500 to-sunset-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between font-display text-sm tracking-[0.3em] text-ink-400">
          <span>LOADING</span>
          <span className="tabular-nums text-ink-200">{String(progress).padStart(3, '0')}</span>
        </div>
      </div>
    </motion.div>
  );
}
