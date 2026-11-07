import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { about, profile } from '@/lib/content';

export default function About() {
  return (
    <section id="about" className="relative py-32 lg:py-44">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal y={60}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 rotate-6 rounded-[3rem] bg-gradient-to-br from-electric-600 via-cobalt-600 to-hotpink-500 opacity-40 blur-3xl animate-drift" />
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-3xl border border-hotpink-500/50 animate-float" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-800">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-[50%_20%] transition-all duration-1000 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-electric-600/60 via-cobalt-700/50 to-hotpink-600/60">
                    <span className="font-display text-8xl font-extrabold text-ink-100/90 animate-float">{profile.shortName}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              </div>
              <div className="glass absolute -bottom-6 -right-4 rounded-2xl px-6 py-5 sm:-right-8">
                <p className="font-display text-lg font-bold uppercase text-ink-100">{profile.name}</p>
                <p className="mt-1 text-sm text-ink-300">{profile.role}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-12 lg:col-span-6 lg:col-start-7">
          <SectionHeader eyebrow={about.eyebrow} title={<span className="text-4xl sm:text-5xl lg:text-6xl">{about.headline}</span>} />

          <div className="flex flex-col gap-5">
            {about.intro.map((paragraph, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <p className="text-lg leading-relaxed text-ink-300">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div>
              <h3 className="font-display text-sm uppercase tracking-[0.25em] text-ink-400">Interests</h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {about.interests.map((interest) => (
                  <li
                    key={interest}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-ink-200 transition-colors hover:border-electric-400/60 hover:text-ink-100"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div>
              <h3 className="font-display text-sm uppercase tracking-[0.25em] text-ink-400">Education</h3>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {about.education.map((item, index) => (
                  <li key={item.label} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:gap-6">
                    <span className="w-8 font-display text-sm text-hotpink-400">0{index + 1}</span>
                    <span className="w-32 shrink-0 text-sm uppercase tracking-[0.15em] text-ink-400">{item.label}</span>
                    <span className="text-base leading-relaxed text-ink-200">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
