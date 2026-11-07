import { Github, Instagram, Linkedin, Mail, Phone, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { profile, socialLinks } from '@/lib/content';

const socialIcons: Record<(typeof socialLinks)[number]['icon'], LucideIcon> = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
};

const emailDraftHref = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello Impana, I'd like to connect`)}`;
const phoneHref = `tel:${profile.phone.replace(/\s/g, '')}`;

type ContactLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  external?: boolean;
};

function ContactLink({ href, icon: Icon, label, value, external = false }: ContactLinkProps) {
  return (
    <a
      href={href}
      data-cursor="hover"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="glass group flex w-full items-center gap-4 rounded-2xl px-6 py-5 transition-colors hover:bg-white/10 sm:w-fit"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-cobalt-600">
        <Icon className="h-5 w-5 text-ink-100" />
      </span>
      <span className="flex flex-col">
        <span className="text-xs uppercase tracking-[0.2em] text-ink-400">{label}</span>
        <span className="font-medium text-ink-100 transition-colors group-hover:text-hotpink-300">{value}</span>
      </span>
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 lg:py-44">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-hotpink-500/20 blur-[140px] animate-drift" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cobalt-600/25 blur-[140px] animate-drift [animation-delay:-6s]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-gradient-to-r from-electric-400 to-hotpink-500" />
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-5xl font-bold uppercase leading-[1.02] tracking-tight text-ink-100 sm:text-6xl">
              Let&apos;s <span className="text-gradient">connect</span> and build what&apos;s next.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-md text-base leading-relaxed text-ink-300 sm:text-lg">
              Whether it is a project idea, an opportunity or just a conversation about technology, I would love to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-col gap-4">
              <ContactLink href={emailDraftHref} icon={Mail} label="Email" value={profile.email} />
              <ContactLink href={phoneHref} icon={Phone} label="Phone" value={profile.phone} />
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-ink-400">Elsewhere</span>
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
                        className="flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-sm text-ink-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-hotpink-500/60 hover:text-ink-100"
                      >
                        <Icon className="h-4 w-4" />
                        {social.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-electric-500/20 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
