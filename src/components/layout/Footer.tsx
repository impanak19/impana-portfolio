import { ArrowUp, Github, Hexagon, Instagram, Linkedin, type LucideIcon } from 'lucide-react';
import { profile, socialLinks } from '@/lib/content';

const socialIcons: Record<(typeof socialLinks)[number]['icon'], LucideIcon> = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-hotpink-500">
            <Hexagon className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink-100">{profile.name}</span>
        </div>

        <ul className="flex flex-wrap gap-3">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-cursor="hover"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ink-300 transition-all duration-300 hover:-translate-y-1 hover:border-electric-400/60 hover:text-ink-100"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            );
          })}
        </ul>

        <p className="text-sm text-ink-400">
          © {year} {profile.name}. All rights reserved.
        </p>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        data-cursor="hover"
        className="group absolute -top-7 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 via-hotpink-500 to-sunset-500 text-ink-950 shadow-[0_0_40px_-6px_rgba(255,46,136,0.8)] transition-transform duration-300 hover:-translate-y-1 lg:right-10"
      >
        <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
}
