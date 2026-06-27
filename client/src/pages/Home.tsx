import { useState } from 'react';
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
  const [lang, setLang] = useState<Lang>('fr');
  const [, setLocation] = useLocation();

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
