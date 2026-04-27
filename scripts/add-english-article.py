#!/usr/bin/env python3
"""
Add English GitHub Trending article to site
"""

import json
import re
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(__file__).parent.parent
SITE_DATA_FILE = PROJECT_ROOT / "src" / "lib" / "ai-tools-data.ts"

def escape_for_ts(text):
    """Escape string for TypeScript"""
    text = text.replace("\\", "\\\\")
    text = text.replace("'", "\\'")
    text = text.replace("\n", "\\n")
    return text

def add_english_article():
    """Add English article to site"""
    
    # Read article
    article_file = PROJECT_ROOT / "data" / "articles" / "github-trending-2026-04-27-en.md"
    with open(article_file, "r") as f:
        content = f.read()
    
    # Read site data
    with open(SITE_DATA_FILE, "r") as f:
        site_data = f.read()
    
    # Check if exists
    slug = "github-trending-2026-04-27-en"
    if f"slug: '{slug}'" in site_data:
        print(f"⚠️ Article already exists: {slug}")
        return False
    
    # Extract key sections
    paragraphs = []
    current_section = []
    
    for line in content.split("\n"):
        if line.startswith("## ") and current_section:
            paragraphs.append("\n".join(current_section[:15]))
            current_section = []
        elif not line.startswith("#"):
            current_section.append(line)
    
    if current_section:
        paragraphs.append("\n".join(current_section[:15]))
    
    # Create page data
    new_page = f'''  {{
    slug: '{slug}',
    title: 'GitHub Trending Analysis | 2026-04-27 — AI Agent Skills Are Becoming the New Plugin Ecosystem',
    description:
      'Today\\'s GitHub Trending: mattpocock/skills (+2,519 stars) is turning Claude into a plugin ecosystem. Evidence-based analysis with code examples and learning paths.',
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
    relatedSlugs: [
      'chatgpt-vs-claude',
      'best-ai-coding-tools',
      'github-copilot-vs-cursor',
    ],
    aiToolMeta: {{
      type: 'comparison',
      tools: ['GitHub', 'AI Agent', 'Claude', 'Developer Tools'],
      lastUpdated: '2026-04-27',
    }},
    sections: [
      {{
        type: 'paragraphs',
        heading: 'Bottom Line Up Front',
        paragraphs: [
          'Today\\'s GitHub Trending has 13 repositories with +9,656 stars total.',
          '**Key Finding**: AI Agent tooling is maturing from \\"prompt collections\\" to \\"reusable plugin ecosystems.\\"',
          '**Recommended Action**: If you use Claude, install [mattpocock/skills](https://github.com/mattpocock/skills) today.',
        ],
      }},
      {{
        type: 'table',
        heading: 'Which repos are worth your time?',
        columns: ['Claim', 'Evidence', 'Confidence'],
        rows: [
          ['mattpocock/skills is worth installing', '+2,519 stars today; Author: Matt Pocock (TypeScript expert); 23 skills for real engineering', 'High'],
          ['build-your-own-x is worth learning', '+1,075 stars today; 20+ projects (Git, Database, Docker); Educational value', 'High'],
          ['free-claude-code has risks', '+1,701 stars today; May violate Anthropic TOS; Requires Python 3.14', 'Medium'],
          ['hackingtool is for beginners', '+1,720 stars today; All-in-one security toolkit; Good for learning', 'Medium'],
        ],
      }},
      {{
        type: 'paragraphs',
        heading: 'Why did mattpocock/skills explode?',
        paragraphs: [
          '**Claim**: The repo went viral because of author reputation + real-world utility + perfect timing.',
          '**Evidence**: +2,519 stars in 24 hours. Author: Matt Pocock, creator of Total TypeScript (50k+ students). 23 skills, each is a standalone .md file.',
          '**Installation**: `npx skills@latest add mattpocock/skills/to-prd` — one command, works immediately.',
          '**Why this matters**: When a well-known developer open-sources their actual workflow (not a demo), people pay attention.',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: 'What technology trend does this represent?',
        paragraphs: [
          '**Claim**: AI Agent Skills are becoming the new plugin ecosystem.',
          '**Evidence**: We\\'re seeing a 3-layer stack emerge: 1) Skills Layer (mattpocock/skills), 2) Memory Layer (beads), 3) Access Layer (free-claude-code).',
          'This is not random. Developers are building the infrastructure for AI agents.',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: 'How should a beginner learn this?',
        paragraphs: [
          '**Day 1 (30 minutes)**: `npx skills@latest add mattpocock/skills/to-prd` — Install and try one skill.',
          '**Day 2-3 (2 hours)**: Install `to-issues` and `code-review` skills. Use them on a real project.',
          '**Week 2 (5 hours)**: Read skill source code (`~/.claude/skills/*.md`). Understand prompt structure. Modify one skill.',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: 'Should developers use this?',
        paragraphs: [
          '**My Judgment**: **Install if you use Claude**. The `to-prd` and `to-issues` skills alone save 30+ minutes per project.',
          '**Who should install**: Claude Code users. Developers wanting to improve productivity. Anyone interested in AI-assisted development.',
          '**Who should skip**: ChatGPT users (skills don\\'t work). Enterprise users needing official support. People who don\\'t want to learn new tools.',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: 'Is this noise or signal?',
        paragraphs: [
          '**Claim**: This is signal, not noise.',
          '**Evidence**: Author credibility (Matt Pocock, Total TypeScript). Real utility (23 skills solve actual problems). Installation simplicity (one command). Community response (+2,519 stars in 24 hours).',
          '**Conclusion**: The combination of author credibility + real utility + simple installation makes this worth your time.',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: 'Code Examples',
        paragraphs: [
          '**Install single skill**: `npx skills@latest add mattpocock/skills/to-prd`',
          '**Install all skills**: `git clone https://github.com/mattpocock/skills.git && cp -r skills/* ~/.claude/skills/`',
          '**Verify**: `ls ~/.claude/skills/` — Should see to-prd.md, to-issues.md, etc.',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: 'Next Steps',
        paragraphs: [
          '**Today (5 minutes)**: `npx skills@latest add mattpocock/skills/to-prd` — Install and try one skill.',
          '**This Week (2 hours)**: Install `to-issues` skill. Use `to-prd` + `to-issues` on a real project. Measure time saved.',
          '**This Month (10 hours)**: Complete one build-your-own-x project. Understand mattpocock/skills source code. Create your own skill.',
        ],
      }},
    ],
    faq: [
      {{ question: 'How do I install mattpocock/skills?', answer: 'Run `npx skills@latest add mattpocock/skills/to-prd` to install a single skill, or clone the repo and copy to ~/.claude/skills/.' }},
      {{ question: 'Does this work with ChatGPT?', answer: 'No. These skills are designed specifically for Claude. ChatGPT users need to write their own prompts.' }},
      {{ question: 'Which skill should I start with?', answer: 'Start with `to-prd`. It\\'s the most practical and helps you generate product requirement documents quickly.' }},
    ],
  }},'''
    
    # Add to file
    if "];" in site_data:
        last_bracket = site_data.rfind("];")
        before = site_data[:last_bracket].rstrip()
        
        if before.endswith(","):
            new_content = site_data[:last_bracket] + new_page + "\n" + site_data[last_bracket:]
        else:
            new_content = site_data[:last_bracket] + ",\n" + new_page + "\n" + site_data[last_bracket:]
        
        with open(SITE_DATA_FILE, "w") as f:
            f.write(new_content)
        
        print(f"✅ Successfully added article: {slug}")
        return True
    
    return False

if __name__ == "__main__":
    add_english_article()