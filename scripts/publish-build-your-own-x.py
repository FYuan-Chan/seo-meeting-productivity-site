#!/usr/bin/env python3
"""Publish build-your-own-x article"""

from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
SITE_DATA_FILE = PROJECT_ROOT / "src" / "lib" / "ai-tools-data.ts"

# Read file
with open(SITE_DATA_FILE, "r") as f:
    content = f.read()

# Page data
page = """  {
    slug: 'build-your-own-x-2026-04-27',
    title: 'Why build-your-own-x Still Matters in the AI Age: Learn by Rebuilding',
    description: 'build-your-own-x gained +1,075 stars on GitHub Trending. 28 projects to learn fundamentals by rebuilding Git, Database, Docker, and more.',
    eyebrow: 'GitHub Trending',
    intro: [
      'build-your-own-x gained +1,075 stars. In an age where AI generates code, understanding fundamentals becomes a competitive advantage.',
      'This article includes: 28 project list, recommended starting points, time estimates, and why fundamentals matter with AI.',
    ],
    targetKeyword: 'build your own x, learn programming, system design, fundamentals',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/codecrafters-io/build-your-own-x',
    relatedSlugs: ['chatgpt-vs-claude', 'best-ai-coding-tools', 'github-trending-2026-04-27'],
    aiToolMeta: { type: 'comparison', tools: ['GitHub', 'Learning', 'Developer Tools'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'Bottom Line',
        paragraphs: [
          'build-your-own-x gained +1,075 stars on 2026-04-27 (snapshot: 08:08 UTC). This project trends regularly because the need never goes away.',
          'In an age where AI generates code, understanding fundamentals becomes a competitive advantage. Pick one project and build it.',
        ],
      },
      {
        type: 'table',
        heading: '28 Projects (Snapshot: 2026-04-27 08:08 UTC)',
        columns: ['Category', 'Projects', 'Time'],
        rows: [
          ['Systems', '3D Renderer, Database, Docker, Emulator, Memory Allocator, OS', '2-4 weeks each'],
          ['Networking', 'BitTorrent Client, Network Stack, Web Server, Web Browser', '1-2 weeks each'],
          ['Tools', 'Command-Line Tool, Git, Shell, Text Editor', '3-7 days each'],
          ['Security', 'Blockchain, Bot, Firewall, Neural Network', '2-4 weeks each'],
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Why It Is Trending Again',
        paragraphs: [
          'This project trends regularly, not because it is new, but because the need never goes away.',
          'With AI coding assistants (GitHub Copilot, Cursor, Claude Code), some developers wonder: Why learn fundamentals when AI can write the code?',
          'The answer: AI generates code, but you need to understand it. When the AI hallucinates, you need to catch it. When performance matters, you need to optimize.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Recommended Starting Points',
        paragraphs: [
          'Beginners (1-2 weeks): Build Your Own Shell (3-5 days), Command-Line Tool (2-3 days), Web Server (1 week).',
          'Intermediate (2-4 weeks): Build Your Own Git (1-2 weeks), Database (2-3 weeks), Docker (2 weeks).',
          'Advanced (1-3 months): Build Your Own Operating System (2-3 months), Neural Network (1-2 months), Programming Language (1-2 months).',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Should You Do It?',
        paragraphs: [
          'If junior developer: Yes, start now. Pick one project (recommend: Shell or Web Server). You will understand fundamentals that senior developers take for granted.',
          'If senior developer: Yes, but be selective. Pick a project outside your expertise.',
          'If preparing for interviews: Yes, prioritize. Focus on Git, Database, Operating System, Network Stack.',
          'If short on time: Skip for now. These projects require dedicated time.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'How to Approach It',
        paragraphs: [
          'Step 1: Choose one project. Do not try to do everything.',
          'Step 2: Set a time box. Allocate 1-4 weeks.',
          'Step 3: Follow the guide. Each project links to external tutorials.',
          'Step 4: Understand, do not just copy. The goal is understanding, not completion.',
          'Step 5: Document your learning. Write notes, blog posts, or teach someone else.',
        ],
      },
    ],
    faq: [
      { question: 'How long does each project take?', answer: 'Depends on the project and your experience. Beginners: 1-2 weeks for simple projects. Intermediate: 2-4 weeks for medium projects. Advanced: 1-3 months for complex projects.' },
      { question: 'Which project should I start with?', answer: 'If you are a beginner, start with Build Your Own Shell or Command-Line Tool. If you are more experienced, pick one that fills a gap in your knowledge.' },
      { question: 'Is this still relevant with AI coding assistants?', answer: 'More relevant than ever. AI generates code, but you need to understand it to debug, optimize, and trust it.' },
    ],
  },"""

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
    
    print(f"✅ Added article: build-your-own-x-2026-04-27")
else:
    print("❌ Could not find ];")

if __name__ == "__main__":
    pass