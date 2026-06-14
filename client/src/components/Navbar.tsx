import { useState, useEffect } from 'react';
import { content, type Lang } from '@/lib/content';

interface NavbarProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  onBlogClick: () => void;
}

export default function Navbar({ lang, onLangChange, onBlogClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: t.demarche, id: 'demarche' },
    { label: t.sujets, id: 'sujets' },
    { label: t.expertises, id: 'expertises' },
    { label: t.clients, id: 'clients' },
    { label: t.apropos, id: 'apropos' },
    { label: t.contact, id: 'contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm"
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src="/uploads/logo-novaxone.png"
              alt="NovaXone"
              className="h-8 md:h-10 object-contain"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="nav-link text-sm font-semibold transition-colors duration-200 text-[#6e2b62] hover:text-[#9b3d8a]"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onBlogClick}
              className="nav-link text-sm font-semibold transition-colors duration-200 text-[#6e2b62] hover:text-[#9b3d8a]"
            >
              {t.blog}
            </button>

            {/* Lang toggle */}
            <div className="flex items-center gap-1 ml-2 border border-current/20 rounded-full px-2 py-1">
              <button
                onClick={() => onLangChange('fr')}
                className={`text-xs font-semibold px-1.5 py-0.5 rounded-full transition-all ${
                  lang === 'fr' ? 'bg-sky-500 text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                FR
              </button>
              <span className="text-xs text-slate-300">|</span>
              <button
                onClick={() => onLangChange('en')}
                className={`text-xs font-semibold px-1.5 py-0.5 rounded-full transition-all ${
                  lang === 'en' ? 'bg-sky-500 text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                EN
              </button>
            </div>
          </nav>

          {/* Mobile: lang + burger */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex items-center gap-1 border border-current/20 rounded-full px-2 py-1">
              <button
                onClick={() => onLangChange('fr')}
                className={`text-xs font-semibold px-1 ${lang === 'fr' ? 'text-sky-400' : 'text-slate-400'}`}
              >
                FR
              </button>
              <span className="text-xs text-slate-300">|</span>
              <button
                onClick={() => onLangChange('en')}
                className={`text-xs font-semibold px-1 ${lang === 'en' ? 'text-sky-400' : 'text-slate-400'}`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-slate-700"
              aria-label="Menu"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <nav className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left py-2.5 px-3 text-sm font-medium text-slate-700 hover:text-sky-500 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onBlogClick}
              className="text-left py-2.5 px-3 text-sm font-medium text-slate-700 hover:text-sky-500 hover:bg-slate-50 rounded-lg transition-colors"
            >
              {t.blog}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
