export type TrustPage = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
};

export const trustPages: TrustPage[] = [
  {
    slug: 'about',
    title: 'About SignalForges',
    description:
      'SignalForges publishes evidence-led analysis of AI developer tools, coding assistants, and agent infrastructure.',
    updated: '2026-05-10',
    sections: [
      {
        heading: 'What We Publish',
        paragraphs: [
          'SignalForges is an independent editorial site focused on AI developer tools, coding assistants, agent infrastructure, and practical software workflows.',
          'Our goal is to help technical readers understand what a tool does, how it is designed, where it fits, and what risks deserve attention before adoption.'
        ]
      },
      {
        heading: 'How We Work',
        paragraphs: [
          'We prioritize official documentation, source repositories, release notes, benchmark context, and direct product inspection when available.',
          'Articles are reviewed for sourcing, clarity, originality, and user value before they are included in the public sitemap.'
        ]
      },
      {
        heading: 'Publishing Standard',
        paragraphs: [
          'SignalForges keeps thin or experimental pages out of the public index while articles are rewritten around clearer evidence, stronger sourcing, and more useful conclusions.',
          'The live sitemap intentionally contains selected analysis pages and trust pages rather than every draft in the content inventory.'
        ]
      }
    ]
  },
  {
    slug: 'contact',
    title: 'Contact SignalForges',
    description:
      'Contact SignalForges for corrections, source updates, editorial questions, and partnership inquiries.',
    updated: '2026-05-10',
    sections: [
      {
        heading: 'Editorial Contact',
        paragraphs: [
          'For corrections, factual updates, or source questions, email contact@signalforges.com with the article URL and the specific claim you want us to review.',
          'We review correction requests against the original source material and update articles when the evidence supports a change.'
        ]
      },
      {
        heading: 'Partnerships',
        paragraphs: [
          'For sponsorship, tool review, or partnership discussions, use the same address and include the product name, official website, and the disclosure requirements for the relationship.',
          'Paid relationships do not guarantee coverage, placement, or a favorable conclusion.'
        ]
      },
      {
        heading: 'Response Expectations',
        paragraphs: [
          'SignalForges is a small editorial operation. We prioritize factual corrections and safety-sensitive issues before general pitches.',
          'We do not accept requests to hide material relationships, remove critical analysis without evidence, or publish unsourced claims.'
        ]
      }
    ]
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description:
      'Privacy policy for SignalForges, including analytics, cookies, advertising, and contact data.',
    updated: '2026-05-10',
    sections: [
      {
        heading: 'Information We Collect',
        paragraphs: [
          'SignalForges may collect standard website analytics such as page views, referrers, device type, browser type, approximate geography, and performance data.',
          'If you contact us by email, we receive the information you choose to send, including your email address and message content.'
        ]
      },
      {
        heading: 'Cookies and Advertising',
        paragraphs: [
          'The site may use cookies or similar technologies for analytics, security, and advertising once advertising is approved.',
          'Advertising partners may use cookies to measure ad performance, prevent fraud, and personalize or limit ad delivery according to their own policies.',
          'For Google advertising services, see how Google uses data when you use partners sites or apps: https://policies.google.com/technologies/partner-sites.'
        ]
      },
      {
        heading: 'How We Use Data',
        paragraphs: [
          'We use analytics to understand which pages are useful, identify broken experiences, and improve editorial coverage.',
          'We do not sell personal contact messages. We may retain correction requests and editorial correspondence when needed to document site operations.'
        ]
      },
      {
        heading: 'Your Choices',
        paragraphs: [
          'You can block cookies in your browser, use privacy controls provided by advertising platforms, or contact us to request deletion of direct correspondence.',
          'Some analytics or security features may not work correctly if cookies or scripts are blocked.'
        ]
      }
    ]
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    description:
      'Terms governing use of SignalForges content, links, analysis, and external resources.',
    updated: '2026-05-10',
    sections: [
      {
        heading: 'Editorial Information',
        paragraphs: [
          'SignalForges provides analysis and educational information. It is not legal, financial, security, or procurement advice.',
          'Readers should verify product details, pricing, licenses, and policies with official sources before making decisions.'
        ]
      },
      {
        heading: 'External Links',
        paragraphs: [
          'Articles may link to official product pages, GitHub repositories, documentation, research, and other external resources.',
          'External sites are controlled by their owners. SignalForges is not responsible for changes, outages, pricing changes, or claims made on third-party sites.'
        ]
      },
      {
        heading: 'Content Use',
        paragraphs: [
          'You may link to SignalForges articles and quote short excerpts with attribution.',
          'Republishing entire articles, scraping content at scale, or presenting our analysis as your own work is not permitted without written permission.'
        ]
      }
    ]
  },
  {
    slug: 'editorial-policy',
    title: 'Editorial Policy',
    description:
      'How SignalForges selects topics, researches claims, handles AI assistance, and updates articles.',
    updated: '2026-05-10',
    sections: [
      {
        heading: 'Topic Selection',
        paragraphs: [
          'We select topics based on reader value, developer relevance, verified search interest, product significance, and evidence availability.',
          'Trending topics may enter a daily publishing workflow, but they must pass source, originality, safety, and depth checks before entering the public sitemap.'
        ]
      },
      {
        heading: 'Sourcing Standard',
        paragraphs: [
          'Preferred sources include official documentation, release notes, product pages, GitHub repositories, public benchmark reports, and reputable primary-source announcements.',
          'When a claim cannot be verified, the article must either qualify it clearly or omit it.'
        ]
      },
      {
        heading: 'Corrections and Updates',
        paragraphs: [
          'We correct factual errors when credible evidence shows that an article is wrong or outdated.',
          "Material updates should preserve the reader's trust by clarifying what changed and when."
        ]
      },
      {
        heading: 'Revenue Independence',
        paragraphs: [
          'Advertising or affiliate potential cannot override the editorial gate. Pages that are thin, duplicated, misleading, or unsafe are excluded from publication.',
          'Sponsored or affiliate relationships must be disclosed when they exist.'
        ]
      }
    ]
  },
  {
    slug: 'ai-use-disclosure',
    title: 'AI Use Disclosure',
    description:
      'How SignalForges uses AI assistance while preserving human editorial accountability.',
    updated: '2026-05-10',
    sections: [
      {
        heading: 'AI-Assisted Workflow',
        paragraphs: [
          'SignalForges uses AI tools to assist with research organization, outline drafting, source comparison, grammar review, and quality auditing.',
          'AI assistance does not replace editorial responsibility. Published pages must still pass sourcing, originality, and user-value checks.'
        ]
      },
      {
        heading: 'What AI Cannot Do Alone',
        paragraphs: [
          'AI-generated claims are not accepted as evidence. Important factual claims require primary sources or clearly identified secondary sources.',
          'AI cannot approve publication, invent test results, fabricate personal experience, or create fake user numbers.'
        ]
      },
      {
        heading: 'Quality Controls',
        paragraphs: [
          'Every public article should have a fact pack, a clear recommendation, a source trail, and an editorial reason for existing.',
          'Pages that look like scaled search content are removed from the public index until rewritten.'
        ]
      }
    ]
  },
  {
    slug: 'author',
    title: 'Author and Review Team',
    description:
      'SignalForges author information, review responsibilities, and editorial accountability.',
    updated: '2026-05-10',
    sections: [
      {
        heading: 'Publisher',
        paragraphs: [
          'SignalForges is maintained by an independent operator using a research-assisted editorial workflow for AI developer tooling coverage.',
          'The site favors evidence-led analysis and gated publishing over high-volume summaries.'
        ]
      },
      {
        heading: 'Review Responsibilities',
        paragraphs: [
          'The review role checks source quality, claim specificity, broken links, user value, and whether the article should remain in the public sitemap.',
          'The publishing role is responsible for build validation, sitemap hygiene, and keeping thin content out of the public index.'
        ]
      },
      {
        heading: 'Contact',
        paragraphs: [
          'For article corrections or author questions, email contact@signalforges.com with the page URL and supporting evidence.',
          'We welcome precise corrections and source updates, especially for fast-moving AI product coverage.'
        ]
      }
    ]
  }
];

export const trustPageMap = Object.fromEntries(
  trustPages.map((page) => [page.slug, page])
) as Record<string, TrustPage>;
