#!/usr/bin/env node
/**
 * scripts/fetch-google-trends.ts
 * Discover trending keywords via Google Trends RSS + Google Suggest API.
 *
 * Usage:
 *   npx tsx scripts/fetch-google-trends.ts [options]
 *
 * Options:
 *   --geo US|GB|...                  Geographic region (default: US)
 *   --seed "ai tools,chatgpt,..."   Seed keywords, comma-separated
 *   --help                           Show this help message
 */

import fs from 'node:fs';
import path from 'node:path';

// ─── Types ───────────────────────────────────────────────────────────────────

interface GoogleTrendItem {
  keyword: string;
  source: 'trending' | 'suggest';
  trafficVolume?: string;
  relatedKeywords?: string[];
  fetchedAt: string;
  geo: string;
}

interface OutputData {
  date: string;
  geo: string;
  totalItems: number;
  items: GoogleTrendItem[];
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
${BOLD}🔍 Google Trends Keyword Fetcher${RESET}

${CYAN}Usage:${RESET}
  npx tsx scripts/fetch-google-trends.ts [options]

${CYAN}Options:${RESET}
  --geo US|GB|...                  Geographic region (default: US)
  --seed "ai tools,chatgpt,..."   Seed keywords for suggest API (comma-separated)
  --help                           Show this help message

${CYAN}Examples:${RESET}
  npx tsx scripts/fetch-google-trends.ts
  npx tsx scripts/fetch-google-trends.ts --geo US --seed "ai meeting,chatgpt,github copilot"

${DIM}Output: scripts/data/google-trends-{YYYY-MM-DD}.json${RESET}

${YELLOW}Note:${RESET} This script requires access to Google services.
  If you are in China or behind a firewall, you may need to configure
  an HTTP proxy via the HTTPS_PROXY or HTTP_PROXY environment variable.
  Example: HTTPS_PROXY=http://127.0.0.1:7890 npx tsx scripts/fetch-google-trends.ts
`);
}

function parseArgs(argv: string[]): { geo: string; seeds: string[] } {
  const args = argv.slice(2);
  let geo = 'US';
  let seeds: string[] = [];

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--help':
        printHelp();
        process.exit(0);
      case '--geo':
        i++;
        if (!args[i]) {
          console.error(`${RED}❌ --geo requires a value (e.g. US, GB)${RESET}`);
          process.exit(1);
        }
        geo = args[i].toUpperCase();
        break;
      case '--seed':
        i++;
        if (!args[i]) {
          console.error(`${RED}❌ --seed requires a value${RESET}`);
          process.exit(1);
        }
        seeds = args[i].split(',').map((s) => s.trim()).filter(Boolean);
        break;
      default:
        console.error(`${RED}❌ Unknown option: ${args[i]}${RESET}`);
        printHelp();
        process.exit(1);
    }
  }
  return { geo, seeds };
}

// ─── Network helpers ─────────────────────────────────────────────────────────

const REQUEST_TIMEOUT_MS = 15_000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2_000;

const COMMON_HEADERS: Record<string, string> = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
};

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = REQUEST_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetry(url: string, init: RequestInit = {}, retries = MAX_RETRIES): Promise<Response> {
  let lastError: Error | undefined;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, init);
      if (response.ok) return response;
      lastError = new Error(`HTTP ${response.status} ${response.statusText}`);
    } catch (err) {
      lastError = err as Error;
    }
    if (attempt < retries) {
      console.warn(`${YELLOW}⚠️  Attempt ${attempt + 1} failed, retrying in ${RETRY_DELAY_MS / 1000}s...${RESET}`);
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    }
  }
  throw lastError ?? new Error('Request failed');
}

function isNetworkError(err: Error): boolean {
  const msg = err.message.toLowerCase();
  return msg.includes('abort') || msg.includes('timeout') || msg.includes('econnrefused') || msg.includes('enotfound') || msg.includes('fetch failed') || msg.includes('network');
}

// ─── RSS parsing ─────────────────────────────────────────────────────────────

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function parseRssItems(xml: string, geo: string, fetchedAt: string): GoogleTrendItem[] {
  const items: GoogleTrendItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    // Title = keyword
    const titleMatch = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
    const keyword = titleMatch ? decodeXmlEntities(titleMatch[1].trim()) : '';
    if (!keyword) continue;

    // Traffic volume (ht:approx_traffic or similar)
    const trafficMatch = block.match(/<ht:approx_traffic>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/ht:approx_traffic>/);
    const trafficVolume = trafficMatch ? trafficMatch[1].trim() : undefined;

    // Related news keywords
    const relatedKeywords: string[] = [];
    const newsItemRegex = /<ht:news_item_title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/ht:news_item_title>/g;
    let newsMatch: RegExpExecArray | null;
    while ((newsMatch = newsItemRegex.exec(block)) !== null) {
      const newsTitle = decodeXmlEntities(newsMatch[1].trim());
      if (newsTitle) relatedKeywords.push(newsTitle);
    }

    items.push({
      keyword,
      source: 'trending',
      trafficVolume,
      relatedKeywords: relatedKeywords.length > 0 ? relatedKeywords : undefined,
      fetchedAt,
      geo,
    });
  }

  return items;
}

// ─── Google Suggest API ──────────────────────────────────────────────────────

async function fetchSuggestions(seed: string, geo: string, fetchedAt: string): Promise<GoogleTrendItem[]> {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(seed)}&gl=${geo}`;

  try {
    const response = await fetchWithRetry(url, {
      headers: { ...COMMON_HEADERS, 'Accept': 'application/json' },
    });

    const data = (await response.json()) as [string, string[]];
    const suggestions = data[1] ?? [];

    return suggestions
      .filter((s) => s.toLowerCase() !== seed.toLowerCase())
      .map((keyword) => ({
        keyword,
        source: 'suggest' as const,
        fetchedAt,
        geo,
      }));
  } catch (err) {
    const e = err as Error;
    if (isNetworkError(e)) {
      console.warn(`${YELLOW}⚠️  无法连接 Google Suggest 服务 for "${seed}": ${e.message}${RESET}`);
      console.warn(`${YELLOW}   请检查网络代理设置 (HTTPS_PROXY)${RESET}`);
    } else {
      console.warn(`${YELLOW}⚠️  Failed to fetch suggestions for "${seed}": ${e.message}${RESET}`);
    }
    return [];
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const { geo, seeds } = parseArgs(process.argv);

  console.log(`\n${BOLD}🔍 Google Trends Keyword Fetcher${RESET}`);
  console.log(`${DIM}Geo: ${geo}${seeds.length > 0 ? ` | Seeds: ${seeds.join(', ')}` : ''}${RESET}\n`);

  const fetchedAt = new Date().toISOString();
  const allItems: GoogleTrendItem[] = [];

  // 1. Fetch Google Trends RSS
  // Primary RSS URL
  const rssUrl = `https://trends.google.com/trending/rss?geo=${geo}`;
  // Fallback RSS URL (alternative endpoint)
  const rssUrlFallback = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=${geo}`;
  console.log(`${CYAN}⏳ Fetching Google Trends RSS: ${rssUrl}${RESET}`);

  let rssFetched = false;
  for (const url of [rssUrl, rssUrlFallback]) {
    try {
      const response = await fetchWithRetry(url, {
        headers: { ...COMMON_HEADERS, 'Accept': 'application/xml,text/xml' },
      });
      const xml = await response.text();
      const rssItems = parseRssItems(xml, geo, fetchedAt);
      allItems.push(...rssItems);
      console.log(`${GREEN}✅ RSS: found ${rssItems.length} trending topics${RESET}`);
      rssFetched = true;
      break;
    } catch (err) {
      const e = err as Error;
      if (url === rssUrlFallback) {
        // Both URLs failed
        if (isNetworkError(e)) {
          console.error(`${RED}❌ 无法连接 Google 服务，请检查网络代理设置。${RESET}`);
          console.error(`${RED}   可通过设置 HTTPS_PROXY 环境变量使用代理，例如:${RESET}`);
          console.error(`${RED}   HTTPS_PROXY=http://127.0.0.1:7890 npx tsx scripts/fetch-google-trends.ts${RESET}`);
        } else {
          console.warn(`${YELLOW}⚠️  RSS fetch failed: ${e.message}. Continuing with seed keywords...${RESET}`);
        }
      } else {
        console.warn(`${YELLOW}⚠️  Primary RSS failed (${e.message}), trying fallback URL...${RESET}`);
      }
    }
  }

  // 2. Fetch suggestions for each seed keyword
  if (seeds.length > 0) {
    console.log(`${CYAN}⏳ Fetching suggestions for ${seeds.length} seed keywords...${RESET}`);

    for (const seed of seeds) {
      const suggestions = await fetchSuggestions(seed, geo, fetchedAt);
      allItems.push(...suggestions);
      console.log(`  ${DIM}• "${seed}" → ${suggestions.length} suggestions${RESET}`);
      // Small delay to be polite
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  // 3. Deduplicate by keyword (case-insensitive)
  const seen = new Set<string>();
  const dedupedItems: GoogleTrendItem[] = [];
  for (const item of allItems) {
    const key = item.keyword.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      dedupedItems.push(item);
    }
  }

  console.log(`\n${GREEN}✅ Total: ${dedupedItems.length} unique keywords (from ${allItems.length} raw)${RESET}`);

  if (dedupedItems.length === 0) {
    console.warn(`${YELLOW}⚠️  No keywords found. Try adding seed keywords with --seed.${RESET}`);
    process.exit(0);
  }

  // 4. Write output
  const today = new Date().toISOString().slice(0, 10);
  const dataDir = path.join(import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname), 'data');
  fs.mkdirSync(dataDir, { recursive: true });

  const outFile = path.join(dataDir, `google-trends-${today}.json`);
  const output: OutputData = {
    date: today,
    geo,
    totalItems: dedupedItems.length,
    items: dedupedItems,
  };

  try {
    fs.writeFileSync(outFile, JSON.stringify(output, null, 2), 'utf-8');
  } catch (err) {
    console.error(`${RED}❌ Failed to write file: ${(err as Error).message}${RESET}`);
    process.exit(1);
  }

  console.log(`${GREEN}✅ Saved → ${outFile}${RESET}\n`);

  // Summary
  console.log(`${BOLD}📊 Top 10 Keywords:${RESET}`);
  const top10 = dedupedItems.slice(0, 10);
  top10.forEach((item, i) => {
    const badge = item.source === 'trending' ? '🔥' : '💡';
    const traffic = item.trafficVolume ? ` ${DIM}(${item.trafficVolume})${RESET}` : '';
    console.log(`  ${CYAN}${String(i + 1).padStart(2)}.${RESET} ${badge} ${item.keyword}${traffic}`);
  });

  const trendingCount = dedupedItems.filter((i) => i.source === 'trending').length;
  const suggestCount = dedupedItems.filter((i) => i.source === 'suggest').length;
  console.log(`\n${DIM}Sources: ${trendingCount} trending + ${suggestCount} suggest${RESET}`);
  console.log(`${GREEN}🎉 Done!${RESET}\n`);
}

main();
