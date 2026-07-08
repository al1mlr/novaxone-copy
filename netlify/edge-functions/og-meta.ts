/**
 * Netlify Edge Function — og-meta.ts
 *
 * Intercepts requests from social crawlers (LinkedIn, Facebook, Twitter/X,
 * WhatsApp, Slack, Telegram…) and returns a minimal HTML page with the correct
 * Open Graph / Twitter Card meta tags for each blog article.
 *
 * Regular visitors receive the normal SPA response (pass-through).
 */

import type { Context } from "https://edge.netlify.com";

// ─── Article database ─────────────────────────────────────────────────────────
// Keep in sync with /client/src/content/blog/{fr,en}/*.md frontmatter.
// Fields: title, description, image (relative path), lang, url path
const ARTICLES: Record<string, { title: string; description: string; image: string; lang: string }> = {
  // French articles
  "/blog/2016-03-28-conference-timing-partie-1": {
    title: "Conférence sur l'importance du timing (partie 1)",
    description: "Le « timing » facteur le moins maitrisé de la réussite d'une entreprise technologique ? Cette conférence fait d'abord un constat sur le peu de matière élaborée autour de la notion de « timing ».",
    image: "/uploads/timing-v2.jpg",
    lang: "fr",
  },
  "/blog/2016-03-28-conference-timing-partie-2": {
    title: "Conférence sur l'importance du timing (partie 2)",
    description: "Le cahier de laboratoire électronique : une innovation qui procure des gains évidents et qui ne prend pas, pourquoi ? Une étude de cas sur le timing de l'innovation.",
    image: "/uploads/timing-v2.jpg",
    lang: "fr",
  },
  "/blog/2016-03-28-conference-timing-partie-3": {
    title: "Conférence sur l'importance du timing (partie 3)",
    description: "Être sensible aux signaux de timing. Une fois que l'on a compris comment évolue les marchés technologiques, on peut développer une sensibilité aux signaux qui permettent de savoir où on se trouve.",
    image: "/uploads/og-logo.png",
    lang: "fr",
  },
  "/blog/2017-06-24-logique-produit": {
    title: "La logique « produit » dans le logiciel est loin d'être une évidence",
    description: "Je constate régulièrement la difficulté de certaines sociétés informatiques à se mettre dans une logique de construction de produits.",
    image: "/uploads/og-logo.png",
    lang: "fr",
  },
  "/blog/2018-04-13-reaction-rapport-villani": {
    title: "Réaction au rapport Villani",
    description: "A la lecture du rapport Villani, je ne peux que partager l'analyse parfois sévère d'Olivier Ezratty sur certains points où je me sens un peu compétent.",
    image: "/uploads/og-logo.png",
    lang: "fr",
  },
  "/blog/2019-03-09-ia-prothese-orthese": {
    title: "IA : prothèse ou orthèse ?",
    description: "Beaucoup d'efforts sont consacrés à la définition de ce qu'est l'intelligence artificielle. Mais la vraie question est peut-être ailleurs : l'IA est-elle une prothèse qui remplace l'humain, ou une orthèse qui l'amplifie ?",
    image: "/uploads/ia-prothese.jpg",
    lang: "fr",
  },
  // English articles
  "/en/blog/2018-06-10-ai-story-1": {
    title: "A personal Story of Artificial Intelligence (1)",
    description: "Artificial intelligence is now the buzzword (again). It's maybe time for a flashback of more than 30 years. AI started for me in the last months of my studies at Ecole Polytechnique in 1982.",
    image: "/uploads/ai-story-1-robotics-lab.jpg",
    lang: "en",
  },
  "/en/blog/2018-07-15-ai-story-timing": {
    title: "The Importance of Timing",
    description: "Alain did a presentation in the Entrepreneurship Master Class of Ecole Polytechnique in Paris about the importance of timing.",
    image: "/uploads/timing-v2.jpg",
    lang: "en",
  },
  "/en/blog/2018-08-19-ai-story-2": {
    title: "A personal Story of Artificial Intelligence (2)",
    description: "The Lisp language is really linked to the first attempt to implement Artificial Intelligence programs. It'd be worth explaining why Lisp is a key language to understand the history of AI.",
    image: "/uploads/ai-story-2-lisp-machine.jpg",
    lang: "en",
  },
};

// ─── Crawler detection ────────────────────────────────────────────────────────
const CRAWLER_PATTERNS = [
  "linkedinbot",
  "facebookexternalhit",
  "twitterbot",
  "whatsapp",
  "slackbot",
  "telegrambot",
  "discordbot",
  "googlebot",
  "bingbot",
  "applebot",
  "pinterest",
  "embedly",
  "outbrain",
  "quora",
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_PATTERNS.some((p) => ua.includes(p));
}

// ─── HTML builder ─────────────────────────────────────────────────────────────
function buildOgHtml(
  siteUrl: string,
  path: string,
  article: { title: string; description: string; image: string; lang: string }
): string {
  const pageUrl = `${siteUrl}${path}`;
  const imageUrl = article.image.startsWith("http")
    ? article.image
    : `${siteUrl}${article.image}`;

  const siteName = "NovaXone";
  const twitterHandle = "@novaxone";

  return `<!DOCTYPE html>
<html lang="${article.lang}">
<head>
  <meta charset="UTF-8" />
  <title>${article.title} — ${siteName}</title>

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="${siteName}" />
  <meta property="og:title" content="${article.title}" />
  <meta property="og:description" content="${article.description}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="${article.lang === "fr" ? "fr_FR" : "en_US"}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="${twitterHandle}" />
  <meta name="twitter:title" content="${article.title}" />
  <meta name="twitter:description" content="${article.description}" />
  <meta name="twitter:image" content="${imageUrl}" />

  <!-- Canonical -->
  <link rel="canonical" href="${pageUrl}" />

  <!-- Redirect real users to the SPA -->
  <meta http-equiv="refresh" content="0; url=${pageUrl}" />
</head>
<body>
  <p>Redirecting to <a href="${pageUrl}">${article.title}</a>…</p>
</body>
</html>`;
}

// ─── Edge Function handler ────────────────────────────────────────────────────
export default async function handler(request: Request, context: Context): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  // Only handle /blog/* and /en/blog/* paths
  if (!path.startsWith("/blog/") && !path.startsWith("/en/blog/")) {
    return context.next();
  }

  const userAgent = request.headers.get("user-agent") ?? "";

  // Pass through for real users
  if (!isCrawler(userAgent)) {
    return context.next();
  }

  // Look up article metadata
  const article = ARTICLES[path];
  if (!article) {
    // Unknown article slug — pass through
    return context.next();
  }

  const siteUrl = Deno.env.get("VITE_SITE_URL") ?? "https://www.novaxone.com";

  return new Response(buildOgHtml(siteUrl, path, article), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

export const config = {
  path: ["/blog/*", "/en/blog/*"],
};
