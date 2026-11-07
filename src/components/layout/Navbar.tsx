import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Hexagon, Menu, X } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { navLinks, profile } from '@/lib/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(navLinks[0].href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#home" onClick={closeMenu} className="group flex items-center gap-3" data-cursor="hover">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-hotpink-500">
            <Hexagon className="h-5 w-5 text-ink-950 transition-transform duration-500 group-hover:rotate-90" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink-100">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={activeHref === link.href ? 'location' : undefined}
                data-cursor="hover"
                className={`relative text-sm transition-colors hover:text-ink-100 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gradient-to-r after:from-electric-400 after:to-hotpink-500 after:transition-all after:duration-300 hover:after:w-full ${
                  activeHref === link.href ? 'text-ink-100 after:w-full' : 'text-ink-200 after:w-0'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <MagneticButton href="#contact" variant="ghost" className="!px-5 !py-2.5">
            Let&apos;s Connect
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink-100 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-ink-950 md:hidden"
          >
            <ul className="flex flex-col gap-2 px-6 pt-8">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={activeHref === link.href ? 'location' : undefined}
                    className={`block border-b border-white/10 py-5 font-display text-4xl font-bold uppercase transition-colors hover:text-hotpink-400 ${
                      activeHref === link.href ? 'text-hotpink-300' : 'text-ink-100'
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
