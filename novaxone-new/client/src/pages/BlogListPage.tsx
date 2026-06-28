// BlogListPage — route /blog (FR) or /en/blog (EN)
// Displays the list of blog articles. Clicking an article navigates to /blog/:slug

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { content, type Lang } from '@/lib/content';
import { ArrowLeft, Calendar, Tag, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
}

const frModules = import.meta.glob('/src/content/blog/fr/*.md', { query: '?raw', import: 'default' });
const enModules = import.meta.glob('/src/content/blog/en/*.md', { query: '?raw', import: 'default' });

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    result[key] = value;
  }
  return result;
}

async function loadPosts(lang: Lang): Promise<BlogPost[]> {
  const modules = lang === 'fr' ? frModules : enModules;
  const posts: BlogPost[] = [];
  for (const [path, loader] of Object.entries(modules)) {
    const raw = (await loader()) as string;
    const fm = parseFrontmatter(raw);
    if (fm.published === 'false') continue;
    const slug = (path.split('/').pop() ?? '').replace(/\.md$/, '');
    posts.push({
      id: slug,
      title: fm.title ?? slug,
      date: fm.date ?? '',
      category: fm.category ?? '',
      excerpt: fm.excerpt ?? '',
      coverImage: fm.coverImage ?? undefined,
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export default function BlogListPage({ lang }: { lang: Lang }) {
  const t = content[lang].blog;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const [currentLang, setCurrentLang] = useState<Lang>(lang);

  useEffect(() => {
    setLoading(true);
    loadPosts(currentLang).then(loaded => {
      setPosts(loaded);
      setLoading(false);
    });
  }, [currentLang]);

  const handleLangChange = (newLang: Lang) => {
    setCurrentLang(newLang);
    setLocation(newLang === 'fr' ? '/blog' : '/en/blog');
  };

  const blogRoot = currentLang === 'fr' ? '/blog' : '/en/blog';

  return (
    <>
      <Navbar
        lang={currentLang}
        onLangChange={handleLangChange}
        onBlogClick={() => setLocation(blogRoot)}
      />
      <div className="min-h-screen bg-white pt-16">
        {/* Header */}
        <div style={{ background: '#945790' }} className="py-20">
          <div className="container">
            <button
              onClick={() => setLocation('/')}
              className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              {currentLang === 'fr' ? 'Retour au site' : 'Back to site'}
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-sky-400" />
              <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase">Blog</span>
            </div>
            <h1
              className="text-white text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {t.title}
            </h1>
          </div>
        </div>

        {/* Articles list */}
        <div className="container py-16">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <p className="text-slate-400 text-center py-16">{t.noPosts}</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-sky-200 hover:shadow-lg transition-all duration-200 group flex flex-col"
                >
                  {post.coverImage && (
                    <div className="h-44 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div
                    style={{ background: post.coverImage ? 'transparent' : '#945790' }}
                    className={`px-6 py-4 flex items-center justify-between ${post.coverImage ? 'border-b border-slate-100' : ''}`}
                  >
                    <span className={`text-sm font-semibold flex items-center gap-1.5 ${post.coverImage ? 'text-sky-600' : 'text-sky-400'}`}>
                      <Calendar size={13} />
                      {post.date
                        ? new Date(post.date).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', {
                            year: 'numeric', month: 'short', day: 'numeric',
                          })
                        : ''}
                    </span>
                    {post.category && (
                      <span className={`text-xs flex items-center gap-1 ${post.coverImage ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Tag size={11} />
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2
                      className="text-slate-900 font-bold text-lg leading-snug mb-3 group-hover:text-sky-600 transition-colors"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <button
                      onClick={() => setLocation(`${blogRoot}/${post.id}`)}
                      className="flex items-center gap-2 text-sky-500 hover:text-sky-600 font-semibold text-sm transition-colors group/btn"
                    >
                      {t.readMore}
                      <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer lang={currentLang} />
    </>
  );
}
