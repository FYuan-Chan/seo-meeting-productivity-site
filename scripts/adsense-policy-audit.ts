#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

type AdsensePolicyAuditReport = {
  generatedAt: string;
  mode: 'adsense-recovery';
  distDir: string;
  htmlFiles: string[];
  articleFiles: string[];
  issues: string[];
  status: 'pass' | 'fail';
};

const DIST_DIR = resolve(process.cwd(), 'dist');
const REPORT_PATH = resolve(process.cwd(), 'reports/adsense-policy-audit.json');
const MIN_RENDERED_WORDS = 1200;
const MIN_SOURCE_LINKS = 3;

const BLOCKED_TEXT_PATTERNS = [
  { id: 'raw_markdown_bold_artifact', pattern: /\*\*[^*]+\*\*/ },
  { id: 'unverified_first_person_experience', pattern: /(?:\bAfter (?:using|testing|building|summarizing)\b|\b(?:When|After|Because|Since|While) I (?:used|tested|asked|measured|found|discovered|need|can ask)\b|\bI (?:used|tested|asked|measured|found|discovered|have spent|have been using)\b|\bI['’]m\b|\bI['’]ve learned\b|\bmy (?:workflow|experience|actual usage|testing|first stop)\b)/i },
  { id: 'unsupported_black_box_architecture_claim', pattern: /\b(?:8 experts|220B parameters|activates only|dense transformer architecture|trained on public GitHub repositories)\b/i },
  { id: 'unsupported_precise_adoption_or_benchmark_claim', pattern: /\b(?:weekly active users|paid subscribers|accepts ~?\d+(?:\.\d+)?%|\d+(?:\.\d+)?% faster|\d+(?:\.\d+)?% accuracy|scores \d+(?:\.\d+)?%|tokens\/(?:second|sec)|\d+\+ plugins|\d+K\+ lines|\d+\+ files|\d+ files in one prompt|raised \$\d+M|\$\d+(?:\.\d+)?B investment|10,000\+ employees)\b/i },
  { id: 'unsupported_social_source_claim', pattern: /\bSource: @/i },
  { id: 'adsense_get_rich_quick_language', pattern: /\bget rich quick\b/i },
  { id: 'guaranteed_adsense_approval_claim', pattern: /\b(?:guaranteed|100% guaranteed).{0,40}\b(?:AdSense|approval|ranking|revenue)\b/i },
];

const BLOCKED_PUBLIC_OPERATIONAL_PATTERNS = [
  { id: 'public_adsense_recovery_language', pattern: /\bAdSense (?:recovery|review)\b/i },
  { id: 'public_quality_recovery_language', pattern: /\bQuality recovery\b/i },
  { id: 'public_recovery_sitemap_language', pattern: /\b(?:recovery|review) sitemap\b/i },
  { id: 'public_review_set_language', pattern: /\bpublic review set\b/i },
  { id: 'public_quality_review_period_language', pattern: /\bquality review period\b/i },
  { id: 'public_operational_mode_language', pattern: /\bCurrent publishing mode\b/i },
];

function walkFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const stats = statSync(path);
    return stats.isDirectory() ? walkFiles(path) : [path];
  });
}

function publicPath(filePath: string): string {
  const rel = relative(DIST_DIR, filePath).replaceAll('\\', '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.replace(/\/index\.html$/, '/')}`;
  return `/${rel}`;
}

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function attr(anchorTag: string, name: string): string {
  const match = anchorTag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'));
  return match?.[1] ?? '';
}

function externalAnchors(html: string): { tag: string; href: string; rel: string }[] {
  return Array.from(html.matchAll(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["'][^>]*>/gi)).map((match) => {
    const tag = match[0];
    return { tag, href: match[1], rel: attr(tag, 'rel') };
  });
}

function sourceLedgerLinkCount(html: string): number {
  const sourceSection = html.match(/<section class="source-ledger"[\s\S]*?<\/section>/i)?.[0] ?? '';
  return Array.from(sourceSection.matchAll(/<a\b[^>]*href=["']https?:\/\/[^"']+["'][^>]*>/gi)).length;
}

function main(): void {
  const issues: string[] = [];

  if (!existsSync(DIST_DIR)) {
    issues.push('dist_missing_run_npm_build_first');
  }

  const htmlFiles = walkFiles(DIST_DIR).filter((file) => file.endsWith('.html')).sort();
  const articleFiles = walkFiles(join(DIST_DIR, 'pages')).filter((file) => file.endsWith('/index.html')).sort();

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const path = publicPath(file);
    const text = visibleText(html);

    for (const { id, pattern } of BLOCKED_PUBLIC_OPERATIONAL_PATTERNS) {
      if (pattern.test(text)) {
        issues.push(`${id}:${path}`);
      }
    }
  }

  for (const file of articleFiles) {
    const html = readFileSync(file, 'utf8');
    const path = publicPath(file);
    const text = visibleText(html);

    if (wordCount(text) < MIN_RENDERED_WORDS) {
      issues.push(`rendered_article_too_thin:${path}:${wordCount(text)}_words`);
    }

    for (const { id, pattern } of BLOCKED_TEXT_PATTERNS) {
      if (pattern.test(text)) {
        issues.push(`${id}:${path}`);
      }
    }

    for (const required of ['Source Ledger', 'Fact Pack', 'Editorial Conclusion', 'Refresh-sensitive details']) {
      if (!text.includes(required)) {
        issues.push(`missing_visible_quality_module:${path}:${required}`);
      }
    }

    const sourceLinks = sourceLedgerLinkCount(html);
    if (sourceLinks < MIN_SOURCE_LINKS) {
      issues.push(`source_ledger_too_small:${path}:${sourceLinks}`);
    }

    for (const anchor of externalAnchors(html)) {
      const relTokens = new Set(anchor.rel.split(/\s+/).filter(Boolean));
      if (!relTokens.has('noopener') || !relTokens.has('noreferrer')) {
        issues.push(`external_link_missing_safe_rel:${path}:${anchor.href}`);
      }
      const url = new URL(anchor.href);
      if (url.searchParams.get('utm_source') === 'signalforges') {
        if (!relTokens.has('nofollow') || !relTokens.has('sponsored')) {
          issues.push(`commercial_link_missing_sponsored_nofollow:${path}:${anchor.href}`);
        }
      }
    }
  }

  const report: AdsensePolicyAuditReport = {
    generatedAt: new Date().toISOString(),
    mode: 'adsense-recovery',
    distDir: DIST_DIR,
    htmlFiles: htmlFiles.map((file) => relative(process.cwd(), file).replaceAll('\\', '/')),
    articleFiles: articleFiles.map((file) => relative(process.cwd(), file).replaceAll('\\', '/')),
    issues,
    status: issues.length === 0 ? 'pass' : 'fail',
  };

  mkdirSync(dirname(REPORT_PATH), { recursive: true });
  writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ status: report.status, reportPath: REPORT_PATH, issues }, null, 2));

  if (report.status !== 'pass') {
    process.exit(1);
  }
}

main();
