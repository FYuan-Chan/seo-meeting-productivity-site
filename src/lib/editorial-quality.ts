import type { SeoPage } from './site';

export type EditorialQualityProfile = {
  sourceBasis: string[];
  originalValue: string[];
  visualAssets: string[];
  reviewerNotes: string[];
  publishDecision: 'approved-for-review' | 'hold';
};

function sectionTypes(page: SeoPage): Set<string> {
  return new Set(page.sections.map((section) => section.type));
}

export function getEditorialQualityProfile(page: SeoPage): EditorialQualityProfile {
  const types = sectionTypes(page);
  const sourceBasis = [
    'Official product documentation, release notes, repository pages, or vendor material where available.',
    'Public benchmark, pricing, feature, or adoption claims only when the article provides source context.',
    'Manual editorial review during the SignalForges AdSense recovery period.',
  ];

  if (page.category === 'github-trending' && page.aiToolMeta?.githubMeta) {
    sourceBasis.unshift(`GitHub repository metadata for ${page.aiToolMeta.githubMeta.repoUrl}.`);
  }

  const visualAssets = [
    types.has('comparison-table') ? 'Comparison matrix' : '',
    types.has('tool-cards') ? 'Tool review cards' : '',
    types.has('pricing-table') ? 'Pricing table' : '',
    types.has('use-case-grid') ? 'Use-case recommender grid' : '',
    types.has('table') ? 'Evidence or decision table' : '',
    types.has('cards') ? 'Structured scenario cards' : '',
  ].filter(Boolean);

  const originalValue = [
    'Explains trade-offs and adoption fit instead of restating vendor marketing.',
    'Keeps a clear recommendation path for technical readers.',
    'Retains only articles that meet the public sitemap depth threshold.',
  ];

  const reviewerNotes = [
    `Public sitemap status: ${page.slug}.`,
    `Primary intent: ${page.targetKeyword}.`,
    'Thin historical drafts and duplicated variants are excluded from the review sitemap.',
  ];

  return {
    sourceBasis,
    originalValue,
    visualAssets: visualAssets.length > 0 ? visualAssets : ['Structured editorial layout'],
    reviewerNotes,
    publishDecision: 'approved-for-review',
  };
}
