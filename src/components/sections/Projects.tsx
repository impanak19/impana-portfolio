import { useState } from 'react';
import { Car, ClipboardList, Compass, ArrowUpRight, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectModal from '@/components/projects/ProjectModal';
import { projects, type Project } from '@/lib/content';

const projectIcons: Record<Project['icon'], LucideIcon> = {
  car: Car,
  clipboard: ClipboardList,
  compass: Compass,
};

const accentStyles: Record<Project['accent'], { backdrop: string; orb: string; text: string }> = {
  electric: {
    backdrop: 'from-electric-600 via-cobalt-700 to-ink-900',
    orb: 'bg-electric-400',
    text: 'text-electric-300',
  },
  cobalt: {
    backdrop: 'from-cobalt-500 via-cobalt-700 to-ink-900',
    orb: 'bg-cobalt-300',
    text: 'text-cobalt-300',
  },
  hotpink: {
    backdrop: 'from-hotpink-500 via-electric-700 to-ink-900',
    orb: 'bg-hotpink-300',
    text: 'text-hotpink-300',
  },
  sunset: {
    backdrop: 'from-sunset-500 via-hotpink-700 to-ink-900',
    orb: 'bg-sunset-300',
    text: 'text-sunset-300',
  },
};

type ProjectCardProps = {
  project: Project;
  onView: () => void;
};

function ProjectCard({ project, onView }: ProjectCardProps) {
  const Icon = projectIcons[project.icon];
  const accent = accentStyles[project.accent];

  return (
    <article className="group relative isolate h-full overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 transition-shadow duration-700 hover:shadow-[0_40px_100px_-30px_rgba(59,130,246,0.45)]">
      <div className="relative h-[460px] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent.backdrop} transition-transform duration-[1400ms] ease-out group-hover:scale-110`} />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
          {[220, 300, 380].map((size, index) => (
            <span
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              style={{ width: size, height: size, opacity: 0.6 - index * 0.15 }}
            />
          ))}
          <span className={`absolute -right-24 -top-16 h-3 w-3 rounded-full ${accent.orb} animate-float`} />
        </div>
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
          <span className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/25 bg-ink-950/30 backdrop-blur-md transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110">
            <Icon className="h-12 w-12 text-ink-100" strokeWidth={1.75} />
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-8 sm:p-10">
        <span className={`w-fit rounded-full border border-white/15 bg-ink-950/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-md ${accent.text}`}>
          {project.category}
        </span>
        <h3 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-ink-100 sm:text-4xl">
          {project.title}
        </h3>
        <p className="line-clamp-3 max-w-md text-base leading-relaxed text-ink-200">{project.description}</p>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-ink-200">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-2 flex translate-y-0 opacity-100 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <button
            type="button"
            onClick={onView}
            data-cursor="hover"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ink-100 px-6 py-3 text-sm font-semibold text-ink-950 transition-transform duration-300 hover:scale-105"
          >
            View Project
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = projects.find((project) => project.id === activeId) ?? null;

  return (
    <section id="projects" className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Featured projects"
            title={
              <>
                Things I&apos;ve <span className="text-gradient">built</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-base leading-relaxed text-ink-300">
              Ideas I have explored while learning by building, from AI concepts to campus tools.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 0.1}>
              <ProjectCard project={project} onView={() => setActiveId(project.id)} />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveId(null)} />
    </section>
  );
}
