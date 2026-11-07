import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer } from '@/hooks/useFinePointer';

export default function CustomCursor() {
  const isFine = useFinePointer();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!isFine) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest('a, button, [data-cursor="hover"]')));
    };
    const leave = (event: MouseEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('mouseout', leave);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('mouseout', leave);
    };
  }, [isFine, x, y]);

  if (!isFine) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-ink-100 mix-blend-difference"
      />
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 64 : 36,
          height: hovering ? 64 : 36,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? 'rgba(255,46,136,0.18)' : 'rgba(192,132,252,0)',
          borderColor: hovering ? 'rgba(255,46,136,0.9)' : 'rgba(192,132,252,0.7)',
        }}
        transition={{ duration: 0.25 }}
        className="absolute left-0 top-0 rounded-full border"
      />
    </div>
  );
}
