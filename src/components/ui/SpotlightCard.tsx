import { useRef, type PointerEvent, type ReactNode } from 'react';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

export default function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/70 transition-colors duration-500 hover:border-white/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_var(--spot-x)_var(--spot-y),rgba(192,132,252,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
