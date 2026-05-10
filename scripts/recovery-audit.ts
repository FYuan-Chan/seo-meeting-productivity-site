#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { getAdsenseReviewPageEntries, siteConfig } from '../src/lib/site.js';
import { trustPages } from '../src/lib/trust-pages.js';

type RecoveryAuditReport = {
  generatedAt: string;
  mode: 'adsense-recovery';
  distDir: string;
  expectedPublicPaths: string[];
  sitemapUrls: string[];
  htmlFiles: string[];
  issues: string[];
  status: 'pass' | 'fail';
};

const DIST_DIR = resolve(process.cwd(), 'dist');
const REPORT_PATH = resolve(process.cwd(), 'reports/recovery-audit.json');
const DOTENV_PATH = resolve(process.cwd(), '.env');
const BLOCKED_HTML_PATTERNS = [
  'Ad Space',
  'Primary monetization',
  'adsbygoogle',
  'pagead2.googlesyndication.com',
  'monetization-box',
];

function walkFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const stats = statSync(path);
    return stats.isDirectory() ? walkFiles(path) : [path];
  });
}

function pathForHtmlFile(filePath: string): string {
  const rel = relative(DIST_DIR, filePath).replaceAll('\\', '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.replace(/\/index\.html$/, '/')}`;
  return `/${rel}`;
}

function normalizeInternalHref(href: string): string | null {
  const cleanHref = href.trim();
  if (
    !cleanHref ||
    cleanHref.startsWith('#') ||
    cleanHref.startsWith('mailto:') ||
    cleanHref.startsWith('tel:') ||
    cleanHref.startsWith('javascript:') ||
    /^(https?:)?\/\//.test(cleanHref)
  ) {
    return null;
  }

  const [withoutFragment] = cleanHref.split('#');
  const [path] = withoutFragment.split('?');
  if (!path.startsWith('/')) return null;
  return path.endsWith('/') || extname(path) ? path : `${path}/`;
}

function extractHrefs(html: string): string[] {
  return Array.from(html.matchAll(/\shref=["']([^"']+)["']/g)).map((match) => match[1]);
}

function extractSitemapUrls(sitemapXml: string): string[] {
  return Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) => match[1]);
}

function getExpectedSiteUrl(): string {
  const fromProcess = process.env.PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (fromProcess) return fromProcess.replace(/\/$/, '');

  if (existsSync(DOTENV_PATH)) {
    const env = readFileSync(DOTENV_PATH, 'utf8');
    const match = env.match(/^(PUBLIC_SITE_URL|SITE_URL)=(.+)$/m);
    if (match?.[2]) return match[2].trim().replace(/\/$/, '');
  }

  return siteConfig.siteUrl.replace(/\/$/, '');
}

function sitemapUrlToPath(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function main(): void {
  const issues: string[] = [];
  const expectedSiteUrl = getExpectedSiteUrl();
  const reviewPages = getAdsenseReviewPageEntries();
  const expectedPublicPaths = [
    '/',
    ...trustPages.map((page) => `/${page.slug}/`),
    ...reviewPages.map((page) => `/pages/${page.slug}/`),
  ].sort();

  if (!existsSync(DIST_DIR)) {
    issues.push('dist_missing_run_npm_build_first');
  }

  const htmlFiles = walkFiles(DIST_DIR).filter((file) => file.endsWith('.html'));
  const htmlPaths = new Set(htmlFiles.map(pathForHtmlFile));
  const assetPaths = new Set(walkFiles(DIST_DIR).map((file) => `/${relative(DIST_DIR, file).replaceAll('\\', '/')}`));

  for (const expectedPath of expectedPublicPaths) {
    if (!htmlPaths.has(expectedPath)) {
      issues.push(`missing_public_html:${expectedPath}`);
    }
  }

  const articlePaths = [...htmlPaths].filter((path) => path.startsWith('/pages/')).sort();
  const expectedArticlePaths = reviewPages.map((page) => `/pages/${page.slug}/`).sort();
  if (JSON.stringify(articlePaths) !== JSON.stringify(expectedArticlePaths)) {
    issues.push(`unexpected_article_paths:${articlePaths.join(',')}`);
  }

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const publicPath = pathForHtmlFile(file);

    for (const pattern of BLOCKED_HTML_PATTERNS) {
      if (html.includes(pattern)) {
        issues.push(`blocked_recovery_pattern:${publicPath}:${pattern}`);
      }
    }

    for (const href of extractHrefs(html)) {
      const internalPath = normalizeInternalHref(href);
      if (!internalPath) continue;

      const existsAsPage = htmlPaths.has(internalPath);
      const existsAsAsset = assetPaths.has(internalPath);
      if (!existsAsPage && !existsAsAsset) {
        issues.push(`broken_internal_href:${publicPath}:${href}`);
      }
    }
  }

  const sitemapPath = join(DIST_DIR, 'sitemap.xml');
  const sitemapUrls = existsSync(sitemapPath) ? extractSitemapUrls(readFileSync(sitemapPath, 'utf8')).sort() : [];
  if (!existsSync(sitemapPath)) {
    issues.push('sitemap_missing');
  } else {
    const sitemapPaths = sitemapUrls.map(sitemapUrlToPath).sort();
    if (JSON.stringify(sitemapPaths) !== JSON.stringify(expectedPublicPaths)) {
      issues.push('sitemap_does_not_match_recovery_public_paths');
    }
    for (const url of sitemapUrls) {
      if (!url.startsWith(`${expectedSiteUrl}/`)) {
        issues.push(`sitemap_wrong_origin:${url}`);
      }
    }
  }

  const report: RecoveryAuditReport = {
    generatedAt: new Date().toISOString(),
    mode: 'adsense-recovery',
    distDir: DIST_DIR,
    expectedPublicPaths,
    sitemapUrls,
    htmlFiles: htmlFiles.map((file) => relative(process.cwd(), file).replaceAll('\\', '/')).sort(),
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
