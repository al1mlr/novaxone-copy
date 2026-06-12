import { useState } from 'react';
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
import BlogPage from '@/components/BlogPage';

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr');
  const [showBlog, setShowBlog] = useState(false);

  if (showBlog) {
    return (
      <>
        <Navbar lang={lang} onLangChange={setLang} onBlogClick={() => setShowBlog(false)} />
        <div className="pt-16">
          <BlogPage key={lang} lang={lang} onBack={() => setShowBlog(false)} />
        </div>
        <Footer lang={lang} />
      </>
    );
  }

  return (
    <>
      <Navbar lang={lang} onLangChange={setLang} onBlogClick={() => setShowBlog(true)} />
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
