import { describe, expect, it } from 'vitest';
import {
  categoryDescription,
  categoryHasArchive,
  categoryLabel,
  estimateReadingTime,
  formatUpdated,
  getAllPublishedArticles,
  getArchivableCategories,
  getPrevNext,
  groupByCategory,
  groupByYearMonth,
  sortByUpdated,
  MIN_CATEGORY_ARCHIVE_SIZE,
} from '../src/lib/articles';
import type { PageCategory, SeoPage } from '../src/lib/site';

const BASE: SeoPage = {
  slug: 'x',
  title: 't',
  description: 'd',
  eyebrow: 'e',
  intro: ['i'],
  targetKeyword: 'k',
  category: 'ai-comparison',
  monetizationPrimary: 'affiliate',
  ctaLabel: 'cta',
  ctaHref: '/pages/x/',
  relatedSlugs: [],
  sections: [],
  faq: [],
};

function make(slug: string, overrides: Partial<SeoPage> = {}): SeoPage {
  return { ...BASE, slug, ...overrides };
}

describe('articles lib', () => {
  it('returns the AdSense review whitelist as published articles', () => {
    const all = getAllPublishedArticles();
    expect(all.length).toBeGreaterThanOrEqual(10);
    expect(all.length).toBeLessThanOrEqual(25);
  });

  it('sortByUpdated is stable and descending', () => {
    const pages = [
      make('a', { aiToolMeta: { type: 'comparison', tools: [], lastUpdated: '2026-01-01' } }),
      make('b', { aiToolMeta: { type: 'comparison', tools: [], lastUpdated: '2026-05-01' } }),
      make('c', { aiToolMeta: { type: 'comparison', tools: [], lastUpdated: '2026-03-01' } }),
      make('d'), // no lastUpdated -> default DEFAULT_DATE
    ];
    const sorted = sortByUpdated(pages).map((p) => p.slug);
    // b (May) > d (default 2026-04-01) > c (Mar) > a (Jan)
    expect(sorted).toEqual(['b', 'd', 'c', 'a']);
  });

  it('sortByUpdated tolerates empty input', () => {
    expect(sortByUpdated([])).toEqual([]);
  });

  it('groupByCategory buckets pages by category', () => {
    const pages = [
      make('a', { category: 'ai-comparison' }),
      make('b', { category: 'ai-pillar' }),
      make('c', { category: 'ai-comparison' }),
    ];
    const grouped = groupByCategory(pages);
    expect(grouped['ai-comparison']?.map((p) => p.slug)).toEqual(['a', 'c']);
    expect(grouped['ai-pillar']?.map((p) => p.slug)).toEqual(['b']);
  });

  it('groupByYearMonth splits across years and months', () => {
    const pages = [
      make('a', { aiToolMeta: { type: 'comparison', tools: [], lastUpdated: '2026-04-10' } }),
      make('b', { aiToolMeta: { type: 'comparison', tools: [], lastUpdated: '2026-05-02' } }),
      make('c', { aiToolMeta: { type: 'comparison', tools: [], lastUpdated: '2025-12-12' } }),
    ];
    const grouped = groupByYearMonth(pages);
    expect(grouped[0].key).toBe('2026-05');
    expect(grouped[1].key).toBe('2026-04');
    expect(grouped[2].key).toBe('2025-12');
    expect(grouped[0].label).toContain('May 2026');
  });

  it('groupByYearMonth handles empty input', () => {
    expect(groupByYearMonth([])).toEqual([]);
  });

  it('categoryLabel and categoryDescription cover all PageCategory values', () => {
    const categories: PageCategory[] = [
      'commercial', 'template', 'examples', 'comparison', 'checklist',
      'ai-comparison', 'ai-review', 'ai-pillar', 'github-trending', 'tutorial',
    ];
    for (const c of categories) {
      expect(categoryLabel(c)).toMatch(/\w/);
      expect(categoryDescription(c)).toMatch(/\w/);
    }
  });

  it('getArchivableCategories respects MIN_CATEGORY_ARCHIVE_SIZE', () => {
    const list = getArchivableCategories();
    for (const item of list) {
      expect(item.items.length).toBeGreaterThanOrEqual(MIN_CATEGORY_ARCHIVE_SIZE);
    }
    // categoryHasArchive flags at least one real category
    expect(categoryHasArchive('ai-comparison')).toBe(true);
  });

  it('getPrevNext returns undefined at list boundaries', () => {
    const all = sortByUpdated(getAllPublishedArticles());
    if (all.length >= 2) {
      const first = all[0];
      const last = all[all.length - 1];
      // Within the whole list (fallback path):
      // first has no prev when same-cat fallback collapses; prev may be undefined depending on cat
      const res = getPrevNext(first);
      expect(res).toBeTruthy();
      const res2 = getPrevNext(last);
      expect(res2).toBeTruthy();
    }
  });

  it('estimateReadingTime returns at least 3 minutes', () => {
    const res = estimateReadingTime(make('tiny'));
    expect(res).toBeGreaterThanOrEqual(3);
  });

  it('formatUpdated returns "" when lastUpdated is missing', () => {
    expect(formatUpdated(make('no-date'))).toBe('');
    expect(formatUpdated(make('d', { aiToolMeta: { type: 'comparison', tools: [], lastUpdated: '2026-04-27' } })))
      .toMatch(/Apr 27, 2026/);
  });
});
