import type { APIRoute } from 'astro';
import { getAllPublishedArticles } from '../lib/articles';

export const GET: APIRoute = () => {
  const items = getAllPublishedArticles().map((page) => ({
    slug: page.slug,
    title: page.title,
    description: page.description,
    eyebrow: page.eyebrow,
    category: page.category,
  }));

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
    },
  });
};
