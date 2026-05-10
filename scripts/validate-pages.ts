#!/usr/bin/env node
/**
 * scripts/validate-pages.ts
 * Validate all SeoPage data for completeness and consistency.
 *
 * Usage:
 *   npx tsx scripts/validate-pages.ts [options]
 *
 * Options:
 *   --help    Show this help message
 */

import { estimateSeoPageContentWords, getAdsenseReviewPageEntries, getAllPageEntries } from '../src/lib/site.js';
import type { SeoPage } from '../src/lib/site.js';
import { trustPages } from '../src/lib/trust-pages.js';

// ─── CLI helpers ─────────────────────────────────────────────────────────────

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';

const PASS = `${GREEN}✅ PASS${RESET}`;
const FAIL = `${RED}❌ FAIL${RESET}`;

function printHelp(): void {
  console.log(`
${BOLD}🔍 Page Data Validator${RESET}

${DIM}Validates the full content inventory and the smaller AdSense
review set used for the public sitemap.${RESET}

${BOLD}Usage:${RESET}
  npx tsx scripts/validate-pages.ts

${BOLD}Options:${RESET}
  --help    Show this help message

${BOLD}Checks:${RESET}
  1. Slug uniqueness
  2. AdSense review set size and depth
  3. Review page related slugs validity
  4. FAQ non-empty
  5. AI tool meta completeness
  5. Required fields non-empty
  6. Slug format validation
  7. Trust pages present
`);
}

// ─── Parse args ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.includes('--help')) {
  printHelp();
  process.exit(0);
}

// ─── Validation rules ────────────────────────────────────────────────────────

interface ValidationResult {
  rule: string;
  passed: boolean;
  errors: string[];
}

function validateSlugUniqueness(pages: SeoPage[]): ValidationResult {
  const slugs = new Map<string, number>();
  const errors: string[] = [];

  for (const page of pages) {
    const count = (slugs.get(page.slug) ?? 0) + 1;
    slugs.set(page.slug, count);
  }

  for (const [slug, count] of slugs) {
    if (count > 1) {
      errors.push(`Duplicate slug "${slug}" appears ${count} times`);
    }
  }

  return { rule: 'Slug uniqueness', passed: errors.length === 0, errors };
}

function validateRelatedSlugs(pages: SeoPage[]): ValidationResult {
  const publicSlugs = new Set(pages.map((p) => p.slug));
  const errors: string[] = [];

  for (const page of pages) {
    for (const related of page.relatedSlugs) {
      if (!publicSlugs.has(related)) {
        errors.push(`Review page "${page.slug}" references non-public review slug "${related}"`);
      }
    }
  }

  return { rule: 'Review page related slugs stay inside public review set', passed: errors.length === 0, errors };
}

function validateAdsenseReviewSet(pages: SeoPage[]): ValidationResult {
  const errors: string[] = [];
  const blockedSlugs = new Set([
    'meeting-notes-template-word',
    'meeting-notes-template-free',
    'typescript-go-2026-04-28',
    'free-claude-code-2026-04-28',
    'ai-briefing-2026-04-28'
  ]);

  if (pages.length < 10 || pages.length > 15) {
    errors.push(`AdSense review set must contain 10-15 pages, found ${pages.length}`);
  }

  for (const page of pages) {
    const words = estimateSeoPageContentWords(page);
    if (words < 500) {
      errors.push(`Review page "${page.slug}" is too thin (${words} words, minimum 500)`);
    }
    if (blockedSlugs.has(page.slug)) {
      errors.push(`Blocked low-value or risky slug is still in review set: "${page.slug}"`);
    }
  }

  return { rule: 'AdSense review set quality', passed: errors.length === 0, errors };
}

function validateFaqNonEmpty(pages: SeoPage[]): ValidationResult {
  const errors: string[] = [];

  for (const page of pages) {
    if (!page.faq || page.faq.length === 0) {
      errors.push(`Page "${page.slug}" has no FAQ entries`);
    }
  }

  return { rule: 'FAQ non-empty', passed: errors.length === 0, errors };
}

function validateAiToolMeta(pages: SeoPage[]): ValidationResult {
  const errors: string[] = [];
  const aiCategories = new Set(['ai-comparison', 'ai-review', 'ai-pillar', 'github-trending', 'tutorial']);

  for (const page of pages) {
    const needsMeta = aiCategories.has(page.category);

    if (needsMeta) {
      // 4a. aiToolMeta must exist
      if (!page.aiToolMeta) {
        errors.push(`Page "${page.slug}" (category: ${page.category}) missing aiToolMeta`);
        continue;
      }

      // 4b. tools non-empty
      if (!page.aiToolMeta.tools || page.aiToolMeta.tools.length === 0) {
        errors.push(`Page "${page.slug}" aiToolMeta.tools is empty`);
      }

      // 4c. comparisonData consistency
      if (page.aiToolMeta.comparisonData) {
        const { dimensions, ratings } = page.aiToolMeta.comparisonData;
        for (const [tool, scores] of Object.entries(ratings)) {
          for (const dim of dimensions) {
            if (!(dim in scores)) {
              errors.push(`Page "${page.slug}" comparisonData: tool "${tool}" missing dimension "${dim}"`);
            }
          }
        }
      }

      // 4d. affiliateLinks URL format
      if (page.aiToolMeta.affiliateLinks) {
        for (const link of page.aiToolMeta.affiliateLinks) {
          if (link.url && !/^https?:\/\//.test(link.url)) {
            errors.push(`Page "${page.slug}" affiliateLink for "${link.tool}" has invalid URL: "${link.url}"`);
          }
        }
      }
    }
  }

  return { rule: 'AI tool meta validation', passed: errors.length === 0, errors };
}

function validateRequiredFields(pages: SeoPage[]): ValidationResult {
  const errors: string[] = [];

  for (const page of pages) {
    if (!page.title || page.title.trim() === '') {
      errors.push(`Page "${page.slug}" has empty title`);
    }
    if (!page.description || page.description.trim() === '') {
      errors.push(`Page "${page.slug}" has empty description`);
    }
    if (!page.targetKeyword || page.targetKeyword.trim() === '') {
      errors.push(`Page "${page.slug}" has empty targetKeyword`);
    }
  }

  return { rule: 'Required fields non-empty', passed: errors.length === 0, errors };
}

function validateSlugFormat(pages: SeoPage[]): ValidationResult {
  const errors: string[] = [];
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  for (const page of pages) {
    if (!slugRegex.test(page.slug)) {
      errors.push(`Page slug "${page.slug}" has invalid format (must be lowercase letters, numbers, hyphens only)`);
    }
  }

  return { rule: 'Slug format', passed: errors.length === 0, errors };
}

function normalizeInternalPath(href: string): string | null {
  if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return null;
  }

  const [path] = href.split(/[?#]/);
  if (!path || !path.startsWith('/')) return null;
  return path.endsWith('/') || path.includes('.') ? path : `${path}/`;
}

function validatePublicInternalLinks(pages: SeoPage[]): ValidationResult {
  const allowedPaths = new Set<string>([
    '/',
    ...trustPages.map((page) => `/${page.slug}/`),
    ...pages.map((page) => `/pages/${page.slug}/`),
  ]);
  const errors: string[] = [];

  for (const page of pages) {
    const links = [page.ctaHref, ...page.relatedSlugs.map((slug) => `/pages/${slug}/`)];
    for (const href of links) {
      const internalPath = normalizeInternalPath(href);
      if (internalPath && !allowedPaths.has(internalPath)) {
        errors.push(`Review page "${page.slug}" links to non-public recovery path "${href}"`);
      }
    }
  }

  return { rule: 'Review page internal links stay public', passed: errors.length === 0, errors };
}

function validateTrustPages(): ValidationResult {
  const required = new Set([
    'about',
    'contact',
    'privacy-policy',
    'terms',
    'editorial-policy',
    'ai-use-disclosure',
    'author',
  ]);
  const slugs = new Set(trustPages.map((page) => page.slug));
  const errors: string[] = [];

  for (const slug of required) {
    if (!slugs.has(slug)) {
      errors.push(`Missing trust page "${slug}"`);
    }
  }

  for (const page of trustPages) {
    if (page.sections.length < 2) {
      errors.push(`Trust page "${page.slug}" needs at least 2 sections`);
    }
  }

  const privacyPolicy = trustPages.find((page) => page.slug === 'privacy-policy');
  const privacyText = privacyPolicy?.sections.flatMap((section) => section.paragraphs).join(' ') ?? '';
  if (!privacyText.includes('https://policies.google.com/technologies/partner-sites')) {
    errors.push('Privacy policy should disclose the Google partner-sites data-use link before AdSense review');
  }

  return { rule: 'Trust pages present', passed: errors.length === 0, errors };
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main(): void {
  console.log(`\n${BOLD}🔍 Page Data Validator${RESET}\n`);

  let pages: SeoPage[];
  let reviewPages: SeoPage[];
  try {
    pages = getAllPageEntries();
    reviewPages = getAdsenseReviewPageEntries();
  } catch (err) {
    console.error(`${RED}❌ Failed to load pages: ${(err as Error).message}${RESET}`);
    console.error(`${DIM}Make sure you're running from the project root.${RESET}`);
    process.exit(1);
  }

  console.log(`${DIM}Found ${pages.length} inventory pages; ${reviewPages.length} AdSense review pages${RESET}\n`);

  const results: ValidationResult[] = [
    validateSlugUniqueness(pages),
    validateAdsenseReviewSet(reviewPages),
    validateRelatedSlugs(reviewPages),
    validatePublicInternalLinks(reviewPages),
    validateFaqNonEmpty(reviewPages),
    validateAiToolMeta(reviewPages),
    validateRequiredFields(reviewPages),
    validateSlugFormat(reviewPages),
    validateTrustPages(),
  ];

  // Print results
  let passCount = 0;
  let failCount = 0;

  for (const result of results) {
    const status = result.passed ? PASS : FAIL;
    console.log(`${status} ${result.rule}`);

    if (!result.passed) {
      failCount++;
      for (const error of result.errors) {
        console.log(`  ${YELLOW}→ ${error}${RESET}`);
      }
    } else {
      passCount++;
    }
  }

  // Summary
  console.log(`\n${'─'.repeat(50)}`);
  console.log(`${BOLD}Summary:${RESET} ${GREEN}${passCount} passed${RESET}, ${failCount > 0 ? RED : GREEN}${failCount} failed${RESET}`);
  console.log(`${DIM}Inventory pages checked: ${pages.length}${RESET}`);
  console.log(`${DIM}Review pages checked: ${reviewPages.length}${RESET}\n`);

  if (failCount > 0) {
    console.log(`${RED}❌ Validation failed with ${failCount} error(s).${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`${GREEN}✅ All validations passed!${RESET}\n`);
  }
}

main();
