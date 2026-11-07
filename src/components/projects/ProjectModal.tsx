import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import type { Project } from '@/lib/content';

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/80 p-6 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="glass relative w-full max-w-2xl overflow-hidden rounded-[2rem] p-8 sm:p-12"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              data-cursor="hover"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ink-100 transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-hotpink-300">{project.category}</p>
            <h3 id="project-modal-title" className="mt-4 pr-14 font-display text-3xl font-bold uppercase leading-[1.05] text-ink-100 sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-6 text-base leading-relaxed text-ink-300">{project.description}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-ink-200">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-100 px-6 py-3 text-sm font-semibold text-ink-950 transition-transform duration-300 hover:scale-105"
                >
                  Live demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-ink-100 transition-colors hover:bg-white/10"
                >
                  <Github className="h-4 w-4" />
                  GitHub repository
                </a>
              )}
              {!project.liveUrl && !project.repoUrl && (
                <p className="text-sm text-ink-400">Live demo and repository links will be added soon.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
