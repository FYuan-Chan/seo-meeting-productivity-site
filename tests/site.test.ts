import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  buildCanonicalUrl,
  estimateSeoPageContentWords,
  getAdsenseReviewPageEntries,
  getAllPageEntries,
  MAX_PUBLIC_ARTICLES,
  MIN_PUBLIC_ARTICLE_WORDS,
  pages as sitePages,
  pageMap,
  siteConfig,
} from '../src/lib/site';
import { aiToolPages } from '../src/lib/ai-tools-data';
import { getEditorialQualityProfile } from '../src/lib/editorial-quality';
import { formatInlineMarkdown } from '../src/lib/formatting';
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
  it('keeps the raw inventory available while limiting public pages to the gated whitelist', () => {
    const rawPages = [...sitePages, ...aiToolPages];
    const pages = getAllPageEntries();
    const reviewPages = getAdsenseReviewPageEntries();
    const rawSlugs = rawPages.map((page) => page.slug);
    const reviewSlugs = reviewPages.map((page) => page.slug);

    expect(new Set(rawSlugs).size).toBe(rawSlugs.length);
    expect(pages.length).toBeGreaterThanOrEqual(90);
    expect(reviewPages.length).toBeGreaterThanOrEqual(10);
    expect(reviewPages.length).toBeLessThanOrEqual(MAX_PUBLIC_ARTICLES);
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
    expect(reviewPages.every((page) => estimateSeoPageContentWords(page) >= MIN_PUBLIC_ARTICLE_WORDS)).toBe(true);
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
    expect(pageMap['chatgpt-vs-claude']?.title).toMatch(/ChatGPT.*Claude|Claude.*ChatGPT/);
    expect(pageMap['claude-ecosystem-expansion-2026']?.title).toContain('Claude');
  });

  it('removes visible ad placeholders and monetization copy from article pages during review', () => {
    expect(articlePageSource).not.toContain('AdPlaceholder');
    expect(articlePageSource).not.toContain('ad-section');
    expect(articlePageSource).not.toContain('monetization-box');
    expect(articlePageSource).not.toContain('Primary monetization');
  });

  it('does not emit Review rating schema during AdSense recovery', () => {
    expect(articlePageSource).not.toContain('getReviewSchema');
    expect(articlePageSource).not.toContain('reviewRating');
  });

  it('supports Growth OS visual asset sections inside public articles', () => {
    expect(articlePageSource).toContain("section.type === 'visual-asset'");
    expect(articlePageSource).toContain('visual-asset-figure');
    expect(articlePageSource).toContain('<img');
  });

  it('counts visual asset section text toward editorial depth checks', () => {
    const basePage = {
      slug: 'visual-test',
      title: 'Visual Test',
      description: 'Visual support test.',
      eyebrow: 'Test',
      intro: ['Intro text.'],
      targetKeyword: 'visual test',
      category: 'ai-pillar',
      monetizationPrimary: 'ads',
      ctaLabel: 'Read',
      ctaHref: '/pages/best-ai-coding-tools/',
      relatedSlugs: [],
      sections: [],
      faq: [],
    } as any;
    const withVisual = {
      ...basePage,
      sections: [
        {
          type: 'visual-asset',
          heading: 'Repo workflow visual',
          src: '/assets/articles/demo/repo-workflow.svg',
          alt: 'Repository workflow diagram generated from README evidence',
          caption: 'A repo workflow card that explains how the collector, evidence ledger, and article gate relate.',
          evidenceRole: 'evidence',
          kind: 'repo-workflow',
        },
      ],
    };

    expect(estimateSeoPageContentWords(withVisual)).toBeGreaterThan(estimateSeoPageContentWords(basePage) + 10);
  });

  it('requires a structured evidence ledger for every AdSense review page', () => {
    for (const page of getAdsenseReviewPageEntries()) {
      const profile = getEditorialQualityProfile(page);

      expect(Array.isArray(profile.sources), page.slug).toBe(true);
      expect(profile.sources.length, page.slug).toBeGreaterThanOrEqual(3);
      expect(profile.sources.every((source) => /^https:\/\//.test(source.url)), page.slug).toBe(true);
      expect(profile.factPack.length, page.slug).toBeGreaterThanOrEqual(3);
      expect(profile.methodology.length, page.slug).toBeGreaterThanOrEqual(3);
      expect(profile.riskNotes.length, page.slug).toBeGreaterThanOrEqual(2);
      expect(profile.conclusion.recommendation, page.slug).toMatch(/\w/);
      expect(profile.conclusion.bestFor, page.slug).toMatch(/\w/);
      expect(profile.conclusion.avoidWhen, page.slug).toMatch(/\w/);
    }
  });

  it('renders lightweight article markdown without leaking raw artifacts', () => {
    const html = formatInlineMarkdown('Use **official docs** before running `npm test`.');

    expect(html).toContain('<strong>official docs</strong>');
    expect(html).toContain('<code>npm test</code>');
    expect(html).not.toContain('**official docs**');
    expect(formatInlineMarkdown('<script>alert(1)</script>')).not.toContain('<script>');
  });
});
