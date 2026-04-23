#!/usr/bin/env node
/**
 * scripts/generate-page-template.ts
 * Generate SeoPage TypeScript data skeleton for new pages.
 *
 * Usage:
 *   npx tsx scripts/generate-page-template.ts [options]
 *
 * Options:
 *   --type comparison|pillar|review|trending-digest|setup-guide
 *   --tools "ChatGPT,Claude"         Tool names (comma-separated)
 *   --keyword "chatgpt vs claude"     Target keyword
 *   --category ai-comparison|ai-review|ai-pillar|github-trending|tutorial
 *   --help                            Show this help message
 */

// ─── CLI helpers ─────────────────────────────────────────────────────────────

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const RED = '\x1b[31m';
const DIM = '\x1b[2m';

type PageType = 'comparison' | 'pillar' | 'review' | 'trending-digest' | 'setup-guide';
type Category = 'ai-comparison' | 'ai-review' | 'ai-pillar' | 'github-trending' | 'tutorial';

const VALID_TYPES: PageType[] = ['comparison', 'pillar', 'review', 'trending-digest', 'setup-guide'];
const VALID_CATEGORIES: Category[] = ['ai-comparison', 'ai-review', 'ai-pillar', 'github-trending', 'tutorial'];

interface CliOptions {
  type: PageType;
  tools: string[];
  keyword: string;
  category: Category;
}

function printHelp(): void {
  console.error(`
${BOLD}📝 Page Template Generator${RESET}

${CYAN}Usage:${RESET}
  npx tsx scripts/generate-page-template.ts [options]

${CYAN}Options:${RESET}
  --type <type>          Page type: ${VALID_TYPES.join(' | ')}
  --tools "A,B,C"        Tool names (comma-separated)
  --keyword "kw phrase"   Target keyword
  --category <cat>        Category: ${VALID_CATEGORIES.join(' | ')}
  --help                  Show this help message

${CYAN}Examples:${RESET}
  npx tsx scripts/generate-page-template.ts \\
    --type comparison --tools "ChatGPT,Claude" \\
    --keyword "chatgpt vs claude" --category ai-comparison

  npx tsx scripts/generate-page-template.ts \\
    --type trending-digest --tools "Bun" \\
    --keyword "bun javascript runtime" --category github-trending

${DIM}Output: TypeScript object printed to stdout (pipe to file or copy-paste)${RESET}
`);
}

function parseArgs(argv: string[]): CliOptions {
  const args = argv.slice(2);
  let type: PageType | undefined;
  let tools: string[] = [];
  let keyword = '';
  let category: Category | undefined;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--help':
        printHelp();
        process.exit(0);
      case '--type':
        i++;
        if (!VALID_TYPES.includes(args[i] as PageType)) {
          console.error(`${RED}❌ Invalid type: ${args[i]}. Must be one of: ${VALID_TYPES.join(', ')}${RESET}`);
          process.exit(1);
        }
        type = args[i] as PageType;
        break;
      case '--tools':
        i++;
        if (!args[i]) {
          console.error(`${RED}❌ --tools requires a value${RESET}`);
          process.exit(1);
        }
        tools = args[i].split(',').map((s) => s.trim()).filter(Boolean);
        break;
      case '--keyword':
        i++;
        if (!args[i]) {
          console.error(`${RED}❌ --keyword requires a value${RESET}`);
          process.exit(1);
        }
        keyword = args[i];
        break;
      case '--category':
        i++;
        if (!VALID_CATEGORIES.includes(args[i] as Category)) {
          console.error(`${RED}❌ Invalid category: ${args[i]}. Must be one of: ${VALID_CATEGORIES.join(', ')}${RESET}`);
          process.exit(1);
        }
        category = args[i] as Category;
        break;
      default:
        console.error(`${RED}❌ Unknown option: ${args[i]}${RESET}`);
        printHelp();
        process.exit(1);
    }
  }

  if (!type || !keyword || !category) {
    console.error(`${RED}❌ Missing required options: --type, --keyword, --category${RESET}`);
    printHelp();
    process.exit(1);
  }

  if (tools.length === 0) {
    tools = ['ToolA', 'ToolB'];
    console.error(`${DIM}ℹ️  No tools specified, using placeholders: ${tools.join(', ')}${RESET}`);
  }

  return { type, tools, keyword, category };
}

// ─── Template generation ─────────────────────────────────────────────────────

function toSlug(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function capitalize(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function getEyebrow(category: Category): string {
  const map: Record<Category, string> = {
    'ai-comparison': 'AI Tool Comparison',
    'ai-review': 'AI Tool Review',
    'ai-pillar': 'AI Tools Guide',
    'github-trending': 'GitHub Trending',
    'tutorial': 'Setup Guide',
  };
  return map[category];
}

function getMonetization(type: PageType): string {
  if (type === 'comparison' || type === 'review') return "'hybrid'";
  if (type === 'pillar') return "'affiliate'";
  return "'ads'";
}

function generateSections(type: PageType, tools: string[]): string {
  const year = new Date().getFullYear();
  const indent = '    ';

  const sections: string[] = [];

  // All types get an intro paragraphs section
  sections.push(`{
${indent}  type: 'paragraphs',
${indent}  heading: 'Overview',
${indent}  paragraphs: [
${indent}    'TODO: Write an engaging overview paragraph.',
${indent}    'TODO: Add context about why this topic matters in ${year}.',
${indent}  ],
${indent}}`);

  switch (type) {
    case 'comparison':
      sections.push(`{
${indent}  type: 'comparison-table',
${indent}  heading: 'Feature Comparison',
${indent}  dimensions: ['Ease of Use', 'Accuracy', 'Pricing', 'Integration', 'Support'],
${indent}  tools: [${tools.map((t) => `'${t}'`).join(', ')}],
${indent}  ratings: {
${tools.map((t) => `${indent}    '${t}': { 'Ease of Use': 0, 'Accuracy': 0, 'Pricing': 0, 'Integration': 0, 'Support': 0 }`).join(',\n')},
${indent}  },
${indent}}`);
      sections.push(generateToolCards(tools, indent));
      sections.push(`{
${indent}  type: 'pricing-table',
${indent}  heading: 'Pricing Comparison',
${indent}  plans: [
${tools.map((t) => `${indent}    { toolName: '${t}', free: 'TODO', pro: 'TODO', enterprise: 'TODO', bestFor: 'TODO' }`).join(',\n')},
${indent}  ],
${indent}}`);
      sections.push(`{
${indent}  type: 'use-case-grid',
${indent}  heading: 'Best For',
${indent}  useCases: [
${indent}    { scenario: 'TODO: Use case 1', recommended: '${tools[0]}', reason: 'TODO', icon: '🎯' },
${indent}    { scenario: 'TODO: Use case 2', recommended: '${tools[1] ?? tools[0]}', reason: 'TODO', icon: '⚡' },
${indent}  ],
${indent}}`);
      break;

    case 'pillar':
      sections.push(generateToolCards(tools, indent));
      sections.push(`{
${indent}  type: 'use-case-grid',
${indent}  heading: 'Use Cases',
${indent}  useCases: [
${indent}    { scenario: 'TODO: Use case 1', recommended: '${tools[0]}', reason: 'TODO', icon: '🎯' },
${indent}    { scenario: 'TODO: Use case 2', recommended: '${tools[1] ?? tools[0]}', reason: 'TODO', icon: '⚡' },
${indent}  ],
${indent}}`);
      break;

    case 'review':
      sections.push(generateToolCards(tools, indent));
      sections.push(`{
${indent}  type: 'pricing-table',
${indent}  heading: 'Pricing',
${indent}  plans: [
${tools.map((t) => `${indent}    { toolName: '${t}', free: 'TODO', pro: 'TODO', enterprise: 'TODO', bestFor: 'TODO' }`).join(',\n')},
${indent}  ],
${indent}}`);
      break;

    case 'trending-digest':
      sections.push(`{
${indent}  type: 'cards',
${indent}  heading: 'Trending Highlights',
${indent}  cards: [
${indent}    { title: 'TODO: Highlight 1', description: 'TODO' },
${indent}    { title: 'TODO: Highlight 2', description: 'TODO' },
${indent}  ],
${indent}}`);
      sections.push(`{
${indent}  type: 'bullets',
${indent}  heading: 'Key Takeaways',
${indent}  items: [
${indent}    { label: 'TODO', text: 'TODO: Key takeaway 1' },
${indent}    { label: 'TODO', text: 'TODO: Key takeaway 2' },
${indent}  ],
${indent}}`);
      break;

    case 'setup-guide':
      sections.push(`{
${indent}  type: 'bullets',
${indent}  heading: 'Prerequisites',
${indent}  items: [
${indent}    { label: 'Step 1', text: 'TODO: First prerequisite' },
${indent}    { label: 'Step 2', text: 'TODO: Second prerequisite' },
${indent}  ],
${indent}}`);
      sections.push(`{
${indent}  type: 'table',
${indent}  heading: 'Configuration Reference',
${indent}  columns: ['Setting', 'Default', 'Description'],
${indent}  rows: [
${indent}    ['TODO: setting', 'TODO', 'TODO: description'],
${indent}  ],
${indent}}`);
      break;
  }

  return sections.map((s) => `${indent}${s}`).join(',\n');
}

function generateToolCards(tools: string[], indent: string): string {
  const cards = tools.map(
    (t) => `${indent}    {
${indent}      name: '${t}',
${indent}      rating: 0, // TODO: 1-5
${indent}      summary: 'TODO: Brief summary of ${t}',
${indent}      pros: ['TODO: Pro 1', 'TODO: Pro 2'],
${indent}      cons: ['TODO: Con 1', 'TODO: Con 2'],
${indent}      ctaUrl: 'TODO: https://...',
${indent}      ctaLabel: 'Try ${t}',
${indent}      pricing: 'TODO: Free / $X/mo',
${indent}    }`
  );

  return `{
${indent}  type: 'tool-cards',
${indent}  heading: 'Tool Details',
${indent}  tools: [
${cards.join(',\n')},
${indent}  ],
${indent}}`;
}

function generateTemplate(opts: CliOptions): string {
  const { type, tools, keyword, category } = opts;
  const slug = toSlug(keyword);
  const year = new Date().getFullYear();
  const titleKeyword = capitalize(keyword);
  const typeLabel: Record<PageType, string> = {
    comparison: 'In-Depth Comparison',
    pillar: 'Complete Guide',
    review: 'Honest Review',
    'trending-digest': 'Trending Digest',
    'setup-guide': 'Setup Guide',
  };

  const title = `${titleKeyword} — ${typeLabel[type]} ${year}`;
  const description = `Comprehensive ${typeLabel[type].toLowerCase()} of ${tools.join(' vs ')} in ${year}. Features, pricing, pros & cons, and expert recommendations.`;

  return `// ─── Generated by generate-page-template.ts ─────────────────────────────
// Type: ${type} | Category: ${category}
// Keyword: "${keyword}"
// Generated: ${new Date().toISOString()}
//
// TODO: Review and fill in all TODO placeholders before publishing.
// Then add this object to the appropriate array in src/lib/ai-tools-data.ts

{
  slug: '${slug}',
  title: '${title}',
  description: '${description}',
  eyebrow: '${getEyebrow(category)}',
  intro: [
    'TODO: Write an engaging introduction paragraph for ${titleKeyword}.',
    'TODO: Add a second paragraph with key context.',
  ],
  targetKeyword: '${keyword}',
  category: '${category}',
  monetizationPrimary: ${getMonetization(type)},
  ctaLabel: 'TODO: CTA button text',
  ctaHref: 'TODO: /pages/${slug}/',
  relatedSlugs: [
    // TODO: Add related page slugs
  ],
  sections: [
${generateSections(type, tools)},
  ],
  faq: [
    { question: 'TODO: What is ${titleKeyword}?', answer: 'TODO: Answer' },
    { question: 'TODO: How does ${tools[0]} compare to ${tools[1] ?? 'alternatives'}?', answer: 'TODO: Answer' },
    { question: 'TODO: Is ${tools[0]} worth it in ${year}?', answer: 'TODO: Answer' },
    { question: 'TODO: What are the best alternatives?', answer: 'TODO: Answer' },
    { question: 'TODO: How to get started?', answer: 'TODO: Answer' },
  ],
  aiToolMeta: {
    type: '${type}',
    tools: [${tools.map((t) => `'${t}'`).join(', ')}],
    lastUpdated: '${new Date().toISOString().slice(0, 10)}',
    affiliateLinks: [
${tools.map((t) => `      { tool: '${t}', url: 'TODO: https://...', label: 'Try ${t}' }`).join(',\n')},
    ],${type === 'comparison' ? `
    comparisonData: {
      dimensions: ['Ease of Use', 'Accuracy', 'Pricing', 'Integration', 'Support'],
      ratings: {
${tools.map((t) => `        '${t}': { 'Ease of Use': 0, 'Accuracy': 0, 'Pricing': 0, 'Integration': 0, 'Support': 0 }`).join(',\n')},
      },
    },` : ''}
  },
} satisfies SeoPage`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main(): void {
  const opts = parseArgs(process.argv);

  console.error(`\n${BOLD}📝 Page Template Generator${RESET}`);
  console.error(`${DIM}Type: ${opts.type} | Category: ${opts.category}${RESET}`);
  console.error(`${DIM}Keyword: "${opts.keyword}" | Tools: ${opts.tools.join(', ')}${RESET}\n`);

  const template = generateTemplate(opts);

  // Output to stdout (so it can be piped)
  console.log(template);

  console.error(`\n${GREEN}✅ Template generated! Copy the output above into src/lib/ai-tools-data.ts${RESET}`);
  console.error(`${DIM}Tip: npx tsx scripts/generate-page-template.ts ... > my-page.ts${RESET}\n`);
}

main();
