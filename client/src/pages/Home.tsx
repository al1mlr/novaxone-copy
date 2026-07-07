import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { type Lang } from '@/lib/content';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import {
  DemarcheSection,
  SujetsSection,
  ExpertisesSection,
  ClientsSection,
  AProposSection,
  ContactSection,
  Footer,
} from '@/components/Sections';

export default function Home() {
  // Initialize lang from URL param (e.g. /?lang=en from blog nav)
  const [lang, setLang] = useState<Lang>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('lang') as Lang) || 'fr';
  });
  const [, setLocation] = useLocation();

  // Scroll to anchor if URL contains a hash (e.g. /#demarche from blog nav)
  useEffect(() => {
    // Clean up lang param from URL without reload
    const params = new URLSearchParams(window.location.search);
    if (params.has('lang')) {
      const cleanUrl = window.location.hash ? `/${window.location.hash}` : '/';
      window.history.replaceState(null, '', cleanUrl);
    }

    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          const offset = 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          // Clean up hash from URL without reload
          window.history.replaceState(null, '', '/');
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      setTimeout(() => tryScroll(), 200);
    }
  }, []);

  const handleBlogClick = () => {
    setLocation(lang === 'fr' ? '/blog' : '/en/blog');
  };

  return (
    <>
      <Navbar lang={lang} onLangChange={setLang} onBlogClick={handleBlogClick} />
      <main>
        <HeroSection lang={lang} />
        <DemarcheSection lang={lang} />
        <SujetsSection lang={lang} />
        <ExpertisesSection lang={lang} />
        <ClientsSection lang={lang} />
        <AProposSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
