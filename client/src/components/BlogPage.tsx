// Design: Editorial Tech — Syne font, #2a5080 blue, clean white background
// Blog articles are loaded from Markdown files in /src/content/blog/fr/ and /src/content/blog/en/
// Frontmatter is parsed manually from raw string imports (no Vite plugin needed)

import { useState, useEffect } from 'react';
import { content, type Lang } from '@/lib/content';
import { ArrowLeft, Calendar, Tag, ChevronRight } from 'lucide-react';

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

interface BlogPageProps {
  lang: Lang;
  onBack: () => void;
}

// Parse frontmatter from raw Markdown string
function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };

  const fmLines = match[1].split('\n');
  const frontmatter: Record<string, string> = {};

  for (const line of fmLines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    frontmatter[key] = value;
  }

  return { frontmatter, body: match[2].trim() };
}

// Load all markdown files for a given language
const frModules = import.meta.glob('/src/content/blog/fr/*.md', { query: '?raw', import: 'default' });
const enModules = import.meta.glob('/src/content/blog/en/*.md', { query: '?raw', import: 'default' });

async function loadPosts(lang: Lang): Promise<BlogPost[]> {
  const modules = lang === 'fr' ? frModules : enModules;
  const posts: BlogPost[] = [];

  for (const [path, loader] of Object.entries(modules)) {
    const raw = (await loader()) as string;
    const { frontmatter, body } = parseFrontmatter(raw);

    if (frontmatter.published === 'false') continue;

    // Extract slug from filename
    const filename = path.split('/').pop() ?? '';
    const slug = filename.replace(/\.md$/, '');

    // Parse links JSON if present
    let links: { text: string; href: string }[] | undefined;
    if (frontmatter.links) {
      try {
        links = JSON.parse(frontmatter.links);
      } catch {
        links = undefined;
      }
    }

    posts.push({
      id: slug,
      title: frontmatter.title ?? slug,
      date: frontmatter.date ?? '',
      category: frontmatter.category ?? '',
      excerpt: frontmatter.excerpt ?? '',
      body,
      coverImage: frontmatter.coverImage ?? undefined,
      links,
    });
  }

  // Sort by date descending
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

// Render Markdown body as JSX (simplified: handles **bold**, headings, lists, paragraphs)
function renderMarkdown(md: string) {
  const blocks = md.split(/\n\n+/);
  return blocks.map((block, i) => {
    // Heading 2
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="text-slate-900 text-2xl font-bold mt-10 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          {block.replace(/^## /, '')}
        </h2>
      );
    }
    // Heading 3
    if (block.startsWith('### ')) {
      return (
        <h3 key={i} className="text-slate-900 text-xl font-bold mt-8 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
          {block.replace(/^### /, '')}
        </h3>
      );
    }
    // Bold-only line as heading
    if (/^\*\*[^*]+\*\*$/.test(block.trim())) {
      return (
        <h3 key={i} className="text-slate-900 text-xl font-bold mt-8 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
          {block.trim().replace(/\*\*/g, '')}
        </h3>
      );
    }
    // Unordered list
    if (block.split('\n').every(l => l.startsWith('- ') || l.trim() === '')) {
      const items = block.split('\n').filter(l => l.startsWith('- '));
      return (
        <ul key={i} className="space-y-2 mb-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-slate-600">
              <ChevronRight size={16} className="text-sky-500 mt-0.5 shrink-0" />
              {renderInline(item.replace(/^- /, ''))}
            </li>
          ))}
        </ul>
      );
    }
    // Numbered list
    if (block.split('\n').every(l => /^\d+\./.test(l) || l.trim() === '')) {
      const items = block.split('\n').filter(l => /^\d+\./.test(l));
      return (
        <ol key={i} className="space-y-2 mb-4 list-decimal list-inside">
          {items.map((item, j) => (
            <li key={j} className="text-slate-600">
              {renderInline(item.replace(/^\d+\.\s*/, ''))}
            </li>
          ))}
        </ol>
      );
    }
    // Tags line (starts with "Tags :")
    if (block.startsWith('Tags :') || block.startsWith('Tags:')) {
      return (
        <p key={i} className="text-slate-400 text-sm italic mt-6">
          {block}
        </p>
      );
    }
    // Default paragraph
    return (
      <p key={i} className="text-slate-600 leading-relaxed mb-4">
        {renderInline(block)}
      </p>
    );
  });
}

// Render inline Markdown (bold, italic, links)
function renderInline(text: string): React.ReactNode {
  // Split by bold/italic/link patterns
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-slate-800 font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
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

export default function BlogPage({ lang, onBack }: BlogPageProps) {
  const t = content[lang].blog;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    setLoading(true);
    setSelectedPost(null);
    loadPosts(lang).then(loaded => {
      setPosts(loaded);
      setLoading(false);
    });
  }, [lang]);

  // Article detail view
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div style={{ background: '#945790' }} className="py-16">
          <div className="container">
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              {t.backToBlog}
            </button>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-sky-500/20 text-sky-400 text-xs font-semibold px-3 py-1 rounded-full">
                {selectedPost.category}
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <Calendar size={13} />
                {selectedPost.date
                  ? new Date(selectedPost.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })
                  : ''}
              </span>
            </div>
            <h1
              className="text-white text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {selectedPost.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="container py-16">
          <div className="max-w-3xl">
            {/* Cover image */}
            {selectedPost.coverImage && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-64 object-cover" />
              </div>
            )}
            {/* Excerpt */}
            <p className="text-slate-500 text-lg leading-relaxed mb-8 border-l-4 border-sky-400 pl-5 italic">
              {selectedPost.excerpt}
            </p>
            {/* Body */}
            <div className="prose prose-slate max-w-none">
              {renderMarkdown(selectedPost.body)}
            </div>
            {/* Reference links */}
            {selectedPost.links && selectedPost.links.length > 0 && (
              <div className="mt-10 pt-8 border-t border-slate-200">
                <h4
                  className="text-slate-700 font-semibold mb-4 text-sm uppercase tracking-wider"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {lang === 'fr' ? 'Références' : 'References'}
                </h4>
                <ul className="space-y-2">
                  {selectedPost.links.map((link, i) => (
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
      </div>
    );
  }

  // Blog list view
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div style={{ background: '#945790' }} className="py-20">
        <div className="container">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            {lang === 'fr' ? 'Retour au site' : 'Back to site'}
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
                {/* Cover image thumbnail */}
                {post.coverImage && (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                {/* Date/category bar */}
                <div
                  style={{ background: post.coverImage ? 'transparent' : '#945790' }}
                  className={`px-6 py-4 flex items-center justify-between ${post.coverImage ? 'border-b border-slate-100' : ''}`}
                >
                  <span className={`text-sm font-semibold flex items-center gap-1.5 ${post.coverImage ? 'text-sky-600' : 'text-sky-400'}`}>
                    <Calendar size={13} />
                    {post.date
                      ? new Date(post.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
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
                    onClick={() => setSelectedPost(post)}
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
  );
}
