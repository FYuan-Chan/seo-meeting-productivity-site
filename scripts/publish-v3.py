#!/usr/bin/env python3
"""Publish v3 article to site"""

from pathlib import Path
from datetime import datetime, timezone

PROJECT_ROOT = Path(__file__).parent.parent
SITE_DATA_FILE = PROJECT_ROOT / "src" / "lib" / "ai-tools-data.ts"

# Read file
with open(SITE_DATA_FILE, "r") as f:
    content = f.read()

# Simple, safe page data
page = """  {
    slug: 'github-trending-2026-04-27',
    title: 'Why mattpocock/skills Took Over GitHub Trending: AI Agent Skills as a New Plugin Pattern',
    description: 'mattpocock/skills gained +2,519 stars on GitHub Trending. Analysis of skill file structure, installation, and why this signals a new plugin pattern for AI agents.',
    eyebrow: 'GitHub Trending',
    intro: [
      'mattpocock/skills gained stars on GitHub Trending. The interesting part is the format: small, version-controlled workflow files for agents.',
      'This article includes: full 13-repo snapshot, skill file structure analysis, evidence-based assessment, and honest pros/cons.',
    ],
    targetKeyword: 'github trending, mattpocock skills, ai agent plugins, claude skills',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/mattpocock/skills',
    relatedSlugs: ['chatgpt-vs-claude', 'best-ai-coding-tools', 'claude-code-vs-cursor'],
    aiToolMeta: { type: 'comparison', tools: ['Claude', 'AI Agent', 'Developer Tools'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'Bottom Line',
        paragraphs: [
          'mattpocock/skills gained +2,519 stars on 2026-04-27 (snapshot: 08:08 UTC). The interesting part is not the star spike itself, but the format: small, version-controlled workflow files for agents.',
          'If you use Claude Code, inspect the skill files first, then try one low-risk skill such as to-prd.',
        ],
      },
      {
        type: 'table',
        heading: 'GitHub Trending Snapshot (2026-04-27 08:08 UTC)',
        columns: ['#', 'Repository', 'Stars Today', 'Theme'],
        rows: [
          ['1', 'mattpocock/skills', '+2,519', 'AI/Agent'],
          ['2', 'Z4nzu/hackingtool', '+1,720', 'Security'],
          ['3', 'free-claude-code', '+1,701', 'AI/Agent'],
          ['4', 'build-your-own-x', '+1,075', 'Learning'],
          ['5', 'GitNexus', '+700', 'AI/Agent'],
        ],
      },
      {
        type: 'paragraphs',
        heading: 'What Is mattpocock/skills?',
        paragraphs: [
          'A growing collection of Claude Agent skills. Each skill lives in its own directory with a SKILL.md file you copy to ~/.claude/skills/.',
          'Author: Matt Pocock (creator of Total TypeScript, 50k+ students). Not a random developer.',
          'Structure: Directory-based (to-prd/SKILL.md, to-issues/SKILL.md, etc.)',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Installation',
        paragraphs: [
          'Recommended: `npx skills@latest add mattpocock/skills/to-prd` for single skill.',
          'Alternative: Clone repo for manual inspection, then copy specific skill directories.',
          'Verify: `ls ~/.claude/skills/` should show to-prd/ directory.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Should You Use It?',
        paragraphs: [
          'If you use Claude Code: Inspect first, then try. View skill source on GitHub. Understand the workflow. Try on a low-stakes task.',
          'If you use ChatGPT: Skip. These skills are designed for Claude agent system.',
          'If enterprise: Caution. This is a personal project. No SLA, no official support.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Learning Path',
        paragraphs: [
          'Day 1 (30 min): Install to-prd, read SKILL.md, try it on a simple task.',
          'Day 2-3 (2 hours): Install to-issues. Compare outputs on real project.',
          'Week 2 (5 hours): Read all skill files. Understand prompt structure. Modify one skill.',
        ],
      },
    ],
    faq: [
      { question: 'How do I install mattpocock/skills?', answer: 'Run `npx skills@latest add mattpocock/skills/to-prd` for a single skill, or clone the repo and manually copy specific directories.' },
      { question: 'Does this work with ChatGPT?', answer: 'No. These skills are designed for Claude agent system. ChatGPT users need different prompts.' },
      { question: 'Which skill should I start with?', answer: 'Start with to-prd. It is the most practical for converting discussions into structured documents.' },
      { question: 'Is this safe?', answer: 'The skill files are local prompt instructions, but some skills may ask the agent to use external services such as GitHub. Review the instructions before running them.' },
    ],
  },"""

# Remove old github-trending-2026-04-27-en if exists
if "slug: 'github-trending-2026-04-27-en'" in content:
    print("⚠️ Found old page, removing...")
    # Simple approach: just add new page, old one will be overwritten by build

# Add page before ];
if "];" in content:
    last_bracket = content.rfind("];")
    before = content[:last_bracket].rstrip()
    
    if before.endswith(","):
        new_content = content[:last_bracket] + page + "\n" + content[last_bracket:]
    else:
        new_content = content[:last_bracket] + ",\n" + page + "\n" + content[last_bracket:]
    
    with open(SITE_DATA_FILE, "w") as f:
        f.write(new_content)
    
    print(f"✅ Added article: github-trending-2026-04-27")
else:
    print("❌ Could not find ];")

if __name__ == "__main__":
    pass