// BlogPostPage — route /blog/:slug (FR) or /en/blog/:slug (EN)
// Loads and displays a single blog article identified by its slug (filename without .md)
// ShareBar uses window.location.href which is now a real permanent URL

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { content, type Lang } from '@/lib/content';
import { ArrowLeft, Calendar, ChevronRight, Linkedin, Link2, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  links?: { text: string; href: string }[];
}

const frModules = import.meta.glob('/src/content/blog/fr/*.md', { query: '?raw', import: 'default' });
const enModules = import.meta.glob('/src/content/blog/en/*.md', { query: '?raw', import: 'default' });

function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };
  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    frontmatter[key] = value;
  }
  return { frontmatter, body: match[2].trim() };
}

async function loadPost(lang: Lang, slug: string): Promise<BlogPost | null> {
  const modules = lang === 'fr' ? frModules : enModules;
  for (const [path, loader] of Object.entries(modules)) {
    const filename = (path.split('/').pop() ?? '').replace(/\.md$/, '');
    if (filename !== slug) continue;
    const raw = (await loader()) as string;
    const { frontmatter: fm, body } = parseFrontmatter(raw);
    let links: { text: string; href: string }[] | undefined;
    if (fm.links) {
      try { links = JSON.parse(fm.links); } catch { links = undefined; }
    }
    return {
      id: slug,
      title: fm.title ?? slug,
      date: fm.date ?? '',
      category: fm.category ?? '',
      excerpt: fm.excerpt ?? '',
      body,
      coverImage: fm.coverImage ?? undefined,
      links,
    };
  }
  return null;
}

// ─── MARKDOWN RENDERER ───────────────────────────────────────────────────────
function renderMarkdown(md: string) {
  const lines = md.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // YouTube embed
    const ytMatch = line.match(/^\[youtube:([\w?=&-]+)\]$/);
    if (ytMatch) {
      const videoId = ytMatch[1];
      const src = videoId.startsWith('videoseries')
        ? `https://www.youtube.com/embed/${videoId}`
        : `https://www.youtube.com/embed/${videoId}`;
      elements.push(
        <div key={i} className="my-8 rounded-xl overflow-hidden shadow-lg" style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={src}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
      );
      i++; continue;
    }

    // Headings
    if (line.startsWith('##### ')) {
      elements.push(<h5 key={i} className="text-base font-bold text-slate-800 mt-5 mb-2">{line.slice(6)}</h5>);
      i++; continue;
    }
    if (line.startsWith('#### ')) {
      elements.push(<h4 key={i} className="text-lg font-bold text-slate-800 mt-6 mb-2">{line.slice(5)}</h4>);
      i++; continue;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>{line.slice(4)}</h3>);
      i++; continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-slate-900 mt-10 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>{line.slice(3)}</h2>);
      i++; continue;
    }
    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-3xl font-bold text-slate-900 mt-10 mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>{line.slice(2)}</h1>);
      i++; continue;
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 my-4 text-slate-700">
          {items.map((item, j) => <li key={j}>{renderInline(item)}</li>)}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-1 my-4 text-slate-700">
          {items.map((item, j) => <li key={j}>{renderInline(item)}</li>)}
        </ol>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-sky-400 pl-5 italic text-slate-600 my-6">
          {renderInline(line.slice(2))}
        </blockquote>
      );
      i++; continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/) || line.match(/^\*\*\*+$/)) {
      elements.push(<hr key={i} className="my-8 border-slate-200" />);
      i++; continue;
    }

    // Empty line
    if (line.trim() === '') { i++; continue; }

    // Paragraph
    elements.push(
      <p key={i} className="text-slate-700 leading-relaxed my-4">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

// ─── SHARE BAR ───────────────────────────────────────────────────────────────
function ShareBar({ title, lang }: { title: string; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(title)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silent */ }
  };

  return (
    <div className="mt-10 pt-8 border-t border-slate-200 flex items-center gap-3 flex-wrap">
      <span className="text-slate-500 text-sm font-medium mr-1">
        {lang === 'fr' ? 'Partager :' : 'Share:'}
      </span>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0077B5] text-white text-sm font-semibold hover:bg-[#005885] transition-colors"
      >
        <Linkedin size={15} />
        LinkedIn
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
      >
        {copied ? <Check size={15} className="text-emerald-500" /> : <Link2 size={15} />}
        {copied
          ? (lang === 'fr' ? 'Copié !' : 'Copied!')
          : (lang === 'fr' ? 'Copier le lien' : 'Copy link')}
      </button>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function BlogPostPage({ lang, slug }: { lang: Lang; slug: string }) {
  const t = content[lang].blog;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [, setLocation] = useLocation();
  const [currentLang, setCurrentLang] = useState<Lang>(lang);

  const blogRoot = currentLang === 'fr' ? '/blog' : '/en/blog';

  useEffect(() => {
    setLoading(true);
    loadPost(currentLang, slug).then(loaded => {
      if (!loaded) setNotFound(true);
      else setPost(loaded);
      setLoading(false);
    });
  }, [currentLang, slug]);

  // Inject Open Graph meta tags dynamically when article is loaded
  useEffect(() => {
    if (!post) return;
    // Use VITE_SITE_URL (production URL) if available, otherwise fall back to window.location.origin
    const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ?? window.location.origin;
    const pageUrl = `${siteUrl}${window.location.pathname}`;
    const ogImage = post.coverImage
      ? (post.coverImage.startsWith('http') ? post.coverImage : `${siteUrl}${post.coverImage}`)
      : `${siteUrl}/uploads/og-logo.png`;

    // Update document title
    document.title = `${post.title} — NovaXone`;

    // Helper to set/create a meta tag
    const setMeta = (property: string, content: string, attr = 'property') => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('og:type', 'article');
    setMeta('og:title', `${post.title} — NovaXone`);
    setMeta('og:description', post.excerpt);
    setMeta('og:url', pageUrl);
    setMeta('og:image', ogImage);
    setMeta('twitter:title', `${post.title} — NovaXone`, 'name');
    setMeta('twitter:description', post.excerpt, 'name');
    setMeta('twitter:image', ogImage, 'name');

    // Restore defaults on unmount
    return () => {
      document.title = 'NovaXone — Conseil des entreprises technologiques';
      setMeta('og:type', 'website');
      setMeta('og:title', 'NovaXone — Conseil des entreprises technologiques');
      setMeta('og:description', "Transformer l'innovation en réussite économique.");
      setMeta('og:url', window.location.origin);
      setMeta('og:image', `${window.location.origin}/uploads/og-logo.png`);
    };
  }, [post]);

  const handleLangChange = (newLang: Lang) => {
    setCurrentLang(newLang);
    // Navigate to the blog list in the new language (slug may differ)
    setLocation(newLang === 'fr' ? '/blog' : '/en/blog');
  };

  return (
    <>
      <Navbar
        lang={currentLang}
        onLangChange={handleLangChange}
        onBlogClick={() => setLocation(blogRoot)}
      />
      <div className="min-h-screen bg-white pt-16">
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notFound || !post ? (
          <div className="container py-32 text-center">
            <p className="text-slate-400 text-lg mb-6">{lang === 'fr' ? 'Article introuvable.' : 'Article not found.'}</p>
            <button onClick={() => setLocation(blogRoot)} className="text-sky-500 hover:underline font-semibold">
              {t.backToBlog}
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ background: '#945790' }} className="py-16">
              <div className="container">
                <button
                  onClick={() => setLocation(blogRoot)}
                  className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  {t.backToBlog}
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-sky-500/20 text-sky-400 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-slate-400 text-sm flex items-center gap-1">
                    <Calendar size={13} />
                    {post.date
                      ? new Date(post.date).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })
                      : ''}
                  </span>
                </div>
                <h1
                  className="text-white text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {post.title}
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="container py-16">
              <div className="max-w-3xl">
                {post.coverImage && (
                  <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                    <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover" />
                  </div>
                )}
                <p className="text-slate-500 text-lg leading-relaxed mb-8 border-l-4 border-sky-400 pl-5 italic">
                  {post.excerpt}
                </p>
                <div className="prose prose-slate max-w-none">
                  {renderMarkdown(post.body)}
                </div>
                <ShareBar title={post.title} lang={currentLang} />
                {post.links && post.links.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-slate-200">
                    <h4
                      className="text-slate-700 font-semibold mb-4 text-sm uppercase tracking-wider"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {currentLang === 'fr' ? 'Références' : 'References'}
                    </h4>
                    <ul className="space-y-2">
                      {post.links.map((link, i) => (
                        <li key={i}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 hover:text-sky-800 hover:underline text-sm flex items-center gap-1.5 transition-colors"
                          >
                            <ChevronRight size={13} className="shrink-0" />
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer lang={currentLang} />
    </>
  );
}
