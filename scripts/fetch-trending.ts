#!/usr/bin/env node
/**
 * scripts/fetch-trending.ts
 * Fetch GitHub Trending repositories and save to JSON.
 *
 * Usage:
 *   npx tsx scripts/fetch-trending.ts [options]
 *
 * Options:
 *   --period daily|weekly|monthly   Trending period (default: daily)
 *   --language <lang>               Filter by language (e.g. typescript, python)
 *   --help                          Show this help message
 */

import fs from 'node:fs';
import path from 'node:path';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TrendingRepo {
  fullName: string;
  description: string;
  language: string;
  stars: number;
  todayStars: number;
  forks: number;
  url: string;
  fetchedAt: string;
  period: 'daily' | 'weekly' | 'monthly';
}

// ─── CLI helpers ─────────────────────────────────────────────────────────────

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';

function printHelp(): void {
  console.log(`
${BOLD}📡 GitHub Trending Fetcher${RESET}

${CYAN}Usage:${RESET}
  npx tsx scripts/fetch-trending.ts [options]

${CYAN}Options:${RESET}
  --period daily|weekly|monthly   Trending period (default: daily)
  --language <lang>               Filter by language (e.g. typescript, python)
  --help                          Show this help message

${CYAN}Examples:${RESET}
  npx tsx scripts/fetch-trending.ts
  npx tsx scripts/fetch-trending.ts --period weekly
  npx tsx scripts/fetch-trending.ts --period daily --language typescript

${DIM}Output: scripts/data/trending-{YYYY-MM-DD}.json${RESET}
`);
}

function parseArgs(argv: string[]): { period: 'daily' | 'weekly' | 'monthly'; language?: string } {
  const args = argv.slice(2);
  let period: 'daily' | 'weekly' | 'monthly' = 'daily';
  let language: string | undefined;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--help':
        printHelp();
        process.exit(0);
      case '--period':
        i++;
        if (!['daily', 'weekly', 'monthly'].includes(args[i])) {
          console.error(`${RED}❌ Invalid period: ${args[i]}. Must be daily, weekly, or monthly.${RESET}`);
          process.exit(1);
        }
        period = args[i] as 'daily' | 'weekly' | 'monthly';
        break;
      case '--language':
        i++;
        language = args[i];
        break;
      default:
        console.error(`${RED}❌ Unknown option: ${args[i]}${RESET}`);
        printHelp();
        process.exit(1);
    }
  }
  return { period, language };
}

// ─── HTML parsing ────────────────────────────────────────────────────────────

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

function parseNumber(text: string): number {
  const cleaned = text.replace(/,/g, '').trim();
  return parseInt(cleaned, 10) || 0;
}

function parseTrendingHtml(html: string, period: 'daily' | 'weekly' | 'monthly'): TrendingRepo[] {
  const repos: TrendingRepo[] = [];
  const fetchedAt = new Date().toISOString();

  // Split by article/repo row elements
  const articleRegex = /<article\s+class="Box-row"[^>]*>([\s\S]*?)<\/article>/g;
  let match: RegExpExecArray | null;

  while ((match = articleRegex.exec(html)) !== null) {
    const block = match[1];

    // Extract full name (e.g. "facebook/react")
    const nameMatch = block.match(/<h2[^>]*>[\s\S]*?<a[^>]*href="\/([^"]+)"[\s\S]*?<\/a>/);
    const fullName = nameMatch
      ? nameMatch[1].replace(/\s/g, '').trim()
      : '';
    if (!fullName) continue;

    // Description
    const descMatch = block.match(/<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/);
    const description = descMatch
      ? decodeHtmlEntities(descMatch[1].replace(/<[^>]+>/g, '').trim())
      : '';

    // Language
    const langMatch = block.match(/<span[^>]*itemprop="programmingLanguage"[^>]*>([\s\S]*?)<\/span>/);
    const language = langMatch ? langMatch[1].trim() : '';

    // Stars (total)
    const starsMatch = block.match(/<a[^>]*href="\/[^"]*\/stargazers"[^>]*>[\s]*([^<]+)/);
    const stars = starsMatch ? parseNumber(starsMatch[1]) : 0;

    // Forks
    const forksMatch = block.match(/<a[^>]*href="\/[^"]*\/forks"[^>]*>[\s]*([^<]+)/);
    const forks = forksMatch ? parseNumber(forksMatch[1]) : 0;

    // Today stars
    const todayMatch = block.match(/([\d,]+)\s+stars?\s+(today|this week|this month)/i);
    const todayStars = todayMatch ? parseNumber(todayMatch[1]) : 0;

    repos.push({
      fullName,
      description,
      language,
      stars,
      todayStars,
      forks,
      url: `https://github.com/${fullName}`,
      fetchedAt,
      period,
    });
  }

  return repos;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const { period, language } = parseArgs(process.argv);

  console.log(`\n${BOLD}📡 GitHub Trending Fetcher${RESET}`);
  console.log(`${DIM}Period: ${period}${language ? ` | Language: ${language}` : ''}${RESET}\n`);

  // Build URL
  let url = `https://github.com/trending?since=${period}`;
  if (language) {
    url = `https://github.com/trending/${encodeURIComponent(language)}?since=${period}`;
  }

  console.log(`${CYAN}⏳ Fetching ${url} ...${RESET}`);

  let html: string;
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) TrendingFetcher/1.0',
        'Accept': 'text/html',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    html = await response.text();
  } catch (err) {
    console.error(`${RED}❌ Failed to fetch GitHub Trending: ${(err as Error).message}${RESET}`);
    process.exit(1);
  }

  console.log(`${GREEN}✅ HTML fetched (${(html.length / 1024).toFixed(1)} KB)${RESET}`);

  // Parse
  const repos = parseTrendingHtml(html, period);

  if (repos.length === 0) {
    console.warn(`${YELLOW}⚠️  No repositories found. GitHub may have changed their HTML structure.${RESET}`);
    process.exit(0);
  }

  // Write output
  const today = new Date().toISOString().slice(0, 10);
  const dataDir = path.join(import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname), 'data');
  fs.mkdirSync(dataDir, { recursive: true });

  const outFile = path.join(dataDir, `trending-${today}.json`);
  const output = {
    date: today,
    period,
    language: language ?? null,
    totalRepos: repos.length,
    repos,
  };

  try {
    fs.writeFileSync(outFile, JSON.stringify(output, null, 2), 'utf-8');
  } catch (err) {
    console.error(`${RED}❌ Failed to write file: ${(err as Error).message}${RESET}`);
    process.exit(1);
  }

  console.log(`${GREEN}✅ Saved ${repos.length} repos → ${outFile}${RESET}\n`);

  // Summary
  console.log(`${BOLD}🏆 Top 5 Trending Repos:${RESET}`);
  const top5 = repos.slice(0, 5);
  top5.forEach((repo, i) => {
    const starsStr = repo.todayStars > 0 ? ` (+${repo.todayStars} today)` : '';
    console.log(
      `  ${CYAN}${i + 1}.${RESET} ${BOLD}${repo.fullName}${RESET} ⭐ ${repo.stars.toLocaleString()}${starsStr}`
    );
    if (repo.description) {
      console.log(`     ${DIM}${repo.description.slice(0, 80)}${repo.description.length > 80 ? '…' : ''}${RESET}`);
    }
  });

  console.log(`\n${GREEN}🎉 Done! ${repos.length} repositories fetched.${RESET}\n`);
}

main();
