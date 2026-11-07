import type { ReactNode } from 'react';
import Reveal from '@/components/ui/Reveal';

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
};

export default function SectionHeader({ eyebrow, title, description, align = 'left' }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start';

  return (
    <div className={`flex max-w-3xl flex-col gap-6 ${alignment}`}>
      <Reveal>
        <span className="eyebrow">
          <span className="h-px w-8 bg-gradient-to-r from-electric-400 to-hotpink-500" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-5xl font-bold uppercase leading-[1.02] tracking-tight text-ink-100 sm:text-6xl lg:text-7xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
