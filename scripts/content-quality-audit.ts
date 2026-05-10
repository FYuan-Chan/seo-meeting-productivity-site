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
  sourceCount: number;
  factPackCount: number;
  methodologyCount: number;
  riskNoteCount: number;
  sourceBasisCount: number;
  visualAssetCount: number;
  originalValueCount: number;
  hasAuthorMethodDisclosure: boolean;
  hasConclusion: boolean;
  riskyExperienceClaims: string[];
  publishDecision: string;
  status: AuditStatus;
  issues: string[];
};

const MIN_REVIEW_WORDS = 800;
const MIN_SOURCE_BASIS = 3;
const MIN_SOURCES = 3;
const MIN_FACTS = 3;
const MIN_METHODOLOGY_ITEMS = 3;
const MIN_RISK_NOTES = 2;
const MIN_ORIGINAL_VALUE = 2;
const MIN_VISUAL_ASSETS = 1;

const RISKY_EXPERIENCE_PATTERNS = [
  /\bafter (?:using|testing|building|summarizing)\b/i,
  /(?:^|[\s"'])I (?:used|tested|asked|measured|found|discovered|have spent|have been using)\b/,
  /\bmy (?:workflow|experience|actual usage|testing)\b/i,
];

function collectPageText(page: ReturnType<typeof getAdsenseReviewPageEntries>[number]): string {
  const sectionText = page.sections.flatMap((section) => {
    if ('paragraphs' in section) return section.paragraphs;
    if ('items' in section) return section.items.map((item) => [item.label, item.text].filter(Boolean).join(' '));
    if ('cards' in section) return section.cards.map((card) => `${card.title} ${card.description}`);
    if ('rows' in section) return [section.heading, ...section.columns, ...section.rows.flat()];
    if ('dimensions' in section) return [section.heading, ...section.dimensions, ...section.tools];
    if ('tools' in section) {
      return section.tools.map((tool) =>
        [tool.name, tool.summary, ...(tool.pros ?? []), ...(tool.cons ?? []), tool.pricing].filter(Boolean).join(' ')
      );
    }
    if ('plans' in section) {
      return section.plans.map((plan) => Object.values(plan).filter(Boolean).join(' '));
    }
    if ('useCases' in section) return section.useCases.map((item) => `${item.scenario} ${item.recommended} ${item.reason}`);
    if ('src' in section) {
      return [
        section.heading,
        section.alt,
        section.caption,
        section.evidenceRole,
        section.kind,
        section.credit ?? '',
      ];
    }
    return [];
  });

  return [page.title, page.description, ...page.intro, ...sectionText, ...page.faq.flatMap((item) => [item.question, item.answer])].join(' ');
}

function findRiskyExperienceClaims(page: ReturnType<typeof getAdsenseReviewPageEntries>[number]): string[] {
  const text = collectPageText(page);
  return RISKY_EXPERIENCE_PATTERNS.filter((pattern) => pattern.test(text)).map((pattern) => pattern.source);
}

function auditPage(page: ReturnType<typeof getAdsenseReviewPageEntries>[number]): PageAudit {
  const profile = getEditorialQualityProfile(page);
  const wordCount = estimateSeoPageContentWords(page);
  const riskyExperienceClaims = findRiskyExperienceClaims(page);
  const issues: string[] = [];

  if (wordCount < MIN_REVIEW_WORDS) issues.push(`word_count_below_${MIN_REVIEW_WORDS}`);
  if (profile.sources.length < MIN_SOURCES) issues.push('structured_sources_missing');
  if (profile.sources.some((source) => !/^https:\/\//.test(source.url))) issues.push('source_url_not_https');
  if (profile.factPack.length < MIN_FACTS) issues.push('fact_pack_missing');
  if (profile.methodology.length < MIN_METHODOLOGY_ITEMS) issues.push('methodology_missing');
  if (profile.riskNotes.length < MIN_RISK_NOTES) issues.push('risk_notes_missing');
  if (!profile.conclusion.recommendation || !profile.conclusion.bestFor || !profile.conclusion.avoidWhen) {
    issues.push('conclusion_missing');
  }
  if (riskyExperienceClaims.length > 0 && (profile.experienceEvidence?.length ?? 0) < 2) {
    issues.push('unverified_first_person_experience_claim');
  }
  if (profile.sourceBasis.length < MIN_SOURCE_BASIS) issues.push('source_basis_missing');
  if (profile.originalValue.length < MIN_ORIGINAL_VALUE) issues.push('original_value_missing');
  if (profile.visualAssets.length < MIN_VISUAL_ASSETS) issues.push('visual_structure_missing');
  if (profile.publishDecision !== 'approved-for-review') issues.push('not_approved_for_review');

  return {
    slug: page.slug,
    title: page.title,
    wordCount,
    sourceCount: profile.sources.length,
    factPackCount: profile.factPack.length,
    methodologyCount: profile.methodology.length,
    riskNoteCount: profile.riskNotes.length,
    sourceBasisCount: profile.sourceBasis.length,
    visualAssetCount: profile.visualAssets.length,
    originalValueCount: profile.originalValue.length,
    hasAuthorMethodDisclosure: true,
    hasConclusion: Boolean(profile.conclusion.recommendation && profile.conclusion.bestFor && profile.conclusion.avoidWhen),
    riskyExperienceClaims,
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
  const privacyPolicy = trustPages.find((page) => page.slug === 'privacy-policy');
  const privacyText = privacyPolicy?.sections.flatMap((section) => section.paragraphs).join(' ') ?? '';
  if (!privacyText.includes('https://policies.google.com/technologies/partner-sites')) {
    trustIssues.push('privacy_policy_missing_google_partner_sites_disclosure');
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: 'adsense-recovery',
    thresholds: {
      minReviewWords: MIN_REVIEW_WORDS,
      minSources: MIN_SOURCES,
      minFacts: MIN_FACTS,
      minMethodologyItems: MIN_METHODOLOGY_ITEMS,
      minRiskNotes: MIN_RISK_NOTES,
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
