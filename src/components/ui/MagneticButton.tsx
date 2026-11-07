import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type MagneticButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  children: ReactNode;
  className?: string;
};

const variantClasses = {
  primary:
    'bg-ink-100 text-ink-950 shadow-[0_0_40px_-8px_rgba(192,132,252,0.7)] hover:shadow-[0_0_56px_-6px_rgba(255,46,136,0.8)]',
  ghost: 'glass text-ink-100 hover:bg-white/10 hover:border-white/25',
};

export default function MagneticButton({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = `group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 ${variantClasses[variant]} ${className}`;

  return (
    <motion.div
      ref={wrapperRef}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      {href ? (
        <a href={href} data-cursor="hover" className={classes}>
          {children}
        </a>
      ) : (
        <button type="button" onClick={onClick} data-cursor="hover" className={classes}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
