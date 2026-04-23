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

import { getAllPageEntries } from '../src/lib/site.js';
import type { SeoPage } from '../src/lib/site.js';

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

${DIM}Validates all SeoPage entries for completeness, consistency,
and correctness.${RESET}

${BOLD}Usage:${RESET}
  npx tsx scripts/validate-pages.ts

${BOLD}Options:${RESET}
  --help    Show this help message

${BOLD}Checks:${RESET}
  1. Slug uniqueness
  2. Related slugs validity
  3. FAQ non-empty
  4. AI tool meta completeness
  5. Required fields non-empty
  6. Slug format validation
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
  const allSlugs = new Set(pages.map((p) => p.slug));
  const errors: string[] = [];

  for (const page of pages) {
    for (const related of page.relatedSlugs) {
      if (!allSlugs.has(related)) {
        errors.push(`Page "${page.slug}" references non-existent slug "${related}"`);
      }
    }
  }

  return { rule: 'Related slugs validity', passed: errors.length === 0, errors };
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

// ─── Main ────────────────────────────────────────────────────────────────────

function main(): void {
  console.log(`\n${BOLD}🔍 Page Data Validator${RESET}\n`);

  let pages: SeoPage[];
  try {
    pages = getAllPageEntries();
  } catch (err) {
    console.error(`${RED}❌ Failed to load pages: ${(err as Error).message}${RESET}`);
    console.error(`${DIM}Make sure you're running from the project root.${RESET}`);
    process.exit(1);
  }

  console.log(`${DIM}Found ${pages.length} pages to validate${RESET}\n`);

  const results: ValidationResult[] = [
    validateSlugUniqueness(pages),
    validateRelatedSlugs(pages),
    validateFaqNonEmpty(pages),
    validateAiToolMeta(pages),
    validateRequiredFields(pages),
    validateSlugFormat(pages),
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
  console.log(`${DIM}Total pages checked: ${pages.length}${RESET}\n`);

  if (failCount > 0) {
    console.log(`${RED}❌ Validation failed with ${failCount} error(s).${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`${GREEN}✅ All validations passed!${RESET}\n`);
  }
}

main();
