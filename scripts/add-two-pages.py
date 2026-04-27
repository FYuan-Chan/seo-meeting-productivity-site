#!/usr/bin/env python3
"""Add 2 pages: ai-briefing-2026-04-27 and github-trending-2026-04-27-en"""

from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
SITE_DATA_FILE = PROJECT_ROOT / "src" / "lib" / "ai-tools-data.ts"

def escape(text):
    """Escape for TypeScript"""
    return text.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")

# Read file
with open(SITE_DATA_FILE, "r") as f:
    content = f.read()

# Page 1: ai-briefing-2026-04-27
page1 = '''  {
    slug: 'ai-briefing-2026-04-27',
    title: 'AI Daily Briefing 2026-04-27: DeepSeek Price Cut, Qoder Discount, AWS Claude Integration',
    description: '2026-04-27 AI briefing: DeepSeek API cache hit price drops to 1/10, Qoder Ultimate tier 0.8x limited-time discount, AWS launches Claude Platform integration.',
    eyebrow: 'AI Daily Briefing',
    intro: [
      'Three major AI developments today: DeepSeek significantly reduces API cache prices, Qoder launches limited-time discount, AWS deeply integrates with Claude.',
      'These changes will directly impact developer costs, AI coding tool choices, and enterprise AI deployment strategies.',
    ],
    targetKeyword: 'ai daily briefing, deepseek pricing, qoder discount, claude on aws',
    category: 'ai-comparison',
    monetizationPrimary: 'ads',
    ctaLabel: 'Compare AI Coding Tools',
    ctaHref: '/pages/best-ai-coding-tools/',
    relatedSlugs: ['chatgpt-vs-claude', 'best-ai-coding-tools', 'github-copilot-vs-cursor'],
    aiToolMeta: { type: 'comparison', tools: ['DeepSeek', 'Qoder', 'Claude', 'AWS'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'table',
        heading: 'Today\\'s Key News',
        columns: ['Event', 'Impact', 'Priority'],
        rows: [
          ['DeepSeek API cache price drops to 1/10', 'Developer costs significantly reduced', 'P0'],
          ['Qoder Ultimate tier 0.8x discount', 'AI coding tool price war intensifies', 'P1'],
          ['AWS launches Claude Platform integration', 'Enterprise AI deployment barrier lowered', 'P1'],
        ],
      },
      {
        type: 'paragraphs',
        heading: 'DeepSeek API Pricing Details',
        paragraphs: [
          'DeepSeek officially announced that starting today, the input cache hit price for all API services will be uniformly reduced to one-tenth of the original price.',
          'For the DeepSeek-V4-Flash model, the input cache hit price has been reduced from 0.2 yuan to 0.02 yuan.',
          'For the DeepSeek-V4-Pro model, in addition to the new cache price reduction, there is currently a limited-time 25% discount that will last until May 5, 23:59.',
          'With the double discount, the current input cache hit billing for DeepSeek-V4-Pro has dropped to 0.025 yuan.',
        ],
      },
    ],
    faq: [
      { question: 'What impact does the DeepSeek API price reduction have on developers?', answer: 'DeepSeek API cache hit price has been reduced to 1/10. This will significantly reduce developer costs in high-frequency call scenarios.' },
      { question: 'How long will the Qoder Ultimate tier discount last?', answer: 'Qoder officials say this is a limited-time promotion, but no specific end date has been announced.' },
      { question: 'When will the AWS Claude Platform launch?', answer: 'AWS officially announced the upcoming Claude Platform on AWS service, but no specific launch date has been announced.' },
    ],
  },'''

# Page 2: github-trending-2026-04-27-en
page2 = '''  {
    slug: 'github-trending-2026-04-27-en',
    title: 'GitHub Trending Analysis | 2026-04-27 - AI Agent Skills Are Becoming the New Plugin Ecosystem',
    description: 'Today\\'s GitHub Trending: mattpocock/skills (+2,519 stars) is turning Claude into a plugin ecosystem. Evidence-based analysis with code examples and learning paths.',
    eyebrow: 'GitHub Trending',
    intro: [
      'Today\\'s GitHub Trending has 13 repositories with +9,656 stars total. Key finding: AI Agent tooling is maturing from prompt collections to reusable plugin ecosystems.',
      'This article answers 6 questions with evidence: which repos to watch, why they\\'re trending, how to learn them, and whether you should use them.',
    ],
    targetKeyword: 'github trending, ai agent skills, mattpocock skills, claude plugins',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/mattpocock/skills',
    relatedSlugs: ['chatgpt-vs-claude', 'best-ai-coding-tools', 'github-copilot-vs-cursor'],
    aiToolMeta: { type: 'comparison', tools: ['GitHub', 'AI Agent', 'Claude', 'Developer Tools'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'Bottom Line Up Front',
        paragraphs: [
          'Today\\'s GitHub Trending has 13 repositories with +9,656 stars total.',
          '**Key Finding**: AI Agent tooling is maturing from "prompt collections" to "reusable plugin ecosystems."',
          '**Recommended Action**: If you use Claude, install [mattpocock/skills](https://github.com/mattpocock/skills) today.',
        ],
      },
      {
        type: 'table',
        heading: 'Which repos are worth your time?',
        columns: ['Claim', 'Evidence', 'Confidence'],
        rows: [
          ['mattpocock/skills is worth installing', '+2,519 stars today; Author: Matt Pocock (TypeScript expert); 23 skills for real engineering', 'High'],
          ['build-your-own-x is worth learning', '+1,075 stars today; 20+ projects (Git, Database, Docker); Educational value', 'High'],
          ['free-claude-code has risks', '+1,701 stars today; May violate Anthropic TOS; Requires Python 3.14', 'Medium'],
          ['hackingtool is for beginners', '+1,720 stars today; All-in-one security toolkit; Good for learning', 'Medium'],
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Why did mattpocock/skills explode?',
        paragraphs: [
          '**Claim**: The repo went viral because of author reputation + real-world utility + perfect timing.',
          '**Evidence**: +2,519 stars in 24 hours. Author: Matt Pocock, creator of Total TypeScript (50k+ students). 23 skills, each is a standalone .md file.',
          '**Installation**: `npx skills@latest add mattpocock/skills/to-prd` - one command, works immediately.',
          '**Why this matters**: When a well-known developer open-sources their actual workflow (not a demo), people pay attention.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'How should a beginner learn this?',
        paragraphs: [
          '**Day 1 (30 minutes)**: `npx skills@latest add mattpocock/skills/to-prd` - Install and try one skill.',
          '**Day 2-3 (2 hours)**: Install `to-issues` and `code-review` skills. Use them on a real project.',
          '**Week 2 (5 hours)**: Read skill source code (`~/.claude/skills/*.md`). Understand prompt structure. Modify one skill.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'My Judgment',
        paragraphs: [
          '**Install if you use Claude**. The `to-prd` and `to-issues` skills alone save 30+ minutes per project.',
          '**Who should install**: Claude Code users. Developers wanting to improve productivity.',
          '**Who should skip**: ChatGPT users (skills don\\'t work). Enterprise users needing official support.',
        ],
      },
    ],
    faq: [
      { question: 'How do I install mattpocock/skills?', answer: 'Run `npx skills@latest add mattpocock/skills/to-prd` to install a single skill, or clone the repo and copy to ~/.claude/skills/.' },
      { question: 'Does this work with ChatGPT?', answer: 'No. These skills are designed specifically for Claude. ChatGPT users need to write their own prompts.' },
      { question: 'Which skill should I start with?', answer: 'Start with `to-prd`. It\\'s the most practical and helps you generate product requirement documents quickly.' },
    ],
  },'''

# Insert pages before ];
if "];" in content:
    last_bracket = content.rfind("];")
    before = content[:last_bracket].rstrip()
    
    if before.endswith(","):
        new_content = content[:last_bracket] + page1 + "\n" + page2 + "\n" + content[last_bracket:]
    else:
        new_content = content[:last_bracket] + ",\n" + page1 + "\n" + page2 + "\n" + content[last_bracket:]
    
    with open(SITE_DATA_FILE, "w") as f:
        f.write(new_content)
    
    print("✅ Added 2 pages:")
    print("  1. ai-briefing-2026-04-27")
    print("  2. github-trending-2026-04-27-en")
else:
    print("❌ Could not find ];")

if __name__ == "__main__":
    pass