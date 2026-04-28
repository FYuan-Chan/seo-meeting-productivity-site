#!/usr/bin/env python3
"""Batch publish 6 articles: 1 news + 5 GitHub repos"""

from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
SITE_DATA_FILE = PROJECT_ROOT / "src" / "lib" / "ai-tools-data.ts"

# Read file
with open(SITE_DATA_FILE, "r") as f:
    content = f.read()

# 6 pages
pages = [
    """  {
    slug: 'ai-news-2026-04-27',
    title: 'AI Daily Briefing 2026-04-27: DeepSeek Slashes API Prices, Qoder Discounts, AWS Claude Integration',
    description: 'Three AI developments: DeepSeek cuts API cache price to 1/10, Qoder Ultimate 0.8x discount, AWS launches Claude Platform.',
    eyebrow: 'AI News',
    intro: ['DeepSeek reduces API prices, Qoder launches discount, AWS integrates Claude.', 'Three developments that lower barriers for developers.'],
    targetKeyword: 'ai news, deepseek pricing, qoder discount, aws claude',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View Source',
    ctaHref: 'https://github.com/imjuya/juya-ai-daily',
    relatedSlugs: ['chatgpt-vs-claude', 'best-ai-coding-tools', 'github-trending-2026-04-27'],
    aiToolMeta: { type: 'comparison', tools: ['DeepSeek', 'Qoder', 'Claude', 'AWS'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'Three Things You Need to Know',
        paragraphs: [
          '1. DeepSeek cuts API cache hit price to 1/10 - Developer costs drop significantly.',
          '2. Qoder Ultimate tier 0.8x discount - AI coding tool price war intensifies.',
          '3. AWS launches Claude Platform integration - Enterprise adoption barrier lowered.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Bottom Line',
        paragraphs: ['Three developments that lower barriers: DeepSeek reduces API costs, Qoder reduces tool costs, AWS reduces integration friction. Good day for developers.'],
      },
    ],
    faq: [
      { question: 'How much does DeepSeek V4-Pro cost now?', answer: 'With cache hit and 25% discount: 0.025 yuan per 1k tokens.' },
      { question: 'When does AWS Claude Platform launch?', answer: 'Not announced. Coming soon.' },
    ],
  },""",

    """  {
    slug: 'free-claude-code-2026-04-27',
    title: 'free-claude-code: Free Claude Code Access, But at What Cost?',
    description: 'free-claude-code gained +1,701 stars. Free Claude Code access without API key. Warning: may violate Anthropic TOS.',
    eyebrow: 'GitHub Trending',
    intro: ['free-claude-code gained +1,701 stars. Free Claude Code access.', 'Warning: may violate Anthropic Terms of Service.'],
    targetKeyword: 'free claude code, claude free, claude alternative',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/Alishahryar1/free-claude-code',
    relatedSlugs: ['chatgpt-vs-claude', 'claude-code-vs-cursor', 'github-trending-2026-04-27'],
    aiToolMeta: { type: 'comparison', tools: ['Claude', 'Python', 'AI Access'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'Bottom Line',
        paragraphs: [
          'free-claude-code gained +1,701 stars on 2026-04-27. Free Claude Code access without API key.',
          'The catch: may violate Anthropic Terms of Service. Use official free tier or pay $20/month instead.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'The Risks',
        paragraphs: [
          '1. TOS Violation: Anthropic may ban accounts using this.',
          '2. Security: Your code may go through third-party servers.',
          '3. Stability: Free access may stop working anytime.',
        ],
      },
    ],
    faq: [
      { question: 'Is this legal?', answer: 'Likely violates Anthropic Terms of Service. Use at your own risk.' },
      { question: 'What is the alternative?', answer: 'Official Claude Pro ($20/month) or Claude free tier.' },
    ],
  },""",

    """  {
    slug: 'openclaw-2026-04-27',
    title: 'OpenClaw: Your Own Personal AI Assistant Across All Platforms',
    description: 'openclaw gained +627 stars. Personal AI assistant that works on any OS. Local-first, privacy-focused.',
    eyebrow: 'GitHub Trending',
    intro: ['openclaw gained +627 stars. Personal AI assistant across all platforms.', 'Local-first, privacy-focused, customizable.'],
    targetKeyword: 'openclaw, personal ai assistant, local ai, privacy ai',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/openclaw/openclaw',
    relatedSlugs: ['chatgpt-vs-claude', 'best-ai-coding-tools', 'github-trending-2026-04-27'],
    aiToolMeta: { type: 'comparison', tools: ['TypeScript', 'AI Assistant', 'Cross-Platform'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'What Is It?',
        paragraphs: [
          'TypeScript-based personal AI assistant. Works on macOS, Windows, Linux.',
          'Stars Today: +627 (snapshot: 2026-04-27 08:08 UTC).',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Should You Use It?',
        paragraphs: [
          'If you want personal AI assistant: Yes. More control than ChatGPT or Claude.',
          'If you care about privacy: Yes. Local-first architecture.',
        ],
      },
    ],
    faq: [
      { question: 'Is this free?', answer: 'Yes, open-source. You may need to pay for AI model API costs.' },
      { question: 'How is this different from ChatGPT?', answer: 'You control it. It runs on your machine. You own your data.' },
    ],
  },""",

    """  {
    slug: 'awesome-codex-skills-2026-04-27',
    title: 'awesome-codex-skills: A Curated List of Practical Codex Skills',
    description: 'awesome-codex-skills gained +517 stars. Curated list of practical skills for Codex CLI and API.',
    eyebrow: 'GitHub Trending',
    intro: ['awesome-codex-skills gained +517 stars. Curated list of Codex skills.', 'Similar to mattpocock/skills but for Codex.'],
    targetKeyword: 'codex skills, openai codex, ai coding skills',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/ComposioHQ/awesome-codex-skills',
    relatedSlugs: ['github-copilot-vs-cursor', 'best-ai-coding-tools', 'github-trending-2026-04-27'],
    aiToolMeta: { type: 'comparison', tools: ['Codex', 'Python', 'AI Skills'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'What Is It?',
        paragraphs: [
          'Curated list of practical Codex skills for automating workflows.',
          'Stars Today: +517 (snapshot: 2026-04-27 08:08 UTC).',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Should You Use It?',
        paragraphs: [
          'If you use Codex: Yes. Good resource for finding useful skills.',
          'If you use Claude: Check mattpocock/skills instead.',
        ],
      },
    ],
    faq: [
      { question: 'What is Codex?', answer: 'OpenAI code generation model, available via CLI and API.' },
      { question: 'Is this related to mattpocock/skills?', answer: 'Similar concept, different platform. This is for Codex, that is for Claude.' },
    ],
  },""",

    """  {
    slug: 'beads-2026-04-27',
    title: 'Beads: How This Go Project Adds Memory to Your Coding Agent',
    description: 'beads gained +152 stars. Memory upgrade for coding agents. Adds persistent context across sessions.',
    eyebrow: 'GitHub Trending',
    intro: ['beads gained +152 stars. Memory system for coding agents.', 'Allows agents to remember past conversations and decisions.'],
    targetKeyword: 'beads, agent memory, coding agent memory, ai memory',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/gastownhall/beads',
    relatedSlugs: ['chatgpt-vs-claude', 'claude-code-vs-cursor', 'github-trending-2026-04-27'],
    aiToolMeta: { type: 'comparison', tools: ['Go', 'AI Agent', 'Memory'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'What Is It?',
        paragraphs: [
          'Memory system for coding agents. Allows agents to save and retrieve context across sessions.',
          'Stars Today: +152 (snapshot: 2026-04-27 08:08 UTC).',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Should You Use It?',
        paragraphs: [
          'If you use coding agents frequently: Yes. Memory helps maintain context.',
          'If you care about privacy: Yes. Memory is stored locally.',
        ],
      },
    ],
    faq: [
      { question: 'Is my data stored in the cloud?', answer: 'No. Memory is stored locally on your machine.' },
      { question: 'Which agents does this work with?', answer: 'Designed for coding agents. Check repository for specific integrations.' },
    ],
  },""",

    """  {
    slug: 'typescript-go-2026-04-27',
    title: 'microsoft/typescript-go: Why Microsoft Is Porting TypeScript to Go',
    description: 'typescript-go gained +23 stars. Microsoft porting TypeScript to Go for 10x faster type checking.',
    eyebrow: 'GitHub Trending',
    intro: ['typescript-go gained +23 stars. Microsoft porting TypeScript to Go.', 'Promise: 10x faster type checking, lower memory usage.'],
    targetKeyword: 'typescript go, typescript performance, microsoft typescript',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/microsoft/typescript-go',
    relatedSlugs: ['chatgpt-vs-claude', 'best-ai-coding-tools', 'github-trending-2026-04-27'],
    aiToolMeta: { type: 'comparison', tools: ['Go', 'TypeScript', 'Microsoft'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'What Is It?',
        paragraphs: [
          'Staging repository for development of native port of TypeScript.',
          'Stars Today: +23 (snapshot: 2026-04-27 08:08 UTC).',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Why It Matters',
        paragraphs: [
          'TypeScript currently implemented in TypeScript (self-hosted). Porting to Go could mean faster type checking, better IDE performance, lower memory usage.',
          'Promise: 10x faster type checking.',
        ],
      },
    ],
    faq: [
      { question: 'When will this be ready?', answer: 'Not announced. This is a staging repo for development.' },
      { question: 'Why Go instead of Rust?', answer: 'Microsoft likely chose Go for faster development and existing expertise.' },
    ],
  },"""

]

# Add all pages before ];
if "];" in content:
    last_bracket = content.rfind("];")
    before = content[:last_bracket].rstrip()
    
    all_pages = "\n".join(pages)
    
    if before.endswith(","):
        new_content = content[:last_bracket] + all_pages + "\n" + content[last_bracket:]
    else:
        new_content = content[:last_bracket] + ",\n" + all_pages + "\n" + content[last_bracket:]
    
    with open(SITE_DATA_FILE, "w") as f:
        f.write(new_content)
    
    print(f"✅ Added 6 articles:")
    print(f"  1. ai-news-2026-04-27 (news)")
    print(f"  2. free-claude-code-2026-04-27")
    print(f"  3. openclaw-2026-04-27")
    print(f"  4. awesome-codex-skills-2026-04-27")
    print(f"  5. beads-2026-04-27")
    print(f"  6. typescript-go-2026-04-27")
else:
    print("❌ Could not find ];")

if __name__ == "__main__":
    pass