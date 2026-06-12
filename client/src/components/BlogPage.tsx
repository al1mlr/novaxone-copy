import { useState } from 'react';
import { content, type Lang } from '@/lib/content';
import { blogPosts } from '@/lib/blogposts';
import { ArrowLeft, Plus, X, Calendar, Tag, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  dateLabel: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  links?: { text: string; href: string }[];
}

interface BlogPageProps {
  lang: Lang;
  onBack: () => void;
}

export default function BlogPage({ lang, onBack }: BlogPageProps) {
  const t = content[lang].blog;
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts[lang]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: '', date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      date: form.date,
      dateLabel: new Date(form.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day: '2-digit', month: 'short' }),
    };
    setPosts([newPost, ...posts]);
    setForm({ title: '', excerpt: '', content: '', category: '', date: new Date().toISOString().split('T')[0] });
    setShowForm(false);
  };

  // Article detail view
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div style={{ background: '#2a5080' }} className="py-16">
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
                {new Date(selectedPost.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
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
            {/* Image de l'article */}
            {selectedPost.image && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover" />
              </div>
            )}
            <p className="text-slate-500 text-lg leading-relaxed mb-8 border-l-4 border-sky-400 pl-5 italic">
              {selectedPost.excerpt}
            </p>
            <div className="prose prose-slate max-w-none">
              {selectedPost.content.split('\n\n').map((para, i) => {
                if (para.startsWith('**') && para.endsWith('**')) {
                  return (
                    <h3 key={i} className="text-slate-900 text-xl font-bold mt-8 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {para.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (para.includes('**')) {
                  const parts = para.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={i} className="text-slate-600 leading-relaxed mb-4">
                      {parts.map((part, j) =>
                        part.startsWith('**') ? (
                          <strong key={j} className="text-slate-800 font-semibold">{part.replace(/\*\*/g, '')}</strong>
                        ) : part
                      )}
                    </p>
                  );
                }
                if (para.startsWith('- ')) {
                  const items = para.split('\n').filter(l => l.startsWith('- '));
                  return (
                    <ul key={i} className="space-y-2 mb-4">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-600">
                          <ChevronRight size={16} className="text-sky-500 mt-0.5 shrink-0" />
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-slate-600 leading-relaxed mb-4">{para}</p>;
              })}
            </div>
            {/* Liens de référence */}
            {selectedPost.links && selectedPost.links.length > 0 && (
              <div className="mt-10 pt-8 border-t border-slate-200">
                <h4 className="text-slate-700 font-semibold mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "'Syne', sans-serif" }}>
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
      <div style={{ background: '#2a5080' }} className="py-20">
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
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1
              className="text-white text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {t.title}
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdminMode(!adminMode)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  adminMode
                    ? 'bg-sky-500 border-sky-500 text-white'
                    : 'border-white/20 text-white/60 hover:text-white hover:border-white/40'
                }`}
              >
                {t.adminMode}
              </button>
              {adminMode && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                >
                  <Plus size={16} />
                  {t.addArticle}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add article form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-slate-900 font-bold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>
                {t.addArticle}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">{t.form.title} *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">{t.form.category}</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">{t.form.date}</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">{t.form.excerpt} *</label>
                <textarea
                  required
                  rows={3}
                  value={form.excerpt}
                  onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">{t.form.content} *</label>
                <textarea
                  required
                  rows={8}
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder={lang === 'fr' ? 'Contenu en markdown simplifié...' : 'Content in simplified markdown...'}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none font-mono text-sm"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  {t.form.submit}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium py-3 rounded-xl transition-all"
                >
                  {t.form.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Articles list */}
      <div className="container py-16">
        {posts.length === 0 ? (
          <p className="text-slate-400 text-center py-16">{t.noPosts}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-sky-200 hover:shadow-lg transition-all duration-200 group flex flex-col"
              >
                {/* Image de vignette */}
                {post.image && (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                {/* Date badge */}
                <div style={{ background: post.image ? 'transparent' : '#2a5080' }} className={`px-6 py-4 flex items-center justify-between ${post.image ? 'border-b border-slate-100' : ''}`}>
                  <span className={`text-sm font-semibold flex items-center gap-1.5 ${post.image ? 'text-sky-600' : 'text-sky-400'}`}>
                    <Calendar size={13} />
                    {new Date(post.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </span>
                  {post.category && (
                    <span className={`text-xs flex items-center gap-1 ${post.image ? 'text-slate-500' : 'text-slate-400'}`}>
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

                {/* Admin delete */}
                {adminMode && (
                  <div className="px-6 pb-4 border-t border-slate-50 pt-3">
                    <button
                      onClick={() => setPosts(posts.filter(p => p.id !== post.id))}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      {lang === 'fr' ? 'Supprimer' : 'Delete'}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
