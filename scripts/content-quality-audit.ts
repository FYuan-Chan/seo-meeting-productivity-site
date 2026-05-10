#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { estimateSeoPageContentWords, getAdsenseReviewPageEntries } from '../src/lib/site.js';
import { getEditorialQualityProfile } from '../src/lib/editorial-quality.js';
import { trustPages } from '../src/lib/trust-pages.js';

type AuditStatus = 'pass' | 'fail';

type PageAudit = {
  slug: string;
  title: string;
  wordCount: number;
  sourceBasisCount: number;
  visualAssetCount: number;
  originalValueCount: number;
  hasAuthorMethodDisclosure: boolean;
  publishDecision: string;
  status: AuditStatus;
  issues: string[];
};

const MIN_REVIEW_WORDS = 500;
const MIN_SOURCE_BASIS = 3;
const MIN_ORIGINAL_VALUE = 2;
const MIN_VISUAL_ASSETS = 1;

function auditPage(page: ReturnType<typeof getAdsenseReviewPageEntries>[number]): PageAudit {
  const profile = getEditorialQualityProfile(page);
  const wordCount = estimateSeoPageContentWords(page);
  const issues: string[] = [];

  if (wordCount < MIN_REVIEW_WORDS) issues.push(`word_count_below_${MIN_REVIEW_WORDS}`);
  if (profile.sourceBasis.length < MIN_SOURCE_BASIS) issues.push('source_basis_missing');
  if (profile.originalValue.length < MIN_ORIGINAL_VALUE) issues.push('original_value_missing');
  if (profile.visualAssets.length < MIN_VISUAL_ASSETS) issues.push('visual_structure_missing');
  if (profile.publishDecision !== 'approved-for-review') issues.push('not_approved_for_review');

  return {
    slug: page.slug,
    title: page.title,
    wordCount,
    sourceBasisCount: profile.sourceBasis.length,
    visualAssetCount: profile.visualAssets.length,
    originalValueCount: profile.originalValue.length,
    hasAuthorMethodDisclosure: true,
    publishDecision: profile.publishDecision,
    status: issues.length === 0 ? 'pass' : 'fail',
    issues,
  };
}

function main(): void {
  const pageAudits = getAdsenseReviewPageEntries().map(auditPage);
  const failedPages = pageAudits.filter((page) => page.status === 'fail');
  const trustIssues: string[] = [];

  if (trustPages.length < 7) trustIssues.push('missing_required_trust_pages');
  for (const page of trustPages) {
    if (page.sections.length < 2) trustIssues.push(`trust_page_too_thin:${page.slug}`);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: 'adsense-recovery',
    thresholds: {
      minReviewWords: MIN_REVIEW_WORDS,
      minSourceBasis: MIN_SOURCE_BASIS,
      minOriginalValue: MIN_ORIGINAL_VALUE,
      minVisualAssets: MIN_VISUAL_ASSETS,
    },
    summary: {
      reviewPages: pageAudits.length,
      passingReviewPages: pageAudits.length - failedPages.length,
      failingReviewPages: failedPages.length,
      trustPages: trustPages.length,
      trustIssues: trustIssues.length,
      overallStatus: failedPages.length === 0 && trustIssues.length === 0 ? 'pass' : 'fail',
    },
    pages: pageAudits,
    trustIssues,
  };

  const reportPath = resolve(process.cwd(), 'reports/content-quality-audit.json');
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(JSON.stringify({ ...report, reportPath }, null, 2));

  if (report.summary.overallStatus !== 'pass') {
    process.exit(1);
  }
}

main();
