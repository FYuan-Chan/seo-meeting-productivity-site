import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  buildCanonicalUrl,
  estimateSeoPageContentWords,
  getAdsenseReviewPageEntries,
  getAllPageEntries,
  pageMap,
  siteConfig,
} from '../src/lib/site';
import { trustPages } from '../src/lib/trust-pages';

const baseLayoutSource = readFileSync(
  resolve(import.meta.dirname, '../src/layouts/BaseLayout.astro'),
  'utf8'
);
const articlePageSource = readFileSync(
  resolve(import.meta.dirname, '../src/pages/pages/[slug].astro'),
  'utf8'
);

describe('site metadata', () => {
  it('keeps the raw inventory available while limiting AdSense review pages to a strong whitelist', () => {
    const pages = getAllPageEntries();
    const reviewPages = getAdsenseReviewPageEntries();
    const reviewSlugs = reviewPages.map((page) => page.slug);

    expect(pages.length).toBeGreaterThanOrEqual(90);
    expect(reviewPages.length).toBeGreaterThanOrEqual(10);
    expect(reviewPages.length).toBeLessThanOrEqual(15);
    expect(new Set(reviewSlugs).size).toBe(reviewSlugs.length);
    expect(reviewSlugs).toEqual(
      expect.arrayContaining([
        'chatgpt-vs-claude',
        'best-ai-coding-tools',
        'github-copilot-vs-cursor',
        'claude-ecosystem-expansion-2026'
      ])
    );
    expect(reviewSlugs).not.toEqual(
      expect.arrayContaining([
        'meeting-notes-template-word',
        'typescript-go-2026-04-28',
        'free-claude-code-2026-04-28',
        'ai-briefing-2026-04-28'
      ])
    );
    expect(reviewPages.every((page) => estimateSeoPageContentWords(page) >= 500)).toBe(true);
  });

  it('builds canonical URLs without duplicating slashes', () => {
    expect(buildCanonicalUrl('https://meetingflowhub.com/', '/pages/action-items-template/')).toBe(
      'https://meetingflowhub.com/pages/action-items-template/'
    );
  });

  it('keeps AdSense scripts disabled during recovery review', () => {
    expect(baseLayoutSource).not.toContain('pagead2.googlesyndication.com');
    expect(baseLayoutSource).not.toContain('adsbygoogle');
  });

  it('publishes trust pages required for AdSense review', () => {
    const slugs = trustPages.map((page) => page.slug);

    expect(slugs).toEqual(
      expect.arrayContaining([
        'about',
        'contact',
        'privacy-policy',
        'terms',
        'editorial-policy',
        'ai-use-disclosure',
        'author'
      ])
    );
    expect(trustPages.every((page) => page.sections.length >= 2)).toBe(true);
  });

  it('keeps AI pages resolvable for internal links and schema', () => {
    expect(pageMap['chatgpt-vs-claude']?.title).toContain('ChatGPT vs Claude');
    expect(pageMap['claude-ecosystem-expansion-2026']?.title).toContain('Claude');
  });

  it('removes visible ad placeholders and monetization copy from article pages during review', () => {
    expect(articlePageSource).not.toContain('AdPlaceholder');
    expect(articlePageSource).not.toContain('ad-section');
    expect(articlePageSource).not.toContain('monetization-box');
    expect(articlePageSource).not.toContain('Primary monetization');
  });
});
