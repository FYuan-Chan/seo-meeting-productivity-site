/**
 * Article helpers for editorial views (home, category, archive, prev/next, card meta).
 * Built on top of getAdsenseReviewPageEntries() so the public surface stays whitelisted.
 */

import { getAdsenseReviewPageEntries, estimateSeoPageContentWords } from './site';
import type { PageCategory, SeoPage } from './site';

const MIN_CATEGORY_SIZE = 3;
const WORDS_PER_MIN = 220;
const DEFAULT_DATE = '2026-04-01';

/** All publishable articles (the AdSense recovery whitelist). */
export function getAllPublishedArticles(): SeoPage[] {
  return getAdsenseReviewPageEntries();
}

function getDate(page: SeoPage): Date {
  const raw = page.aiToolMeta?.lastUpdated ?? DEFAULT_DATE;
  // supports YYYY-MM-DD, YYYY-MM
  const parsed = Date.parse(raw.length === 7 ? `${raw}-01` : raw);
  return Number.isFinite(parsed) ? new Date(parsed) : new Date(DEFAULT_DATE);
}

/** Stable descending sort by lastUpdated, slug tiebreaker. */
export function sortByUpdated(pages: SeoPage[]): SeoPage[] {
  return [...pages].sort((a, b) => {
    const diff = getDate(b).getTime() - getDate(a).getTime();
    if (diff !== 0) return diff;
    return a.slug.localeCompare(b.slug);
  });
}

export function groupByCategory(pages: SeoPage[]): Record<PageCategory, SeoPage[]> {
  const buckets = {} as Record<PageCategory, SeoPage[]>;
  for (const page of pages) {
    const bucket = buckets[page.category] ?? [];
    bucket.push(page);
    buckets[page.category] = bucket;
  }
  return buckets;
}

export function groupByYearMonth(
  pages: SeoPage[],
): { key: string; label: string; items: SeoPage[] }[] {
  const sorted = sortByUpdated(pages);
  const buckets = new Map<string, SeoPage[]>();
  for (const page of sorted) {
    const d = getDate(page);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    const arr = buckets.get(key) ?? [];
    arr.push(page);
    buckets.set(key, arr);
  }
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });
  return [...buckets.entries()]
    .sort(([a], [b]) => (a < b ? 1 : a > b ? -1 : 0))
    .map(([key, items]) => {
      const [y, m] = key.split('-');
      const label = formatter.format(new Date(Date.UTC(Number(y), Number(m) - 1, 1)));
      return { key, label, items };
    });
}

/** Prev/Next within the same category (fallback: newest / oldest neighbours from full list). */
export function getPrevNext(current: SeoPage): { prev?: SeoPage; next?: SeoPage } {
  const all = sortByUpdated(getAllPublishedArticles());
  const sameCat = all.filter((p) => p.category === current.category);
  const list = sameCat.length >= 2 ? sameCat : all;
  const idx = list.findIndex((p) => p.slug === current.slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? list[idx - 1] : undefined,
    next: idx < list.length - 1 ? list[idx + 1] : undefined,
  };
}

/** Human label for a category — also used by the CategoryChip. */
export function categoryLabel(category: PageCategory): string {
  const map: Record<PageCategory, string> = {
    commercial: 'Commercial',
    template: 'Template',
    examples: 'Examples',
    comparison: 'Comparison',
    checklist: 'Checklist',
    'ai-comparison': 'AI Tool Comparison',
    'ai-review': 'AI Tool Review',
    'ai-pillar': 'AI Deep Dive',
    'github-trending': 'GitHub Trending',
    tutorial: 'Tutorial',
  };
  return map[category] ?? 'Analysis';
}

export function categoryDescription(category: PageCategory): string {
  const map: Record<PageCategory, string> = {
    commercial: 'Decision-stage guides for teams picking a tool to trial or buy.',
    template: 'Copy-ready templates for everyday knowledge work.',
    examples: 'Real-world example formats ready to adapt.',
    comparison: 'Format and workflow comparisons for clearer decisions.',
    checklist: 'Checklists for meetings, launches, and operational habits.',
    'ai-comparison': 'Head-to-head comparisons of AI tools, assistants, and model ecosystems.',
    'ai-review': 'In-depth reviews of individual AI developer tools.',
    'ai-pillar': 'Long-form analysis of the AI developer tool landscape and ecosystems.',
    'github-trending': 'Signal-rich deep dives on what the open-source world is actually shipping.',
    tutorial: 'Opinionated, evidence-backed tutorials for working with modern AI tooling.',
  };
  return map[category] ?? 'Editorial analysis from SignalForges.';
}

/** Categories that currently have enough content (>=3) to warrant a /category/ route. */
export function getArchivableCategories(): { category: PageCategory; items: SeoPage[] }[] {
  const byCat = groupByCategory(getAllPublishedArticles());
  return Object.entries(byCat)
    .filter(([, items]) => items.length >= MIN_CATEGORY_SIZE)
    .map(([category, items]) => ({ category: category as PageCategory, items: sortByUpdated(items) }));
}

/** Does this category have an archive page? (used by CategoryChip) */
export function categoryHasArchive(category: PageCategory): boolean {
  return getArchivableCategories().some((c) => c.category === category);
}

/** Reading-time estimate in minutes (minimum 3). */
export function estimateReadingTime(page: SeoPage): number {
  const words = estimateSeoPageContentWords(page);
  return Math.max(3, Math.ceil(words / WORDS_PER_MIN));
}

/** Human-readable last updated, e.g. "Apr 27, 2026". Empty string if unknown. */
export function formatUpdated(page: SeoPage): string {
  const raw = page.aiToolMeta?.lastUpdated;
  if (!raw) return '';
  const d = getDate(page);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(d);
}

export function formatUpdatedISO(page: SeoPage): string {
  const raw = page.aiToolMeta?.lastUpdated;
  if (!raw) return '';
  const d = getDate(page);
  return d.toISOString().split('T')[0];
}

export const MIN_CATEGORY_ARCHIVE_SIZE = MIN_CATEGORY_SIZE;
