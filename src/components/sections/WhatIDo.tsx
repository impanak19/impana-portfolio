import { ArrowUpRight, BookOpen, Cpu, Layers, Lightbulb, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { services, type Service } from '@/lib/content';

const iconMap: Record<Service['icon'], LucideIcon> = {
  book: BookOpen,
  bulb: Lightbulb,
  cpu: Cpu,
  layers: Layers,
};

const accentStyles: Record<Service['accent'], { chip: string; text: string; glow: string }> = {
  electric: {
    chip: 'from-electric-400 to-electric-700',
    text: 'text-electric-300',
    glow: 'group-hover:shadow-[0_0_60px_-12px_rgba(168,85,247,0.7)]',
  },
  cobalt: {
    chip: 'from-cobalt-400 to-cobalt-700',
    text: 'text-cobalt-300',
    glow: 'group-hover:shadow-[0_0_60px_-12px_rgba(59,130,246,0.7)]',
  },
  hotpink: {
    chip: 'from-hotpink-400 to-hotpink-600',
    text: 'text-hotpink-300',
    glow: 'group-hover:shadow-[0_0_60px_-12px_rgba(255,46,136,0.7)]',
  },
  sunset: {
    chip: 'from-sunset-400 to-sunset-600',
    text: 'text-sunset-300',
    glow: 'group-hover:shadow-[0_0_60px_-12px_rgba(255,138,61,0.7)]',
  },
};

export default function WhatIDo() {
  return (
    <section id="services" className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="What I do"
            title={
              <>
                Four ways I <span className="text-gradient">shape</span> ideas
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-ink-300">
              The mindset I bring to every project, whether it is a course build or a concept I am exploring.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const accent = accentStyles[service.accent];

            return (
              <Reveal key={service.title} delay={index * 0.08}>
                <SpotlightCard className={`h-full min-h-[260px] ${accent.glow}`}>
                  <div className="flex h-full flex-col justify-between gap-10 p-8 sm:p-10">
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.chip} transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}
                      >
                        <Icon className="h-6 w-6 text-ink-950" strokeWidth={2.25} />
                      </span>
                      <span className="font-display text-sm tracking-[0.25em] text-ink-400">0{index + 1}</span>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-ink-100 sm:text-4xl">
                          {service.title}
                        </h3>
                        <ArrowUpRight
                          className={`h-6 w-6 shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 ${accent.text}`}
                        />
                      </div>
                      <p className="text-base leading-relaxed text-ink-300">{service.description}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
