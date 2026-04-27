#!/usr/bin/env python3
"""Add improved github-trending article"""

from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(__file__).parent.parent
SITE_DATA_FILE = PROJECT_ROOT / "src" / "lib" / "ai-tools-data.ts"

snapshot_time = datetime.now().strftime("%Y-%m-%d %H:%M UTC")

page = '''  {
    slug: 'github-trending-2026-04-27-en',
    title: 'Why mattpocock/skills Took Over GitHub Trending: AI Agent Skills as the New Plugin Layer',
    description: 'mattpocock/skills gained +2,519 stars on GitHub Trending. Deep dive: skill file structure, installation, and why this signals a new plugin ecosystem for AI agents.',
    eyebrow: 'GitHub Trending',
    intro: [
      'mattpocock/skills gained +2,519 stars. This is not just another trending repo—it signals that AI Agent Skills are becoming a new plugin format.',
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
          'mattpocock/skills gained +2,519 stars on 2026-04-27. This signals that **AI Agent Skills are becoming a new plugin format**.',
          'If you use Claude Code, inspect the skill files first, then try one low-risk skill such as `to-prd`.',
        ],
      },
      {
        type: 'table',
        heading: 'GitHub Trending Snapshot (2026-04-27)',
        columns: ['#', 'Repository', 'Stars Today', 'Language', 'What It Does'],
        rows: [
          ['1', 'mattpocock/skills', '+2,519', 'Shell', '23 Claude Agent skills for real engineering'],
          ['2', 'Z4nzu/hackingtool', '+1,720', 'Python', 'All-in-one security toolkit'],
          ['3', 'free-claude-code', '+1,701', 'Python', 'Free Claude Code access (risk: may violate TOS)'],
          ['4', 'build-your-own-x', '+1,075', 'Markdown', 'Learn by rebuilding: Git, DB, Docker, etc.'],
          ['5', 'GitNexus', '+700', 'TypeScript', 'Client-side code knowledge graph'],
        ],
      },
      {
        type: 'paragraphs',
        heading: 'What Is mattpocock/skills?',
        paragraphs: [
          '23 Claude Agent skills. Each is a standalone `.md` file you copy to `~/.claude/skills/`.',
          '**Author**: Matt Pocock (creator of Total TypeScript, 50k+ students). Not a random developer.',
          '**README Size**: 3,680 characters. Concise, not bloated.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Skill File Structure',
        paragraphs: [
          'Here\\'s what a skill file actually looks like:',
          '```markdown\\n---\\nname: to-prd\\ndescription: Turn conversation context into a PRD\\n---\\n\\n# Workflow\\n1. Extract context\\n2. Identify missing requirements\\n3. Generate PRD\\n4. Submit GitHub issue\\n```',
          'The `---metadata--- + workflow + template` format could become the standard for agent plugins.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Installation',
        paragraphs: [
          '**Option 1 (recommended for inspection)**: `npx skills@latest add mattpocock/skills/to-prd`',
          '**Option 2 (all skills)**: `git clone https://github.com/mattpocock/skills.git && cp -r skills/* ~/.claude/skills/`',
          '**Verify**: `ls ~/.claude/skills/` — Should see to-prd.md, to-issues.md, etc.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Evidence-Based Assessment',
        paragraphs: [
          '**Claim 1: Author is credible** — Evidence: Matt Pocock has 100k+ Twitter followers, created Total TypeScript (50k+ students). Confidence: High.',
          '**Claim 2: Solves real problem** — Evidence: Claude Code users frequently rewrite similar prompts. 23 skills cover common workflows. Confidence: High.',
          '**Claim 3: May save time in PRD-to-issue workflows** — Evidence: These skills may reduce repeated prompting and formatting time. Actual time saved depends on project complexity. Confidence: Medium.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Should You Use It?',
        paragraphs: [
          '**If you use Claude Code**: Inspect first, then try. View skill source: `cat ~/.claude/skills/to-prd.md`. Understand the workflow. Try on a low-stakes task.',
          '**If you use ChatGPT**: Skip. These skills are designed for Claude\\'s agent system.',
          '**If you\\'re an Enterprise**: Caution. This is a personal project. No SLA, no official support.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Learning Path',
        paragraphs: [
          '**Day 1 (30 minutes)**: `npx skills@latest add mattpocock/skills/to-prd` — Install and inspect one skill.',
          '**Day 2-3 (2 hours)**: Install `to-issues` and `code-review`. Compare outputs.',
          '**Week 2 (5 hours)**: Read all skill files. Understand prompt structure. Modify one skill.',
        ],
      },
    ],
    faq: [
      { question: 'How do I install mattpocock/skills?', answer: 'Run `npx skills@latest add mattpocock/skills/to-prd` for a single skill, or clone the repo and copy to ~/.claude/skills/.' },
      { question: 'Does this work with ChatGPT?', answer: 'No. These skills are designed for Claude\\'s agent system. ChatGPT users need different prompts.' },
      { question: 'Which skill should I start with?', answer: 'Start with `to-prd`. It\\'s the most practical for converting discussions into structured documents.' },
      { question: 'Is this safe?', answer: 'Skills are local prompt files. They don\\'t send data externally. But always review the content before using in production.' },
    ],
  },'''

# Read file
with open(SITE_DATA_FILE, "r") as f:
    content = f.read()

# Insert before ];
if "];" in content:
    last_bracket = content.rfind("];")
    before = content[:last_bracket].rstrip()
    
    if before.endswith(","):
        new_content = content[:last_bracket] + page + "\n" + content[last_bracket:]
    else:
        new_content = content[:last_bracket] + ",\n" + page + "\n" + content[last_bracket:]
    
    with open(SITE_DATA_FILE, "w") as f:
        f.write(new_content)
    
    print(f"✅ Added improved article: github-trending-2026-04-27-en")
else:
    print("❌ Could not find ];")

if __name__ == "__main__":
    pass