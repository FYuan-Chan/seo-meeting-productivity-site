import type { APIRoute } from 'astro';
import { buildCanonicalUrl, getAdsenseReviewPageEntries, siteConfig } from '../lib/site';
import { trustPages } from '../lib/trust-pages';
import { getArchivableCategories } from '../lib/articles';

const DEFAULT_LASTMOD = '2026-04-23';
const HOMEPAGE_LASTMOD = '2026-05-10';

export const GET: APIRoute = () => {
  const pageEntries = getAdsenseReviewPageEntries();
  const archivableCats = getArchivableCategories();

  const urlEntries: { loc: string; lastmod: string }[] = [
    { loc: buildCanonicalUrl(siteConfig.siteUrl, '/'), lastmod: HOMEPAGE_LASTMOD },
    { loc: buildCanonicalUrl(siteConfig.siteUrl, '/archive/'), lastmod: HOMEPAGE_LASTMOD },
    ...archivableCats.map(({ category }) => ({
      loc: buildCanonicalUrl(siteConfig.siteUrl, `/category/${category}/`),
      lastmod: HOMEPAGE_LASTMOD,
    })),
    ...trustPages.map((page) => ({
      loc: buildCanonicalUrl(siteConfig.siteUrl, `/${page.slug}/`),
      lastmod: page.updated,
    })),
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
