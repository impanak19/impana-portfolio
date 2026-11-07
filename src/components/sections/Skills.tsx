import { motion } from 'framer-motion';
import { Code2, Globe, Wand2, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { skillGroups, type SkillGroup } from '@/lib/content';

const groupIcons: Record<SkillGroup['icon'], LucideIcon> = {
  code: Code2,
  globe: Globe,
  wand: Wand2,
};

const marqueeSkills = skillGroups.flatMap((group) => group.items);

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeSkills, ...marqueeSkills];

  return (
    <div className="relative overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className={`flex w-max gap-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {items.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="flex shrink-0 items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 font-display text-2xl font-semibold uppercase tracking-tight text-ink-100 transition-colors hover:border-hotpink-500/60 hover:text-hotpink-300 sm:text-3xl"
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-electric-400 to-sunset-400" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Skills"
          title={
            <>
              The toolkit <span className="text-gradient">behind</span> the work
            </>
          }
          description="The languages, tools and ideas I work with as I learn and build."
        />
      </div>

      <div className="mt-20 flex flex-col gap-4">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-6 px-6 md:grid-cols-3 lg:px-10">
        {skillGroups.map((group, index) => {
          const Icon = groupIcons[group.icon];
          return (
            <Reveal key={group.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="glass group h-full rounded-3xl p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-hotpink-500 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-ink-950" strokeWidth={2.25} />
                  </span>
                  <span className="font-display text-sm tracking-[0.25em] text-ink-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold uppercase text-ink-100">{group.title}</h3>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-ink-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cobalt-400/60 hover:text-ink-100"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
