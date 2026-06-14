import { useEffect, useRef } from 'react';
import { content, type Lang } from '@/lib/content';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  lang: Lang;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const t = content[lang].hero;
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Stagger animation on mount
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  }, [lang]);

  const scrollToNext = () => {
    const el = document.getElementById('demarche');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(110,43,98,0.40) 0%, rgba(130,55,115,0.35) 45%, rgba(150,65,130,0.30) 100%)',
        backgroundColor: '#e0cedd',
      }}
    >
      {/* Background image — full width */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/uploads/fond-hero-whiteboard.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.55,
        }}
      />
      {/* Gradient overlay to blend image with left content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(110,43,98,0.45) 30%, rgba(110,43,98,0.25) 60%, rgba(110,43,98,0.05) 100%)',
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative numbers */}
        <span
          className="deco-number text-white select-none"
          style={{ top: '-2rem', right: '5%', opacity: 0.07, fontSize: 'clamp(8rem,20vw,18rem)' }}
        >
          60%
        </span>
        <span
          className="deco-number text-white select-none"
          style={{ bottom: '10%', left: '3%', opacity: 0.05, fontSize: 'clamp(5rem,12vw,11rem)' }}
        >
          25%
        </span>
        <span
          className="deco-number text-white select-none"
          style={{ top: '40%', right: '2%', opacity: 0.05, fontSize: 'clamp(4rem,8vw,8rem)' }}
        >
          15%
        </span>

        {/* Geometric circles */}
        <div
          className="absolute rounded-full border border-sky-400/20"
          style={{ width: 500, height: 500, top: '-100px', right: '-100px' }}
        />
        <div
          className="absolute rounded-full border border-sky-400/10"
          style={{ width: 300, height: 300, bottom: '10%', left: '-80px' }}
        />
        {/* Subtle gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F1E35]/60" />
      </div>

      <div className="container relative z-10 py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-sky-400" />
            <span className="text-sky-400 text-sm font-medium tracking-widest uppercase">
              {t.subtitle}
            </span>
          </div>

          {/* Main title */}
          <h1
            ref={titleRef}
            className="text-white mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            {t.tagline}
          </h1>

          {/* Description */}
          <p
            className="text-slate-300 text-lg md:text-xl mb-10 max-w-xl"
            style={{ animationDelay: '200ms' }}
          >
            {t.description}
          </p>

          {/* CTA */}
          <button
            onClick={scrollToNext}
            className="inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/30 active:scale-95"
          >
            {t.cta}
            <ArrowDown size={18} />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
}
