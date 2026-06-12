import { useEffect, useRef, useState } from 'react';
import { content, type Lang } from '@/lib/content';
import { CheckCircle2, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';

// Hook for scroll reveal
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('section-reveal');
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── DÉMARCHE ────────────────────────────────────────────────────────────────
export function DemarcheSection({ lang }: { lang: Lang }) {
  const t = content[lang].demarche;
  const ref = useReveal();
  const colors = ['bg-sky-500', 'bg-indigo-500', 'bg-emerald-500'];
  const lightColors = ['bg-sky-50', 'bg-indigo-50', 'bg-emerald-50'];
  const textColors = ['text-sky-600', 'text-indigo-600', 'text-emerald-600'];

  return (
    <section id="demarche" className="py-24 bg-white relative overflow-hidden">
      <span className="deco-number text-slate-900 right-0 top-0">01</span>
      <div className="container relative z-10">
        <div ref={ref}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-sky-400" />
            <span className="text-sky-500 text-sm font-semibold tracking-widest uppercase">01</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            {t.title}
          </h2>
          <p className="text-slate-500 text-lg mb-3">{t.subtitle}</p>
          <p className="text-slate-400 mb-14">{t.intro}</p>

          <div className="grid md:grid-cols-3 gap-6">
            {t.phases.map((phase, i) => (
              <div key={i} className={`${lightColors[i]} rounded-2xl p-8 service-card`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${colors[i]} text-white font-bold text-lg mb-5`}>
                  {i + 1}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${textColors[i]}`} style={{ fontFamily: "'Syne', sans-serif" }}>
                  {phase.title}
                </h3>
                <ul className="space-y-2">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-slate-600 text-sm">
                      <CheckCircle2 size={15} className={`${textColors[i]} mt-0.5 shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SUJETS ──────────────────────────────────────────────────────────────────
export function SujetsSection({ lang }: { lang: Lang }) {
  const t = content[lang].sujets;
  const ref = useReveal();

  return (
    <section id="sujets" className="py-24 relative overflow-hidden" style={{ background: '#2a5080' }}>
      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/manus-storage/fond-slider-1024x576_32f2b1e4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.18,
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(26,58,92,0.75)' }} />
      <span className="deco-number text-white right-0 top-0">02</span>
      <div className="container relative z-10">
        <div ref={ref}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-sky-400" />
            <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase">02</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-14" style={{ fontFamily: "'Syne', sans-serif" }}>
            {t.title}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {t.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-6 py-5 transition-all duration-200 group cursor-default"
              >
                <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                  <span className="text-sky-400 text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <span className="text-white font-medium">{item}</span>
                <ArrowRight size={16} className="ml-auto text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-medium transition-colors"
            >
              {t.cta} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERTISES ──────────────────────────────────────────────────────────────
export function ExpertisesSection({ lang }: { lang: Lang }) {
  const t = content[lang].expertises;
  const ref = useReveal();

  return (
    <section id="expertises" className="py-24 bg-slate-50 relative overflow-hidden">
      <span className="deco-number text-slate-900 right-0 top-0">03</span>
      <div className="container relative z-10">
        <div ref={ref}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-sky-400" />
            <span className="text-sky-500 text-sm font-semibold tracking-widest uppercase">03</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-14" style={{ fontFamily: "'Syne', sans-serif" }}>
            {t.title}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.items.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 service-card shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-3xl font-bold text-sky-100 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-slate-800 font-semibold text-base leading-snug">{item}</h3>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 font-medium transition-colors"
            >
              {t.cta} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CLIENTS ─────────────────────────────────────────────────────────────────
export function ClientsSection({ lang }: { lang: Lang }) {
  const t = content[lang].clients;
  const ref = useReveal();

  return (
    <section id="clients" className="py-24 bg-white relative overflow-hidden">
      <span className="deco-number text-slate-900 right-0 top-0">04</span>
      <div className="container relative z-10">
        <div ref={ref}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-sky-400" />
            <span className="text-sky-500 text-sm font-semibold tracking-widest uppercase">04</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-14" style={{ fontFamily: "'Syne', sans-serif" }}>
            {t.title}
          </h2>

          <div className="space-y-6">
            {t.cases.map((c, i) => (
              <div
                key={i}
                className="border border-slate-100 rounded-2xl p-8 hover:border-sky-200 hover:shadow-md transition-all duration-200 service-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-semibold text-lg mb-3 leading-snug">{c.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{c.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 font-medium transition-colors"
            >
              {t.cta} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── À PROPOS ─────────────────────────────────────────────────────────────────
export function AProposSection({ lang }: { lang: Lang }) {
  const t = content[lang].apropos;
  const ref = useReveal();

  return (
    <section id="apropos" className="py-24 relative overflow-hidden" style={{ background: '#1e4570' }}>
      <span className="deco-number text-white right-0 top-0">05</span>
      <div className="container relative z-10">
        <div ref={ref}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-sky-400" />
            <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase">05</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-14" style={{ fontFamily: "'Syne', sans-serif" }}>
            {t.title}
          </h2>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Qui sommes-nous */}
            <div>
              <div className="space-y-4">
                {t.paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>

            {/* Positionnement */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-sky-400" />
                <span className="text-sky-400 text-sm font-semibold tracking-wider uppercase">
                  {t.positioning}
                </span>
              </div>
              <div className="space-y-4">
                {t.positioningText.map((p, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed text-sm">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
export function ContactSection({ lang }: { lang: Lang }) {
  const t = content[lang].contact;
  const ref = useReveal();

  const [formStatus, setFormStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('https://formspree.io/f/xpwrqkgv', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setFormStatus('sent');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      <span className="deco-number text-slate-900 right-0 top-0">07</span>
      <div className="container relative z-10">
        <div ref={ref}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-sky-400" />
            <span className="text-sky-500 text-sm font-semibold tracking-widest uppercase">07</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-14" style={{ fontFamily: "'Syne', sans-serif" }}>
            {t.title}
          </h2>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_to" value="sales@novaxone.com" />
              <input type="hidden" name="_subject" value="Nouveau message depuis le site NovaXone" />
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t.form.name}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t.form.email}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder={t.form.subject}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
              />
              <textarea
                name="message"
                placeholder={t.form.message}
                required
                rows={5}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all resize-none"
              />
              {formStatus === 'sent' && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
                  {lang === 'fr' ? '✓ Message envoyé avec succès à sales@novaxone.com' : '✓ Message sent successfully to sales@novaxone.com'}
                </div>
              )}
              {formStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {lang === 'fr' ? 'Une erreur est survenue. Veuillez réessayer.' : 'An error occurred. Please try again.'}
                </div>
              )}
              <button
                type="submit"
                disabled={formStatus === 'sending' || formStatus === 'sent'}
                className="w-full bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/30 active:scale-95"
              >
                {formStatus === 'sending'
                  ? (lang === 'fr' ? 'Envoi en cours...' : 'Sending...')
                  : t.form.submit}
              </button>
            </form>

            {/* Address */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-sky-500" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1 font-medium uppercase tracking-wide">Adresse</p>
                  {t.address.split('\n').map((line, i) => (
                    <p key={i} className="text-slate-700">{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-sky-500" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1 font-medium uppercase tracking-wide">Téléphone</p>
                  <p className="text-slate-700">+33 9 72 33 69 95</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-sky-500" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1 font-medium uppercase tracking-wide">Email</p>
                  <p className="text-slate-700">contact@novaxone.com</p>
                </div>
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-48 mt-4">
                <iframe
                  title="NovaXone location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.2766!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4b0e5f6e7%3A0x0!2s5+Rue+Davioud%2C+75016+Paris!5e0!3m2!1sfr!2sfr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
export function Footer({ lang }: { lang: Lang }) {
  const t = content[lang].footer;

  return (
    <footer style={{ background: '#162d4a' }} className="py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="/manus-storage/logo-novaxone-blanc_db8a4bee.png"
            alt="NovaXone"
            className="h-8 object-contain opacity-80"
          />
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/al1mlr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-400 transition-colors"
              aria-label="Twitter"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://fr.linkedin.com/in/meller"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-400 transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCOf-8b9x1LqbkQ-GSy5Q0UA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-400 transition-colors"
              aria-label="YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
          <p className="text-slate-500 text-sm">{t.copy}</p>
        </div>
      </div>
    </footer>
  );
}
