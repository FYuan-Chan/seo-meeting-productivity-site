export type MonetizationPrimary = 'affiliate' | 'ads' | 'lead-magnet' | 'tool-upsell';
export type PageCategory = 'commercial' | 'template' | 'examples' | 'comparison' | 'checklist';

const DEFAULT_SITE_URL = 'https://example.com';
const siteUrlFromEnv = (import.meta.env.PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, '');

export type HeroMetric = {
  label: string;
  value: string;
};

export type FeatureCard = {
  title: string;
  description: string;
};

export type PageSection =
  | {
      type: 'paragraphs';
      heading: string;
      paragraphs: string[];
    }
  | {
      type: 'bullets';
      heading: string;
      items: { label?: string; text: string }[];
    }
  | {
      type: 'cards';
      heading: string;
      cards: FeatureCard[];
    }
  | {
      type: 'table';
      heading: string;
      columns: string[];
      rows: string[][];
    };

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string[];
  targetKeyword: string;
  category: PageCategory;
  monetizationPrimary: MonetizationPrimary;
  ctaLabel: string;
  ctaHref: string;
  relatedSlugs: string[];
  sections: PageSection[];
  faq: { question: string; answer: string }[];
};

export const siteConfig = {
  siteName: 'MeetingFlow Hub',
  siteUrl: siteUrlFromEnv,
  language: 'en',
  niche: 'AI meeting notes and meeting productivity',
  heroTitle: 'Turn AI meeting workflow demand into a focused SEO asset.',
  heroDescription:
    'MeetingFlow Hub is a deployable Astro starter site built around a monetizable cluster: AI meeting assistants, meeting note templates, action items, and remote meeting workflows.',
  primaryCta: {
    label: 'Open the money page',
    href: '/pages/best-ai-meeting-assistants/'
  },
  nav: [
    { label: 'Best AI Tools', href: '/pages/best-ai-meeting-assistants/' },
    { label: 'Templates', href: '/pages/meeting-notes-template/' },
    { label: 'Examples', href: '/pages/meeting-summary-examples/' },
    { label: 'Checklist', href: '/pages/remote-meeting-checklist/' }
  ],
  metrics: [
    { label: 'Starter pages', value: '18' },
    { label: 'Main monetization', value: 'Ads + Affiliate' },
    { label: 'Expansion path', value: 'Tools + Email' }
  ] satisfies HeroMetric[],
  homepageSections: {
    nicheReasons: [
      {
        title: 'Commercial intent',
        description:
          'People comparing AI meeting assistants or searching for meeting note systems often convert into SaaS trials, making this cluster strong for affiliate monetization.'
      },
      {
        title: 'Template + tool hybrid',
        description:
          'You can rank informational pages today and layer on generators, transcript cleanup tools, or action-item extractors later.'
      },
      {
        title: 'Expandable topic graph',
        description:
          'The cluster expands naturally into role-based pages, software comparisons, glossary content, and lightweight utilities.'
      }
    ] satisfies FeatureCard[],
    monetizationCards: [
      {
        title: 'Display ads',
        description:
          'Template, example, and checklist pages can carry informational ad inventory once search traffic matures.'
      },
      {
        title: 'Affiliate links',
        description:
          'Commercial comparison pages can recommend AI note takers, collaboration suites, and adjacent productivity tools.'
      },
      {
        title: 'Future product',
        description:
          'A meeting summary generator or action-item extractor can turn the site from content asset into software asset.'
      }
    ] satisfies FeatureCard[]
  }
} as const;

export const pages: SeoPage[] = [
  {
    slug: 'best-ai-meeting-assistants',
    title: 'Best AI Meeting Assistants in 2026',
    description:
      'Compare the best AI meeting assistants for summaries, transcripts, action items, and team workflows.',
    eyebrow: 'Commercial page',
    intro: [
      'If you want this site to monetize, this is the main money page. Searchers already know they need a solution and are deciding which tool type deserves a trial.',
      'This page is structured for future affiliate blocks, pricing widgets, real product reviews, and high-intent internal links from template and glossary content.'
    ],
    targetKeyword: 'best ai meeting assistant, ai meeting notes tools, meeting summary software',
    category: 'commercial',
    monetizationPrimary: 'affiliate',
    ctaLabel: 'See supporting template pages',
    ctaHref: '/pages/meeting-notes-template/',
    relatedSlugs: [
      'meeting-notes-template',
      'meeting-summary-examples',
      'action-items-template',
      'meeting-minutes-vs-notes'
    ],
    sections: [
      {
        type: 'table',
        heading: 'Comparison angles to cover first',
        columns: ['Tool type', 'Best for', 'Strength', 'Weakness'],
        rows: [
          ['Enterprise meeting assistant', 'Large teams with compliance needs', 'Admin controls, integrations, structured summaries', 'Higher cost and slower setup'],
          ['Lightweight note taker', 'Solo founders and small teams', 'Fast onboarding, clean summaries', 'Fewer workflow automations'],
          ['Action-item focused assistant', 'Project managers', 'Great at extracting owners and deadlines', 'May be weak on transcript quality'],
          ['Collaboration suite add-on', 'Teams already in one workspace', 'Less context switching', 'Features may be shallow']
        ]
      },
      {
        type: 'bullets',
        heading: 'How to choose the right AI meeting assistant',
        items: [
          { label: 'Summary quality', text: 'Look for concise decision capture, readable recaps, and clean action-item formatting.' },
          { label: 'Workflow fit', text: 'Prioritize integrations with calendar, CRM, project management, or shared docs.' },
          { label: 'Language handling', text: 'Accuracy across accents, noisy calls, and domain jargon matters more than flashy features.' },
          { label: 'Pricing path', text: 'The free tier should prove value before you commit budget or roll the tool to a wider team.' }
        ]
      },
      {
        type: 'cards',
        heading: 'Best-fit team scenarios',
        cards: [
          { title: 'Sales teams', description: 'Favor CRM syncing, speaker attribution, and follow-up drafting.' },
          { title: 'Product teams', description: 'Prioritize decision summaries, issue extraction, and searchable meeting history.' },
          { title: 'Agencies', description: 'Choose tools that package notes into clean client-facing summaries quickly.' }
        ]
      }
    ],
    faq: [
      {
        question: 'What makes this the highest-value page in the cluster?',
        answer: 'Commercial comparison pages usually attract searchers closer to conversion, which makes them better for affiliate offers and future first-party products.'
      },
      {
        question: 'How should this page evolve next?',
        answer: 'Replace generic tool categories with real vendors, add pricing snapshots, real screenshots, and intent-matched comparison tables.'
      }
    ]
  },
  {
    slug: 'meeting-notes-template',
    title: 'Meeting Notes Template for Fast Weekly Updates',
    description:
      'Use this meeting notes template to capture goals, decisions, blockers, and next steps without bloated minutes.',
    eyebrow: 'Template page',
    intro: [
      'Template pages are dependable evergreen traffic assets because users often want a practical structure they can copy instantly.',
      'This page can later offer downloadable docs, gated templates, or a browser-based note generator.'
    ],
    targetKeyword: 'meeting notes template, simple meeting notes format, weekly meeting notes example',
    category: 'template',
    monetizationPrimary: 'ads',
    ctaLabel: 'Compare AI note-taking tools',
    ctaHref: '/pages/best-ai-meeting-assistants/',
    relatedSlugs: ['best-ai-meeting-assistants', 'meeting-summary-examples', 'action-items-template'],
    sections: [
      {
        type: 'paragraphs',
        heading: 'A lightweight template beats bloated meeting minutes',
        paragraphs: [
          'Most teams do not need formal minutes for every recurring sync. They need a quick structure that captures what changed, what matters next, and who owns follow-up work.',
          'A lightweight notes template matches that intent and keeps the page useful for repeat visits, downloads, and future tool adoption.'
        ]
      },
      {
        type: 'bullets',
        heading: 'Suggested note template blocks',
        items: [
          { label: 'Meeting goal', text: 'Why the team met and what outcome mattered most.' },
          { label: 'Key updates', text: 'Concise status changes, blockers, or context needed by absent teammates.' },
          { label: 'Decisions', text: 'Anything resolved so the same topic does not get reopened next week.' },
          { label: 'Action items', text: 'Owner, task, and target date in one line.' }
        ]
      },
      {
        type: 'cards',
        heading: 'Expansion opportunities',
        cards: [
          { title: 'Downloadable templates', description: 'Offer Google Docs, Notion, and PDF variants for list building.' },
          { title: 'Team-specific versions', description: 'Create versions for sales, product, design, and executive staff meetings.' },
          { title: 'Generator tool', description: 'Turn this content asset into a SaaS-adjacent tool with fill-in fields and export options.' }
        ]
      }
    ],
    faq: [
      {
        question: 'Should this page target formal meeting minutes?',
        answer: 'Not directly. The main intent is speed and usability, while minutes-heavy intent is better handled by a separate comparison page.'
      },
      {
        question: 'How does this page monetize?',
        answer: 'It is ideal for display ads, internal links to the commercial page, and later lead magnets such as downloadable template packs.'
      }
    ]
  },
  {
    slug: 'meeting-summary-examples',
    title: 'Meeting Summary Examples You Can Reuse in 2026',
    description:
      'Study clear meeting summary examples for leadership updates, client calls, and internal project check-ins.',
    eyebrow: 'Examples page',
    intro: [
      'Examples pages improve dwell time because visitors want language they can adapt right away.',
      'They also create natural internal-linking paths toward templates, AI tools, and future summary generators.'
    ],
    targetKeyword: 'meeting summary examples, project meeting recap example, client call summary example',
    category: 'examples',
    monetizationPrimary: 'ads',
    ctaLabel: 'Use the notes template next',
    ctaHref: '/pages/meeting-notes-template/',
    relatedSlugs: ['meeting-notes-template', 'best-ai-meeting-assistants', 'remote-meeting-checklist'],
    sections: [
      {
        type: 'cards',
        heading: 'High-value example formats',
        cards: [
          { title: 'Leadership update recap', description: 'Short, decision-focused, and suitable for fast executive review.' },
          { title: 'Client meeting recap', description: 'Highlights requests, scope shifts, and next follow-up deadlines.' },
          { title: 'Project sync summary', description: 'Captures blockers, owners, milestones, and decisions in one view.' }
        ]
      },
      {
        type: 'bullets',
        heading: 'What strong summaries include',
        items: [
          { label: 'Context', text: 'A single sentence on why the meeting happened.' },
          { label: 'Decisions', text: 'Only final choices, not every discussion detail.' },
          { label: 'Next steps', text: 'Clear owners and due dates that survive past the meeting itself.' },
          { label: 'Distribution', text: 'A format easy to paste into email, docs, or team chat.' }
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why examples matter for monetization',
        paragraphs: [
          'Traffic from example-driven keywords may not convert instantly, but it broadens topical authority and feeds internal links to commercial pages.',
          'These pages also set up future downloadable packs, summary generators, and AI-assisted rewriting tools.'
        ]
      }
    ],
    faq: [
      {
        question: 'Why not combine examples with templates on one page?',
        answer: 'Splitting intent usually works better. Example seekers and template seekers overlap, but their immediate job to be done is slightly different.'
      },
      {
        question: 'What should be added later?',
        answer: 'Real-world example blocks by meeting type, downloadable snippets, and a summary rewrite tool.'
      }
    ]
  },
  {
    slug: 'action-items-template',
    title: 'Action Items Template for Better Meeting Follow-Through',
    description:
      'Use an action items template to assign owners, deadlines, and next steps after every important meeting.',
    eyebrow: 'Workflow page',
    intro: [
      'This page bridges informational intent and future product intent because action items are easy to template and automate.',
      'It can later funnel users into a structured action-item extractor or task-syncing workflow.'
    ],
    targetKeyword: 'action items template, meeting action tracker, action item list example',
    category: 'template',
    monetizationPrimary: 'tool-upsell',
    ctaLabel: 'See remote meeting workflow tips',
    ctaHref: '/pages/remote-meeting-checklist/',
    relatedSlugs: ['meeting-notes-template', 'meeting-summary-examples', 'remote-meeting-checklist'],
    sections: [
      {
        type: 'table',
        heading: 'Core action-item fields',
        columns: ['Field', 'Why it matters'],
        rows: [
          ['Owner', 'Creates accountability so follow-up work is not ambiguous.'],
          ['Task', 'States exactly what will be delivered or decided next.'],
          ['Deadline', 'Keeps urgency visible and enables weekly review.'],
          ['Status', 'Helps teams distinguish open, blocked, and complete work.']
        ]
      },
      {
        type: 'bullets',
        heading: 'How to make the template usable',
        items: [
          { label: 'Keep it compact', text: 'If the table is too heavy, teams stop using it after one or two meetings.' },
          { label: 'Update in the meeting', text: 'Capture owners and due dates live before people leave the call.' },
          { label: 'Review weekly', text: 'The page becomes more valuable when tied to a recurring follow-up ritual.' }
        ]
      },
      {
        type: 'cards',
        heading: 'Product paths unlocked by this page',
        cards: [
          { title: 'Action-item extractor', description: 'Turn meeting notes or transcripts into structured tasks automatically.' },
          { title: 'Task sync integration', description: 'Push extracted tasks into project-management tools.' },
          { title: 'Email reminder flow', description: 'Collect emails and send simple accountability reminders.' }
        ]
      }
    ],
    faq: [
      {
        question: 'Why is this page tagged as tool-upsell?',
        answer: 'Because the user intent naturally leads to software: extracting, syncing, and tracking action items are tool-shaped problems.'
      },
      {
        question: 'Can this page still carry ads?',
        answer: 'Yes, but its bigger upside is as a bridge into a simple utility or SaaS workflow rather than pure display ads.'
      }
    ]
  },
  {
    slug: 'meeting-minutes-vs-notes',
    title: 'Meeting Minutes vs Notes: What Teams Actually Need',
    description:
      'Understand the real difference between meeting minutes and meeting notes so you can choose the right format.',
    eyebrow: 'Comparison explainer',
    intro: [
      'Comparison explainers help capture long-tail intent from users trying to choose a format before they search for a template or tool.',
      'They are also excellent hub pages for internal links because they sit between educational and practical search intent.'
    ],
    targetKeyword: 'meeting minutes vs notes, difference between meeting notes and minutes',
    category: 'comparison',
    monetizationPrimary: 'ads',
    ctaLabel: 'Copy the lightweight template',
    ctaHref: '/pages/meeting-notes-template/',
    relatedSlugs: ['meeting-notes-template', 'meeting-summary-examples', 'best-ai-meeting-assistants'],
    sections: [
      {
        type: 'table',
        heading: 'Minutes versus notes at a glance',
        columns: ['Format', 'Best use case', 'Strength', 'Tradeoff'],
        rows: [
          ['Meeting minutes', 'Formal boards, legal records, regulated settings', 'High accountability and audit trail', 'Slow to produce and harder to maintain'],
          ['Meeting notes', 'Weekly syncs, team standups, internal planning', 'Fast, readable, and easier to reuse', 'Less formal for compliance-heavy settings']
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why most startups and small teams prefer notes',
        paragraphs: [
          'In fast-moving environments, speed usually matters more than formality. Teams want a record they can scan and act on, not a document that takes longer to write than the meeting was worth.',
          'That is why notes-driven pages often pull stronger recurring search demand than minutes-heavy pages in productivity niches.'
        ]
      },
      {
        type: 'bullets',
        heading: 'When minutes are still the right choice',
        items: [
          { text: 'Board meetings with formal approvals or voting records.' },
          { text: 'Regulated contexts where legal traceability matters.' },
          { text: 'Partnership or governance meetings where exact wording may need to be referenced later.' }
        ]
      }
    ],
    faq: [
      {
        question: 'Should this page link to templates?',
        answer: 'Yes. Once users understand the difference, the next best step is usually a practical template that fits their preferred format.'
      },
      {
        question: 'Is this a commercial page?',
        answer: 'Not directly. It is a support page that strengthens topical authority and routes searchers to templates or software comparisons.'
      }
    ]
  },
  {
    slug: 'remote-meeting-checklist',
    title: 'Remote Meeting Checklist for Teams That Need Better Follow-Up',
    description:
      'Use this remote meeting checklist to run cleaner calls, capture next steps, and reduce summary chaos.',
    eyebrow: 'Checklist page',
    intro: [
      'Checklist pages are useful because they package the workflow around the meeting, not just the document created afterward.',
      'That makes them a natural place to recommend supporting tools, templates, and operational habits.'
    ],
    targetKeyword: 'remote meeting checklist, virtual meeting checklist, remote call follow-up checklist',
    category: 'checklist',
    monetizationPrimary: 'lead-magnet',
    ctaLabel: 'Review action-item structure',
    ctaHref: '/pages/action-items-template/',
    relatedSlugs: ['action-items-template', 'meeting-summary-examples', 'best-ai-meeting-assistants'],
    sections: [
      {
        type: 'bullets',
        heading: 'Before the meeting',
        items: [
          { text: 'Confirm the agenda, expected outcome, and required attendees.' },
          { text: 'Share the supporting doc early so people arrive ready to decide, not just react.' },
          { text: 'Decide how notes, recordings, and action items will be captured.' }
        ]
      },
      {
        type: 'bullets',
        heading: 'During the meeting',
        items: [
          { text: 'Keep discussion anchored to the desired outcome.' },
          { text: 'Record decisions in real time so recaps are easier to produce later.' },
          { text: 'Assign owners and deadlines before the call ends.' }
        ]
      },
      {
        type: 'bullets',
        heading: 'After the meeting',
        items: [
          { text: 'Send the summary while context is still fresh.' },
          { text: 'Push action items into the team system of record.' },
          { text: 'Track unresolved blockers into the next meeting agenda.' }
        ]
      }
    ],
    faq: [
      {
        question: 'Why is this page lead-magnet oriented?',
        answer: 'Checklists convert well into downloadable PDFs or email opt-ins, which makes them strong for early list-building.'
      },
      {
        question: 'How can this page support affiliate revenue?',
        answer: 'Recommend meeting assistants, recording tools, or collaboration software at the exact workflow moments where they reduce friction.'
      }
    ]
  },
  {
    slug: 'meeting-agenda-template',
    title: 'Meeting Agenda Template for Faster Decisions',
    description:
      'Use a meeting agenda template to keep calls focused, reduce drift, and end with clearer decisions.',
    eyebrow: 'Template page',
    intro: [
      'Agenda-driven pages target an upstream workflow query that often appears before users search for summaries, notes, or AI meeting tools.',
      'That makes this page useful for internal linking, downloadable assets, and future tool flows that generate agendas automatically from recurring meeting types.'
    ],
    targetKeyword: 'meeting agenda template, simple meeting agenda format, team meeting agenda example',
    category: 'template',
    monetizationPrimary: 'lead-magnet',
    ctaLabel: 'Pair it with a meeting notes template',
    ctaHref: '/pages/meeting-notes-template/',
    relatedSlugs: ['meeting-notes-template', 'remote-meeting-checklist', 'action-items-template'],
    sections: [
      {
        type: 'bullets',
        heading: 'What a strong agenda should include',
        items: [
          { label: 'Outcome', text: 'State the decision, update, or unblock the meeting needs to produce.' },
          { label: 'Topics', text: 'List only the issues that move the meeting toward that outcome.' },
          { label: 'Owners', text: 'Assign a lead to each topic so the room knows who drives the discussion.' },
          { label: 'Timing', text: 'Give each section a time box to reduce low-value drift.' }
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why agenda pages matter for SEO',
        paragraphs: [
          'Agenda intent is practical and evergreen. People repeatedly search for a format they can reuse for weekly team syncs, project reviews, and cross-functional meetings.',
          'That repeatable need makes this a good lead-magnet page for downloadable templates or a simple agenda builder.'
        ]
      },
      {
        type: 'cards',
        heading: 'Future expansion paths',
        cards: [
          { title: 'Department-specific agendas', description: 'Create versions for leadership, sales, product, and client meetings.' },
          { title: 'Agenda generator', description: 'Turn this page into a utility that suggests sections based on meeting type.' },
          { title: 'Agenda-to-notes workflow', description: 'Route users from planning the meeting to capturing notes and follow-ups.' }
        ]
      }
    ],
    faq: [
      {
        question: 'Should every meeting use the same agenda template?',
        answer: 'No. A simple base structure works, but high-value meetings should adapt sections to the meeting goal and team type.'
      },
      {
        question: 'How can this page monetize later?',
        answer: 'It is a strong fit for downloadable template packs, email capture, and a lightweight agenda generator tied to the broader meeting workflow cluster.'
      }
    ]
  },
  {
    slug: 'one-on-one-meeting-template',
    title: 'One-on-One Meeting Template for Managers and Direct Reports',
    description:
      'Use this one-on-one meeting template to run better manager check-ins, surface blockers, and track next steps.',
    eyebrow: 'Template page',
    intro: [
      'One-on-one meeting queries carry strong recurring demand because managers need a repeatable format they can use every week or every two weeks.',
      'This page broadens the cluster from generic team meetings into role-based long tails, which is where scalable SEO expansion usually gets more interesting.'
    ],
    targetKeyword: 'one on one meeting template, manager employee check in template, 1:1 meeting notes template',
    category: 'template',
    monetizationPrimary: 'ads',
    ctaLabel: 'See example summary formats',
    ctaHref: '/pages/meeting-summary-examples/',
    relatedSlugs: ['meeting-summary-examples', 'meeting-notes-template', 'action-items-template'],
    sections: [
      {
        type: 'bullets',
        heading: 'Core sections for a useful one-on-one',
        items: [
          { label: 'Wins', text: 'Start with progress and positive momentum before moving into blockers.' },
          { label: 'Challenges', text: 'Give space for obstacles, workload issues, or support requests.' },
          { label: 'Career growth', text: 'Include a short section for development, skills, and long-term goals.' },
          { label: 'Action items', text: 'Close with concrete follow-up items for both manager and report.' }
        ]
      },
      {
        type: 'table',
        heading: 'One-on-one format options',
        columns: ['Format', 'Best for', 'Strength'],
        rows: [
          ['Weekly 1:1', 'Fast-moving teams', 'Catches blockers early and keeps momentum high'],
          ['Biweekly 1:1', 'Stable workloads', 'Gives room for deeper reflection without meeting overload'],
          ['Monthly growth-focused 1:1', 'Career development conversations', 'Supports longer-term planning and feedback']
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why this page helps the site expand',
        paragraphs: [
          'Role-based templates are a smart next step because they create more specific intent than broad meeting keywords while still fitting the same topical authority graph.',
          'If this page gains traction, the site can expand into skip-level, performance review, and coaching conversation templates.'
        ]
      }
    ],
    faq: [
      {
        question: 'Is this better as a manager page or an employee page?',
        answer: 'Manager-led intent is usually stronger, but the page should acknowledge shared ownership so it feels useful to both sides.'
      },
      {
        question: 'What can be productized from this page?',
        answer: 'A one-on-one notes manager, meeting prep checklist, or AI summary assistant for recurring check-ins would all fit naturally.'
      }
    ]
  },
  {
    slug: 'meeting-follow-up-email-template',
    title: 'Meeting Follow-Up Email Template That Actually Gets Action',
    description:
      'Use this meeting follow-up email template to recap decisions, confirm owners, and keep post-meeting momentum alive.',
    eyebrow: 'Template page',
    intro: [
      'Follow-up email intent sits right after the meeting itself, which makes it especially useful for connecting notes, summaries, action items, and workflow software.',
      'It also attracts users who care less about the note-taking process and more about what gets sent afterward.'
    ],
    targetKeyword: 'meeting follow up email template, post meeting email example, meeting recap email sample',
    category: 'template',
    monetizationPrimary: 'tool-upsell',
    ctaLabel: 'Build better action items next',
    ctaHref: '/pages/action-items-template/',
    relatedSlugs: ['action-items-template', 'meeting-summary-examples', 'meeting-notes-template'],
    sections: [
      {
        type: 'bullets',
        heading: 'A high-performing follow-up email should include',
        items: [
          { label: 'Purpose', text: 'Remind readers what the meeting was trying to accomplish.' },
          { label: 'Decisions', text: 'Capture only the final choices and any unresolved risks.' },
          { label: 'Owners and due dates', text: 'Make responsibility impossible to miss.' },
          { label: 'Next checkpoint', text: 'Tell the team when progress will be reviewed again.' }
        ]
      },
      {
        type: 'cards',
        heading: 'Useful variations to add later',
        cards: [
          { title: 'Client follow-up email', description: 'Tailor tone and recap style for customer-facing communication.' },
          { title: 'Internal project recap', description: 'Focus on blockers, owners, and timeline changes.' },
          { title: 'Leadership summary email', description: 'Use a tighter executive-friendly recap format.' }
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why this query matters commercially',
        paragraphs: [
          'Users searching for follow-up emails often feel the pain of inconsistent post-meeting execution, which is close to workflow-software intent.',
          'That makes this page a good bridge toward AI meeting assistants, summary tools, and reminder workflows.'
        ]
      }
    ],
    faq: [
      {
        question: 'Should this page include full email scripts?',
        answer: 'Yes. Over time, adding copy-paste examples by meeting type should improve usefulness and search depth.'
      },
      {
        question: 'Why is this tagged as tool-upsell?',
        answer: 'Because follow-up automation naturally points toward software for recap drafting, reminders, and task syncing.'
      }
    ]
  },
  {
    slug: 'decision-log-template',
    title: 'Decision Log Template for Teams That Keep Revisiting Old Calls',
    description:
      'Use a decision log template to record key decisions, owners, and rationale so teams stop reopening the same debates.',
    eyebrow: 'Workflow page',
    intro: [
      'Decision-log intent is valuable because it moves beyond note capture into organizational memory, which is a stronger problem than simple documentation.',
      'That makes this page a smart bridge into future tools for searchable meeting knowledge and decision tracking.'
    ],
    targetKeyword: 'decision log template, decision tracker template, meeting decision log example',
    category: 'template',
    monetizationPrimary: 'tool-upsell',
    ctaLabel: 'Compare AI meeting assistants',
    ctaHref: '/pages/best-ai-meeting-assistants/',
    relatedSlugs: ['best-ai-meeting-assistants', 'meeting-minutes-vs-notes', 'meeting-follow-up-email-template'],
    sections: [
      {
        type: 'table',
        heading: 'Essential fields in a decision log',
        columns: ['Field', 'Purpose'],
        rows: [
          ['Decision', 'States exactly what was chosen'],
          ['Context', 'Explains why the decision mattered'],
          ['Owner', 'Clarifies who is accountable after the call'],
          ['Date and review point', 'Helps teams revisit the decision only when appropriate']
        ]
      },
      {
        type: 'bullets',
        heading: 'When a decision log is especially useful',
        items: [
          { text: 'Cross-functional projects where decisions affect multiple teams.' },
          { text: 'Leadership and roadmap meetings where tradeoffs need to be remembered.' },
          { text: 'Client or stakeholder work where scope shifts can otherwise be disputed later.' }
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why this page can support future productization',
        paragraphs: [
          'A searchable decision log is already close to product shape. Teams want a system that connects meetings, notes, decisions, and follow-up work in one place.',
          'If the site expands into tools, this page is one of the best foundations for a lightweight SaaS concept.'
        ]
      }
    ],
    faq: [
      {
        question: 'How is a decision log different from meeting notes?',
        answer: 'Meeting notes capture the discussion, while a decision log isolates the outcomes that should remain easy to reference later.'
      },
      {
        question: 'Can this page monetize before there is a product?',
        answer: 'Yes. It can carry ads, route users to software comparisons, and support lead magnets like downloadable trackers.'
      }
    ]
  },
  {
    slug: 'project-status-meeting-template',
    title: 'Project Status Meeting Template for Cleaner Weekly Updates',
    description:
      'Use this project status meeting template to report progress, surface blockers, and leave each weekly update with clearer next steps.',
    eyebrow: 'Template page',
    intro: [
      'Project status meetings are one of the most common recurring team rituals, so a solid template page can bring repeatable search demand and broad internal-link value.',
      'This page also reinforces the site around recurring operational meetings rather than only generic note-taking terms.'
    ],
    targetKeyword: 'project status meeting template, weekly project update template, project review meeting agenda',
    category: 'template',
    monetizationPrimary: 'ads',
    ctaLabel: 'Use the remote meeting checklist too',
    ctaHref: '/pages/remote-meeting-checklist/',
    relatedSlugs: ['remote-meeting-checklist', 'meeting-agenda-template', 'meeting-summary-examples'],
    sections: [
      {
        type: 'bullets',
        heading: 'Recommended sections for weekly status meetings',
        items: [
          { label: 'Progress since last update', text: 'Capture visible movement, not every activity detail.' },
          { label: 'Current risks', text: 'Highlight blockers early so the meeting can solve them.' },
          { label: 'Upcoming milestones', text: 'Keep the team aligned on deadlines and dependencies.' },
          { label: 'Actions after the meeting', text: 'Make the next week easier by assigning owners clearly.' }
        ]
      },
      {
        type: 'cards',
        heading: 'Who benefits most from this page',
        cards: [
          { title: 'Project managers', description: 'Need a consistent meeting shape across multiple workstreams.' },
          { title: 'Startup operators', description: 'Need concise updates without enterprise process overhead.' },
          { title: 'Client service teams', description: 'Need a simple cadence for reporting progress and issues.' }
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why this page helps topical authority',
        paragraphs: [
          'It adds a concrete meeting type with clear workflow intent, which is usually better than publishing broad generic productivity content.',
          'Specific meeting-type pages are often how a content asset grows from a starter site into a meaningful page system.'
        ]
      }
    ],
    faq: [
      {
        question: 'Should this page be agenda-focused or notes-focused?',
        answer: 'It should cover both lightly, but the strongest primary intent is a reusable structure for the meeting itself.'
      },
      {
        question: 'What is the best next expansion from here?',
        answer: 'Add team-specific pages such as marketing status meetings, product sprint reviews, and client status update formats.'
      }
    ]
  },
  {
    slug: 'client-meeting-notes-template',
    title: 'Client Meeting Notes Template for Agencies and Service Teams',
    description:
      'Use this client meeting notes template to capture requests, decisions, scope changes, and next follow-ups after every client call.',
    eyebrow: 'Template page',
    intro: [
      'Client-facing meeting intent is commercially useful because it sits close to service workflows, accountability, and software adoption.',
      'It also creates a path into agency-specific template clusters, which can become a meaningful sub-hub if the site grows.'
    ],
    targetKeyword: 'client meeting notes template, client call notes template, client meeting recap example',
    category: 'template',
    monetizationPrimary: 'lead-magnet',
    ctaLabel: 'See the follow-up email template',
    ctaHref: '/pages/meeting-follow-up-email-template/',
    relatedSlugs: ['meeting-follow-up-email-template', 'meeting-summary-examples', 'best-ai-meeting-assistants'],
    sections: [
      {
        type: 'bullets',
        heading: 'What client notes should capture clearly',
        items: [
          { label: 'Requests', text: 'Document exactly what the client asked for or changed.' },
          { label: 'Decisions', text: 'Record approvals, priorities, or timeline shifts made on the call.' },
          { label: 'Risks', text: 'Flag ambiguity or scope concerns before they become conflicts.' },
          { label: 'Follow-up', text: 'List the next communication or deliverable with an owner and date.' }
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why this page is worth adding early',
        paragraphs: [
          'Client meeting content pulls the site toward agency and service-business use cases, which often have strong monetization potential through templates, software recommendations, and consulting products.',
          'It also gives the money page more practical support from a real-world use case rather than only generic educational pages.'
        ]
      },
      {
        type: 'cards',
        heading: 'Natural follow-on content',
        cards: [
          { title: 'Client kickoff template', description: 'A high-intent page for setting expectations at project start.' },
          { title: 'Scope change recap template', description: 'Useful when projects need a formal written change summary.' },
          { title: 'Client status report template', description: 'Build a service-team cluster around recurring updates.' }
        ]
      }
    ],
    faq: [
      {
        question: 'Why not keep client notes inside the generic notes page?',
        answer: 'Because client meetings have different stakes, vocabulary, and follow-up patterns. Splitting intent usually creates a better landing page.'
      },
      {
        question: 'How should this page monetize first?',
        answer: 'Start with lead magnets and internal links to software comparisons, then expand into agency-specific template packs or workflow tools.'
      }
    ]
  },
  {
    slug: 'meeting-minutes-template',
    title: 'Meeting Minutes Template for Formal Team Records',
    description:
      'Use this meeting minutes template when you need a more formal meeting record with decisions, attendees, and archived follow-up items.',
    eyebrow: 'Template page',
    intro: [
      'Meeting minutes intent is adjacent to notes but typically more formal, which makes it useful for governance-heavy teams, operations workflows, and compliance-minded organizations.',
      'This page expands the cluster into a higher-structure documentation query that can later support templates, generators, and software comparisons.'
    ],
    targetKeyword: 'meeting minutes template, formal meeting minutes example, meeting minutes format',
    category: 'template',
    monetizationPrimary: 'lead-magnet',
    ctaLabel: 'Compare minutes and notes',
    ctaHref: '/pages/meeting-minutes-vs-notes/',
    relatedSlugs: ['meeting-minutes-vs-notes', 'meeting-notes-template', 'decision-log-template'],
    sections: [
      {
        type: 'bullets',
        heading: 'What formal minutes usually include',
        items: [
          { label: 'Attendees', text: 'List who was present, absent, and responsible for follow-up.' },
          { label: 'Agenda coverage', text: 'Show which topics were discussed and in what order.' },
          { label: 'Decisions', text: 'Document approved actions, votes, or direction changes clearly.' },
          { label: 'Archive value', text: 'Format the record so it can be referenced months later without confusion.' }
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why minutes pages deserve their own landing page',
        paragraphs: [
          'Many users search for minutes because they need a more official output than lightweight notes. That different intent justifies a separate page instead of hiding the topic inside a generic template article.',
          'It also opens room for future downloadable minute templates and vertical versions for boards, nonprofits, and project governance teams.'
        ]
      },
      {
        type: 'cards',
        heading: 'Strong future expansions',
        cards: [
          { title: 'Board minutes template', description: 'A high-intent subpage for governance-heavy organizations.' },
          { title: 'Minutes approval workflow', description: 'Useful for turning content traffic into process-tool demand.' },
          { title: 'Minutes generator', description: 'A simple utility angle that could become a product later.' }
        ]
      }
    ],
    faq: [
      {
        question: 'Should meeting minutes and meeting notes live on separate pages?',
        answer: 'Yes. The terms overlap, but the searcher often expects different structure, tone, and depth depending on whether they want formal minutes or lightweight notes.'
      },
      {
        question: 'How can this page monetize early?',
        answer: 'Use lead magnets, template downloads, and internal links into software comparisons or workflow tools for documentation-heavy teams.'
      }
    ]
  },
  {
    slug: 'daily-standup-meeting-template',
    title: 'Daily Standup Meeting Template for Fast Team Updates',
    description:
      'Use this daily standup meeting template to keep updates short, surface blockers quickly, and stop status meetings from dragging.',
    eyebrow: 'Template page',
    intro: [
      'Standup intent is highly repeatable because agile and product teams run these meetings constantly. That makes it a strong operational long tail rather than a one-off content page.',
      'It also helps the site move deeper into recurring meeting formats that can later support agenda tools and summary workflows.'
    ],
    targetKeyword: 'daily standup meeting template, standup agenda template, daily scrum meeting format',
    category: 'template',
    monetizationPrimary: 'ads',
    ctaLabel: 'Use a project status template too',
    ctaHref: '/pages/project-status-meeting-template/',
    relatedSlugs: ['project-status-meeting-template', 'meeting-agenda-template', 'action-items-template'],
    sections: [
      {
        type: 'bullets',
        heading: 'A simple standup structure',
        items: [
          { label: 'Yesterday', text: 'What was completed since the last check-in?' },
          { label: 'Today', text: 'What is the immediate focus before the next standup?' },
          { label: 'Blockers', text: 'What needs support, escalation, or clarification?' },
          { label: 'Parking lot', text: 'Move deep discussions out of the standup itself.' }
        ]
      },
      {
        type: 'table',
        heading: 'Standup formats by team type',
        columns: ['Team', 'Best cadence', 'Why it works'],
        rows: [
          ['Product/engineering', 'Daily', 'Keeps blockers visible and priorities aligned'],
          ['Ops/support', 'Daily or weekday-only', 'Helps coordinate time-sensitive work'],
          ['Cross-functional project teams', '2-3 times per week', 'Prevents update fatigue while keeping execution visible']
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Where this page fits in the cluster',
        paragraphs: [
          'Standup content creates a practical bridge between agendas, action items, and project status updates. That makes it unusually useful for internal links and future templates by methodology.',
          'If this page performs, the next natural branches are scrum meeting notes, sprint planning templates, and blocker tracking workflows.'
        ]
      }
    ],
    faq: [
      {
        question: 'Should standups always be daily?',
        answer: 'Not always. The best cadence depends on team speed, dependency density, and whether the meeting still creates useful alignment.'
      },
      {
        question: 'Why is this good for ads first?',
        answer: 'Standup intent is broad, practical, and recurring, which makes it a good early traffic page while the site builds more commercial layers around it.'
      }
    ]
  },
  {
    slug: 'sales-meeting-notes-template',
    title: 'Sales Meeting Notes Template for Pipeline and Deal Reviews',
    description:
      'Use this sales meeting notes template to track deal updates, next steps, risks, and rep follow-up after pipeline reviews.',
    eyebrow: 'Template page',
    intro: [
      'Sales meetings introduce a revenue-adjacent use case into the cluster, which is strategically useful because the software and workflow monetization options are stronger here.',
      'This page starts moving the site from generic meeting content toward functional templates for specific teams.'
    ],
    targetKeyword: 'sales meeting notes template, pipeline review notes template, sales call recap template',
    category: 'template',
    monetizationPrimary: 'tool-upsell',
    ctaLabel: 'See follow-up email templates',
    ctaHref: '/pages/meeting-follow-up-email-template/',
    relatedSlugs: ['meeting-follow-up-email-template', 'client-meeting-notes-template', 'decision-log-template'],
    sections: [
      {
        type: 'bullets',
        heading: 'Key fields for sales meeting notes',
        items: [
          { label: 'Deal status', text: 'Capture where each opportunity sits and what changed since the last review.' },
          { label: 'Blockers', text: 'Flag stalled approvals, missing inputs, or competitive risks.' },
          { label: 'Owner actions', text: 'Assign exactly what each rep or manager needs to do next.' },
          { label: 'Forecast impact', text: 'Note whether the update affects confidence, timing, or revenue expectations.' }
        ]
      },
      {
        type: 'cards',
        heading: 'Commercial expansion ideas',
        cards: [
          { title: 'CRM sync workflow', description: 'A strong bridge into sales tooling and process automation.' },
          { title: 'Sales call summary templates', description: 'Useful for narrower intent and higher topical depth.' },
          { title: 'Revenue meeting dashboard tool', description: 'A future product angle with clear operational value.' }
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why this page matters strategically',
        paragraphs: [
          'Team-specific meeting templates tend to convert better than generic content because the user sees a direct fit for their workflow.',
          'Sales is especially attractive because adjacent affiliate categories and future software offers are usually easier to define.'
        ]
      }
    ],
    faq: [
      {
        question: 'Is this page only for sales managers?',
        answer: 'No. It should serve reps, team leads, and revenue operations users, but manager-led pipeline review intent is often the strongest.'
      },
      {
        question: 'Why is this tagged as tool-upsell?',
        answer: 'Because note capture in sales naturally connects to CRM logging, call summaries, reminders, and revenue workflow software.'
      }
    ]
  },
  {
    slug: 'board-meeting-agenda-template',
    title: 'Board Meeting Agenda Template for Formal Leadership Reviews',
    description:
      'Use this board meeting agenda template to structure formal leadership meetings, align directors, and document high-stakes decisions cleanly.',
    eyebrow: 'Template page',
    intro: [
      'Board meeting intent is narrower than team meeting intent, but it is more structured and often commercially stronger because the searcher needs a serious reusable format.',
      'This page also broadens the site into executive and governance territory without leaving the meeting workflow niche.'
    ],
    targetKeyword: 'board meeting agenda template, board meeting format, nonprofit board agenda example',
    category: 'template',
    monetizationPrimary: 'lead-magnet',
    ctaLabel: 'Use formal minutes too',
    ctaHref: '/pages/meeting-minutes-template/',
    relatedSlugs: ['meeting-minutes-template', 'decision-log-template', 'meeting-agenda-template'],
    sections: [
      {
        type: 'bullets',
        heading: 'Typical sections in a board agenda',
        items: [
          { label: 'Call to order', text: 'Open with attendance, approvals, and required formalities.' },
          { label: 'Reports', text: 'Summarize leadership, finance, or committee updates efficiently.' },
          { label: 'Discussion items', text: 'Reserve time for strategic decisions or high-risk topics.' },
          { label: 'Resolutions and follow-up', text: 'Close with approved actions, owners, and future review dates.' }
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why this page is different from a generic agenda page',
        paragraphs: [
          'Board meetings usually require more formality, more explicit sequencing, and clearer archival value than ordinary team meetings.',
          'That difference creates a distinct landing page opportunity and supports future template packs for boards, nonprofits, and executive committees.'
        ]
      },
      {
        type: 'cards',
        heading: 'Next high-fit pages',
        cards: [
          { title: 'Nonprofit board minutes template', description: 'A natural governance subpage with strong specificity.' },
          { title: 'Board packet checklist', description: 'Useful for pre-meeting preparation intent.' },
          { title: 'Resolution tracking template', description: 'A stronger workflow extension beyond agenda creation.' }
        ]
      }
    ],
    faq: [
      {
        question: 'Should this page target business boards only?',
        answer: 'No. It should also acknowledge nonprofits, associations, and advisory boards where formal meeting structure matters.'
      },
      {
        question: 'What is the best first monetization path here?',
        answer: 'Lead magnets and downloadable template packs are the cleanest first step, followed by internal links to documentation and decision-tracking pages.'
      }
    ]
  },
  {
    slug: 'sprint-retrospective-template',
    title: 'Sprint Retrospective Template for Better Team Learning',
    description:
      'Use this sprint retrospective template to capture wins, friction, patterns, and next experiments after each delivery cycle.',
    eyebrow: 'Workflow page',
    intro: [
      'Retrospective intent adds a reflection and improvement layer to the site, which makes the cluster feel more complete for agile and product teams.',
      'It also creates room for methodology-specific content that can compound into a larger project-meeting library.'
    ],
    targetKeyword: 'sprint retrospective template, retro meeting template, agile retrospective format',
    category: 'template',
    monetizationPrimary: 'ads',
    ctaLabel: 'Pair it with a daily standup template',
    ctaHref: '/pages/daily-standup-meeting-template/',
    relatedSlugs: ['daily-standup-meeting-template', 'project-status-meeting-template', 'action-items-template'],
    sections: [
      {
        type: 'bullets',
        heading: 'Core sections in a useful retrospective',
        items: [
          { label: 'What worked', text: 'Capture the practices and decisions that helped the team deliver well.' },
          { label: 'What did not', text: 'Identify recurring friction instead of isolated complaints.' },
          { label: 'Patterns', text: 'Look for repeated causes across people, process, or dependencies.' },
          { label: 'Experiments', text: 'Finish with one or two concrete changes for the next cycle.' }
        ]
      },
      {
        type: 'table',
        heading: 'Retrospective styles',
        columns: ['Style', 'Best for', 'Benefit'],
        rows: [
          ['Start / Stop / Continue', 'Teams that want simple structure', 'Easy to repeat with low overhead'],
          ['Went well / Needs improvement', 'General team retros', 'Balanced reflection without too much facilitation'],
          ['Mad / Sad / Glad', 'Teams exploring emotion and morale', 'Surfaces softer friction earlier']
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why this page supports long-term expansion',
        paragraphs: [
          'Retrospectives connect meeting documentation with continuous improvement, which is a stronger workflow story than simple note capture alone.',
          'If the site evolves into tools, this page can later support retro boards, action tracking, and recurring meeting templates by methodology.'
        ]
      }
    ],
    faq: [
      {
        question: 'Does this page only fit agile teams?',
        answer: 'Agile teams are the clearest audience, but any team running repeat work cycles can benefit from a lightweight retrospective format.'
      },
      {
        question: 'Why not build this page later?',
        answer: 'Because it helps the site cover a broader meeting workflow now, making the cluster more defensible and internally connected.'
      }
    ]
  },
  {
    slug: 'weekly-team-meeting-agenda',
    title: 'Weekly Team Meeting Agenda That Keeps Updates Focused',
    description:
      'Use this weekly team meeting agenda to structure recurring updates, unblock teammates, and stop weekly syncs from becoming noisy status dumps.',
    eyebrow: 'Template page',
    intro: [
      'Weekly team meetings are a stable evergreen query because almost every team eventually needs a repeatable structure for recurring coordination.',
      'This page is broad enough to attract consistent traffic while still fitting tightly inside the meeting workflow cluster.'
    ],
    targetKeyword: 'weekly team meeting agenda, weekly meeting template, team sync agenda example',
    category: 'template',
    monetizationPrimary: 'ads',
    ctaLabel: 'Start with the agenda template hub',
    ctaHref: '/pages/meeting-agenda-template/',
    relatedSlugs: ['meeting-agenda-template', 'project-status-meeting-template', 'remote-meeting-checklist'],
    sections: [
      {
        type: 'bullets',
        heading: 'A good weekly team agenda usually covers',
        items: [
          { label: 'Priority updates', text: 'Review only what materially changed since the last sync.' },
          { label: 'Cross-team blockers', text: 'Surface dependencies and issues that need coordination.' },
          { label: 'Upcoming deadlines', text: 'Reconfirm the next milestones and key owners.' },
          { label: 'Decisions needed', text: 'Make time for choices, not just passive reporting.' }
        ]
      },
      {
        type: 'paragraphs',
        heading: 'Why this page is a smart traffic anchor',
        paragraphs: [
          'Weekly meeting intent is broad, stable, and easy to understand, which makes it a strong traffic-support page for the rest of the cluster.',
          'It can later branch into leadership weekly meetings, department-specific agendas, and sync templates by company size.'
        ]
      },
      {
        type: 'cards',
        heading: 'Expansion paths from here',
        cards: [
          { title: 'Weekly leadership agenda', description: 'A tighter page for exec and manager syncs.' },
          { title: 'Department-specific weekly meetings', description: 'Sales, product, marketing, and ops variations.' },
          { title: 'Weekly update generator', description: 'A lightweight tool angle for turning notes into repeatable agendas.' }
        ]
      }
    ],
    faq: [
      {
        question: 'How is this different from a project status meeting?',
        answer: 'A weekly team meeting is broader and may include coordination, updates, and decisions beyond one project alone.'
      },
      {
        question: 'Why is this page worth adding early?',
        answer: 'Because it is evergreen, internally useful, and likely to support both search traffic and future toolized workflow content.'
      }
    ]
  }


];

export const pageMap = Object.fromEntries(pages.map((page) => [page.slug, page])) as Record<string, SeoPage>;

export function getAllPageEntries() {
  return pages;
}

export function buildCanonicalUrl(siteUrl: string, pathname: string) {
  const normalizedSite = siteUrl.replace(/\/$/, '');
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${normalizedSite}${normalizedPath.replace(/\/+/g, '/').replace(/([^:])\/\//g, '$1/')}`;
}

export function getFaqSchema(page: SeoPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function getArticleSchema(page: SeoPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    author: {
      '@type': 'Organization',
      name: siteConfig.siteName
    },
    mainEntityOfPage: buildCanonicalUrl(siteConfig.siteUrl, `/pages/${page.slug}/`)
  };
}
