import type { APIRoute } from 'astro';
import { buildCanonicalUrl, getAllPageEntries, siteConfig } from '../lib/site';

const DEFAULT_LASTMOD = '2026-04-23';

export const GET: APIRoute = () => {
  const pageEntries = getAllPageEntries();

  const urlEntries: { loc: string; lastmod: string }[] = [
    { loc: buildCanonicalUrl(siteConfig.siteUrl, '/'), lastmod: DEFAULT_LASTMOD },
    ...pageEntries.map((page) => ({
      loc: buildCanonicalUrl(siteConfig.siteUrl, `/pages/${page.slug}/`),
      lastmod: page.aiToolMeta?.lastUpdated ?? DEFAULT_LASTMOD,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries
    .map((entry) => `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n  </url>`)
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
