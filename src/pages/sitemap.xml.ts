import type { APIRoute } from 'astro';
import { buildCanonicalUrl, getAllPageEntries, siteConfig } from '../lib/site';

export const GET: APIRoute = () => {
  const urls = [
    buildCanonicalUrl(siteConfig.siteUrl, '/'),
    ...getAllPageEntries().map((page) => buildCanonicalUrl(siteConfig.siteUrl, `/pages/${page.slug}/`))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
