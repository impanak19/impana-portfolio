import { lazy, Suspense, useState, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import ResumeButton from '@/components/ui/ResumeButton';
import { hero, profile } from '@/lib/content';
const EASE = [0.22, 1, 0.36, 1] as const;

const LiquidSculpture = lazy(() => import('@/components/hero/LiquidSculpture'));

type FloatingShapeProps = {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className: string;
  children: ReactNode;
};

function FloatingShape({ mx, my, depth, className, children }: FloatingShapeProps) {
  const x = useTransform(mx, (value: number) => value * depth * 28);
  const y = useTransform(my, (value: number) => value * depth * 28);

  return (
    <motion.div style={{ x, y }} className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      {children}
    </motion.div>
  );
}

function SculptureFallback() {
  return (
    <div className="absolute left-1/2 top-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-electric-500 via-hotpink-500 to-sunset-500 opacity-70 blur-[2px] animate-float" />
  );
}

export default function Hero() {
  const [section, setSection] = useState<HTMLElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20 });

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section
      id="home"
      ref={setSection}
      onPointerMove={handleMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-[72px]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-electric-600/35 blur-[120px] animate-drift" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[36rem] w-[36rem] rounded-full bg-cobalt-600/30 blur-[130px] animate-drift [animation-delay:-5s]" />
        <div className="absolute right-[18%] top-[30%] h-[22rem] w-[22rem] rounded-full bg-hotpink-500/25 blur-[110px] animate-drift [animation-delay:-9s]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050507_75%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      {section && (
        <div className="absolute inset-y-0 right-0 w-full lg:left-[34%] lg:w-[66%]" aria-hidden="true">
          <ErrorBoundary fallback={<SculptureFallback />}>
            <Suspense fallback={<SculptureFallback />}>
              <LiquidSculpture source={section} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      <FloatingShape mx={mx} my={my} depth={1.4} className="right-[8%] top-[20%] hidden sm:block">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-electric-500 via-hotpink-500 to-sunset-500 shadow-[0_0_60px_-10px_rgba(255,46,136,0.7)] animate-float" />
      </FloatingShape>

      <FloatingShape mx={mx} my={my} depth={0.8} className="bottom-[20%] left-[52%] hidden md:block">
        <div className="h-28 w-28 rounded-full border-2 border-cobalt-400/50 shadow-[0_0_40px_-6px_rgba(59,130,246,0.6)] animate-float [animation-delay:-2s]" />
      </FloatingShape>

      <FloatingShape mx={mx} my={my} depth={2.2} className="right-[22%] top-[62%] hidden md:block">
        <div
          className="h-16 w-16 bg-gradient-to-br from-sunset-400 to-hotpink-500 opacity-90 animate-float [animation-delay:-4s]"
          style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
        />
      </FloatingShape>

      <FloatingShape mx={mx} my={my} depth={1.1} className="left-[46%] top-[14%] hidden md:block">
        <div className="h-7 w-7 rounded-full bg-cobalt-400 shadow-[0_0_30px_8px_rgba(59,130,246,0.55)] animate-float [animation-delay:-1s]" />
      </FloatingShape>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="glass inline-flex items-center gap-3 rounded-full py-2 pl-3 pr-5 text-xs font-medium tracking-wide text-ink-200"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-success-500" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success-400" />
          </span>
          {profile.badge}
        </motion.div>

        <h1 className="mt-8 font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-ink-100">
          {hero.headline.map((word, index) => (
            <span key={word} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.25 + index * 0.13, ease: EASE }}
                className={`block ${index === hero.headline.length - 1 ? 'text-gradient' : ''}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          className="mt-8 font-display text-2xl font-bold uppercase tracking-tight text-gradient sm:text-3xl"
        >
          {profile.name} <span className="text-ink-400">/</span> {profile.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200 sm:text-xl"
        >
          {hero.intro}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
          className="mt-4 text-sm uppercase tracking-[0.25em] text-ink-400"
        >
          {hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#projects">
            View My Projects
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Let’s Connect
          </MagneticButton>
          <ResumeButton />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        data-cursor="hover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-300 transition-colors hover:text-ink-100"
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-2 w-1 rounded-full bg-gradient-to-b from-electric-400 to-hotpink-500"
          />
        </span>
      </motion.a>
    </section>
  );
}
