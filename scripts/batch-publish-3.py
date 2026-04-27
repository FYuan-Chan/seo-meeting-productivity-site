#!/usr/bin/env python3
"""Batch publish 3 articles"""

from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent
SITE_DATA_FILE = PROJECT_ROOT / "src" / "lib" / "ai-tools-data.ts"

# Read file
with open(SITE_DATA_FILE, "r") as f:
    content = f.read()

# 3 pages
pages = [
    """  {
    slug: 'hackingtool-2026-04-27',
    title: 'Is Z4nzu/hackingtool a Legit Security Tool or Just Another Script Kiddie Kit?',
    description: 'Z4nzu/hackingtool gained +1,720 stars. All-in-one security toolkit for learning. Good for beginners, not for production.',
    eyebrow: 'GitHub Trending',
    intro: ['Z4nzu/hackingtool gained +1,720 stars. All-in-one security toolkit that consolidates dozens of tools.', 'Good for learning security basics. Not suitable for professional penetration testing.'],
    targetKeyword: 'hackingtool, security toolkit, penetration testing, ethical hacking',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/Z4nzu/hackingtool',
    relatedSlugs: ['chatgpt-vs-claude', 'best-ai-coding-tools', 'build-your-own-x-2026-04-27'],
    aiToolMeta: { type: 'comparison', tools: ['Security', 'Python', 'Hacking'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'What Is It?',
        paragraphs: [
          'Python-based security toolkit bundling information gathering, vulnerability scanning, password cracking, wireless testing, and web app testing.',
          'Stars Today: +1,720 (snapshot: 2026-04-27 08:08 UTC). Repository: Z4nzu/hackingtool.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Should You Use It?',
        paragraphs: [
          'If beginner: Yes, for learning. Install in a VM. Use it to understand security concepts.',
          'If professional: No. Use Kali Linux and specialized tools.',
          'If developer: Maybe. Useful for basic security testing of your own applications.',
        ],
      },
    ],
    faq: [
      { question: 'Is this safe to install?', answer: 'Review the install script first. Consider using a VM. Never run on production systems.' },
      { question: 'How does this compare to Kali Linux?', answer: 'Kali is a full OS with professional-grade tools. This is a Python script that bundles tools. Different use cases.' },
    ],
  },""",
    
    """  {
    slug: 'gitnexus-2026-04-27',
    title: 'GitNexus: Turn Any GitHub Repo into an Interactive Knowledge Graph in Your Browser',
    description: 'GitNexus gained +700 stars. Client-side code intelligence engine. Zero-server, privacy-friendly.',
    eyebrow: 'GitHub Trending',
    intro: ['GitNexus gained +700 stars. Creates knowledge graphs from GitHub repositories.', 'Everything runs in your browser. No server required.'],
    targetKeyword: 'gitnexus, code knowledge graph, code analysis, code visualization',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/abhigyanpatwari/GitNexus',
    relatedSlugs: ['chatgpt-vs-claude', 'best-ai-coding-tools', 'github-trending-2026-04-27'],
    aiToolMeta: { type: 'comparison', tools: ['TypeScript', 'Code Analysis', 'AI'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'paragraphs',
        heading: 'What Is It?',
        paragraphs: [
          'Zero-server knowledge graph creator for code repositories. Drop in a GitHub repo URL or ZIP file.',
          'Stars Today: +700 (snapshot: 2026-04-27 08:08 UTC). Everything runs client-side.',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Should You Use It?',
        paragraphs: [
          'If onboarding to new project: Yes. Use it to understand codebase structure.',
          'If tech lead: Yes. Help new team members get up to speed faster.',
          'If strict data privacy: Yes. Everything runs client-side.',
        ],
      },
    ],
    faq: [
      { question: 'Does this upload my code?', answer: 'No. Everything runs in your browser. No code leaves your machine.' },
      { question: 'What can I do with the knowledge graph?', answer: 'Visualize code relationships, ask questions about the codebase, understand project structure.' },
    ],
  },""",
    
    """  {
    slug: 'posthog-2026-04-27',
    title: 'PostHog vs Amplitude vs Mixpanel: Why PostHog Gained +337 Stars Today',
    description: 'PostHog gained +337 stars. Open-source product analytics platform. All-in-one alternative to Amplitude and Mixpanel.',
    eyebrow: 'GitHub Trending',
    intro: ['PostHog gained +337 stars. Open-source product analytics platform.', 'Combines analytics, session replay, feature flags, and more in one tool.'],
    targetKeyword: 'posthog, amplitude alternative, mixpanel alternative, product analytics',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: 'View on GitHub',
    ctaHref: 'https://github.com/PostHog/posthog',
    relatedSlugs: ['chatgpt-vs-claude', 'best-ai-coding-tools', 'build-your-own-x-2026-04-27'],
    aiToolMeta: { type: 'comparison', tools: ['Python', 'Analytics', 'DevTools'], lastUpdated: '2026-04-27' },
    sections: [
      {
        type: 'table',
        heading: 'PostHog vs Amplitude vs Mixpanel',
        columns: ['Feature', 'PostHog', 'Amplitude', 'Mixpanel'],
        rows: [
          ['Open Source', 'Yes', 'No', 'No'],
          ['Self-Hostable', 'Yes', 'No', 'No'],
          ['Session Replay', 'Yes', 'No', 'No'],
          ['Feature Flags', 'Yes', 'No', 'No'],
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Should You Use It?',
        paragraphs: [
          'If developer building product: Yes. Great all-in-one solution.',
          'If want to avoid vendor lock-in: Yes. Open-source and self-hostable.',
          'If need enterprise support: Maybe. Smaller team than Amplitude.',
        ],
      },
    ],
    faq: [
      { question: 'Is PostHog really free?', answer: 'Yes, open-source with free tier on cloud. Self-hosting is completely free.' },
      { question: 'Can I migrate from Amplitude/Mixpanel?', answer: 'Yes. PostHog has migration guides for both.' },
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
    
    print(f"✅ Added 3 articles:")
    print(f"  1. hackingtool-2026-04-27")
    print(f"  2. gitnexus-2026-04-27")
    print(f"  3. posthog-2026-04-27")
else:
    print("❌ Could not find ];")

if __name__ == "__main__":
    pass