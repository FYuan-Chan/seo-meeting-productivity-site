import type { SeoPage } from './site';

export type EditorialSource = {
  label: string;
  url: string;
  sourceType: 'official-product' | 'official-docs' | 'company-release' | 'benchmark' | 'ecosystem-reference';
  whyUsed: string;
};

export type EditorialFact = {
  claim: string;
  evidence: string;
  confidence: 'high' | 'medium';
};

export type EditorialConclusion = {
  recommendation: string;
  bestFor: string;
  avoidWhen: string;
};

export type EditorialQualityProfile = {
  sources: EditorialSource[];
  factPack: EditorialFact[];
  methodology: string[];
  conclusion: EditorialConclusion;
  riskNotes: string[];
  experienceEvidence?: string[];
  sourceBasis: string[];
  originalValue: string[];
  visualAssets: string[];
  reviewerNotes: string[];
  publishDecision: 'approved-for-review' | 'hold';
};

type EditorialLedgerSeed = {
  sources: EditorialSource[];
  factPack: EditorialFact[];
  methodology?: string[];
  conclusion: EditorialConclusion;
  riskNotes?: string[];
};

function source(
  label: string,
  url: string,
  sourceType: EditorialSource['sourceType'],
  whyUsed: string
): EditorialSource {
  return { label, url, sourceType, whyUsed };
}

const openaiProduct = source(
  'OpenAI ChatGPT product page',
  'https://openai.com/chatgpt/',
  'official-product',
  'Used to verify current ChatGPT positioning, product surface, and plan-level claims before publication.'
);
const openaiModels = source(
  'OpenAI model documentation',
  'https://platform.openai.com/docs/models',
  'official-docs',
  'Used to keep model names, context assumptions, and API availability separate from editorial inference.'
);
const anthropicClaude = source(
  'Anthropic Claude product page',
  'https://www.anthropic.com/claude',
  'official-product',
  'Used to verify Claude positioning, product family, and supported work patterns.'
);
const anthropicModels = source(
  'Anthropic model documentation',
  'https://docs.anthropic.com/en/docs/about-claude/models',
  'official-docs',
  'Used to check model-family and context-window statements against Anthropic documentation.'
);
const googleGemini = source(
  'Google Gemini product page',
  'https://gemini.google.com/',
  'official-product',
  'Used to verify consumer Gemini positioning and Google ecosystem integration claims.'
);
const geminiModels = source(
  'Gemini API model documentation',
  'https://ai.google.dev/gemini-api/docs/models',
  'official-docs',
  'Used to separate model capability claims from practical workflow recommendations.'
);
const githubCopilot = source(
  'GitHub Copilot documentation',
  'https://docs.github.com/en/copilot',
  'official-docs',
  'Used to verify supported IDEs, enterprise controls, and Copilot product behavior.'
);
const githubCopilotProduct = source(
  'GitHub Copilot product page',
  'https://github.com/features/copilot',
  'official-product',
  'Used for public product positioning and feature-surface checks.'
);
const cursorDocs = source(
  'Cursor documentation',
  'https://docs.cursor.com/',
  'official-docs',
  'Used to verify editor features, codebase context behavior, and workflow terminology.'
);
const sourcegraphCody = source(
  'Sourcegraph Cody documentation',
  'https://sourcegraph.com/docs/cody',
  'official-docs',
  'Used to verify enterprise code-search and codebase-context claims.'
);
const tabnineEnterprise = source(
  'Tabnine enterprise page',
  'https://www.tabnine.com/enterprise',
  'official-product',
  'Used to verify privacy, deployment, and enterprise-positioning claims.'
);
const amazonQDeveloper = source(
  'Amazon Q Developer product page',
  'https://aws.amazon.com/q/developer/',
  'official-product',
  'Used because CodeWhisperer capabilities now sit under the Amazon Q Developer product family.'
);
const stackOverflowSurvey = source(
  'Stack Overflow Developer Survey 2024',
  'https://survey.stackoverflow.co/2024/',
  'benchmark',
  'Used only as a directional developer-adoption reference, not as a live usage counter.'
);
const perplexityProduct = source(
  'Perplexity product page',
  'https://www.perplexity.ai/',
  'official-product',
  'Used to verify the research-answer product positioning and source-citation workflow.'
);
const perplexityFaq = source(
  'Perplexity help center',
  'https://www.perplexity.ai/hub/faq/what-is-perplexity',
  'official-docs',
  'Used to verify how Perplexity describes answers, search, and citations.'
);
const claudeCodeDocs = source(
  'Claude Code documentation',
  'https://docs.anthropic.com/en/docs/claude-code/overview',
  'official-docs',
  'Used to verify terminal-first development workflow and Claude Code terminology.'
);
const windsurfDocs = source(
  'Windsurf documentation',
  'https://docs.windsurf.com/',
  'official-docs',
  'Used to verify Windsurf editor and AI workflow terminology.'
);
const windsurfProduct = source(
  'Windsurf editor page',
  'https://windsurf.com/editor',
  'official-product',
  'Used to check the public product surface and editor positioning.'
);
const lovableDocs = source(
  'Lovable documentation',
  'https://docs.lovable.dev/',
  'official-docs',
  'Used to verify app-builder workflow, project structure, and deployment claims.'
);
const boltProduct = source(
  'Bolt product page',
  'https://bolt.new/',
  'official-product',
  'Used to verify the browser-based full-stack generation and deployment workflow.'
);
const v0Docs = source(
  'v0 documentation',
  'https://v0.dev/docs',
  'official-docs',
  'Used to verify UI generation workflow and framework integration boundaries.'
);
const openaiGpt55Release = source(
  'OpenAI GPT-5.5 release',
  'https://openai.com/index/introducing-gpt-5-5/',
  'company-release',
  'Used as the primary source for GPT-5.5 availability, positioning, and agentic-work claims.'
);
const openaiGpt55SystemCard = source(
  'OpenAI GPT-5.5 system card',
  'https://openai.com/index/gpt-5-5-system-card/',
  'company-release',
  'Used to separate capability discussion from safety and deployment caveats.'
);
const anthropicManagedAgents = source(
  'Anthropic Managed Agents engineering post',
  'https://www.anthropic.com/engineering/managed-agents',
  'company-release',
  'Used to ground Claude agent-memory and long-horizon agent workflow discussion.'
);
const anthropicSystemCards = source(
  'Anthropic system cards',
  'https://www.anthropic.com/system-cards',
  'company-release',
  'Used to keep model and safety claims tied to Anthropic-published material.'
);
const tencentHy3 = source(
  'Tencent Hy3 preview announcement',
  'https://www.tencent.com/en-us/articles/2202320.html',
  'company-release',
  'Used as the primary source for Hy3 parameters, MoE architecture, and context-window claims.'
);
const inclusionAiGithub = source(
  'InclusionAI GitHub organization',
  'https://github.com/inclusionAI',
  'ecosystem-reference',
  'Used to check open-source availability for Ant/InclusionAI model artifacts referenced by the article.'
);
const xiaomiMimo = source(
  'Xiaomi MiMo platform',
  'https://platform.xiaomimimo.com/',
  'official-product',
  'Used to verify voice-model product availability and avoid treating secondary coverage as primary evidence.'
);

const sharedMethodology = [
  'Compare official product and documentation pages before relying on secondary commentary.',
  'Separate public product facts from SignalForges editorial interpretation.',
  'Turn tool differences into role-based recommendations instead of ranking by a single score.',
  'Flag pricing, model-name, benchmark, and availability claims as refresh-sensitive.'
];

const standardRiskNotes = [
  'Pricing, model names, limits, and plan packaging can change quickly; verify official pages before buying.',
  'Comparison scores are editorial decision aids, not laboratory benchmarks or guaranteed performance results.'
];

const editorialLedgers: Record<string, EditorialLedgerSeed> = {
  'chatgpt-vs-claude': {
    sources: [openaiProduct, openaiModels, anthropicClaude, anthropicModels],
    factPack: [
      { claim: 'ChatGPT and Claude serve overlapping assistant use cases but differ in product ecosystem and model-family behavior.', evidence: 'Official OpenAI and Anthropic product/documentation pages.', confidence: 'high' },
      { claim: 'The article recommendation is scenario-based rather than a universal winner claim.', evidence: 'Comparison table, tool profiles, and use-case grid in the page body.', confidence: 'high' },
      { claim: 'Context, pricing, and model availability are treated as volatile details.', evidence: 'Risk notes and last-updated metadata attached to the page.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Use ChatGPT when integrations, speed, and general-purpose tool access matter more; use Claude when long-context reading and careful prose are the deciding factors.',
      bestFor: 'Developers, analysts, and technical writers choosing a default assistant for coding, writing, or document review.',
      avoidWhen: 'Avoid treating either tool as a verified source of facts without checking primary documentation or cited external evidence.'
    }
  },
  'best-ai-coding-tools': {
    sources: [githubCopilot, githubCopilotProduct, cursorDocs, sourcegraphCody, tabnineEnterprise, amazonQDeveloper, stackOverflowSurvey],
    factPack: [
      { claim: 'The coding-tool market splits between IDE plugins, AI-native editors, enterprise code intelligence, privacy-first assistants, and cloud-provider assistants.', evidence: 'Official docs for Copilot, Cursor, Cody, Tabnine, and Amazon Q Developer.', confidence: 'high' },
      { claim: 'The article favors adoption fit over one-size-fits-all rankings.', evidence: 'Tool cards and scenario recommender sections.', confidence: 'high' },
      { claim: 'Developer-adoption claims should be refreshed against public surveys rather than copied forward indefinitely.', evidence: 'Stack Overflow survey source plus page risk notes.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Start with Copilot for lowest-friction IDE adoption, evaluate Cursor for codebase-aware editing, and shortlist Cody/Tabnine/Amazon Q Developer when enterprise context, privacy, or AWS workflows dominate.',
      bestFor: 'Engineering teams building a shortlist before running a two-week coding-assistant pilot.',
      avoidWhen: 'Avoid using this as procurement evidence without checking current security docs, data-retention terms, and plan limits.'
    }
  },
  'best-ai-coding-assistant': {
    sources: [githubCopilot, cursorDocs, sourcegraphCody, tabnineEnterprise, amazonQDeveloper, stackOverflowSurvey],
    factPack: [
      { claim: 'AI coding assistants cover autocomplete, chat, codebase search, refactoring, and cloud-specific guidance rather than one identical feature set.', evidence: 'Official docs across the five tools listed in aiToolMeta.', confidence: 'high' },
      { claim: 'Privacy-sensitive teams need a different shortlist than solo developers optimizing speed.', evidence: 'Tabnine enterprise positioning, Copilot docs, and the page use-case grid.', confidence: 'high' },
      { claim: 'Amazon CodeWhisperer references should be checked against Amazon Q Developer branding.', evidence: 'Amazon Q Developer product source and page risk notes.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Use this page as the quick shortlist version of the deeper coding-tools pillar: Copilot for broad adoption, Cursor for AI-native editing, Cody for large codebases, Tabnine for privacy, and Amazon Q Developer for AWS.',
      bestFor: 'Readers who want a concise buyer-style overview before reading the longer benchmark-oriented guide.',
      avoidWhen: 'Avoid relying on old CodeWhisperer naming or prices without verifying current AWS packaging.'
    }
  },
  'github-copilot-vs-cursor': {
    sources: [githubCopilot, githubCopilotProduct, cursorDocs, stackOverflowSurvey],
    factPack: [
      { claim: 'Copilot is best evaluated as an IDE-integrated assistant, while Cursor is best evaluated as an AI-native editor.', evidence: 'Official GitHub Copilot docs and Cursor docs.', confidence: 'high' },
      { claim: 'The key trade-off is workflow continuity versus deeper codebase-aware editing.', evidence: 'Page sections on plugin versus AI-native architecture and multi-file editing.', confidence: 'high' },
      { claim: 'Latency, context, and multi-file behavior can vary by project and subscription tier.', evidence: 'Risk notes attached to the page.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Choose Copilot if preserving the current IDE workflow is the main constraint; choose Cursor if multi-file editing and codebase chat are worth switching editors.',
      bestFor: 'Developers deciding between a low-friction assistant and a new AI-first editor.',
      avoidWhen: 'Avoid assuming benchmark or anecdotal refactoring results will reproduce exactly on private codebases.'
    }
  },
  'cursor-vs-windsurf': {
    sources: [cursorDocs, windsurfDocs, windsurfProduct],
    factPack: [
      { claim: 'Cursor and Windsurf are both AI coding environments, but they differ in editor surface and workflow assumptions.', evidence: 'Official Cursor and Windsurf documentation.', confidence: 'high' },
      { claim: 'The article recommendation is based on editor-switching tolerance, extension needs, and codebase-context depth.', evidence: 'Comparison table and scenario sections in the page body.', confidence: 'high' },
      { claim: 'Pricing and feature names are especially volatile in AI IDEs.', evidence: 'Risk notes and last-updated metadata.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Use Cursor when deeper AI-native editing is worth the switch; test Windsurf when keeping familiar editor ergonomics and extension compatibility matters more.',
      bestFor: 'VS Code users evaluating whether to adopt an AI-first editor or stay closer to their existing workflow.',
      avoidWhen: 'Avoid choosing on feature checklists alone; run both against one real repository before standardizing.'
    }
  },
  'chatgpt-vs-claude-vs-gemini': {
    sources: [openaiProduct, anthropicClaude, googleGemini, openaiModels, anthropicModels, geminiModels],
    factPack: [
      { claim: 'ChatGPT, Claude, and Gemini should be compared by task and ecosystem rather than by a single overall score.', evidence: 'Official product pages and page use-case grid.', confidence: 'high' },
      { claim: 'Model-family details and context behavior are volatile and should be checked in official docs.', evidence: 'OpenAI, Anthropic, and Gemini model documentation sources.', confidence: 'high' },
      { claim: 'Workspace integration can matter as much as raw model capability for daily use.', evidence: 'Product positioning and SignalForges scenario analysis.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Use ChatGPT for broad tool access, Claude for long-form analysis and writing, and Gemini when Google ecosystem proximity is the practical advantage.',
      bestFor: 'Readers picking one primary assistant or defining a multi-assistant workflow.',
      avoidWhen: 'Avoid using this page as a benchmark leaderboard; it is an adoption guide.'
    }
  },
  'perplexity-vs-chatgpt': {
    sources: [perplexityProduct, perplexityFaq, openaiProduct, openaiModels],
    factPack: [
      { claim: 'Perplexity is positioned around answer search and citations, while ChatGPT is broader assistant software.', evidence: 'Perplexity product/help pages and OpenAI product/model pages.', confidence: 'high' },
      { claim: 'The article recommends Perplexity for source discovery and ChatGPT for synthesis after evidence is gathered.', evidence: 'Research workflow section and conclusion.', confidence: 'high' },
      { claim: 'Citation presence is not the same as source quality; readers still need to inspect primary sources.', evidence: 'Risk notes and editorial methodology.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Use Perplexity first when the job is finding and checking sources; use ChatGPT after that when the job is synthesis, drafting, or reasoning from verified notes.',
      bestFor: 'Researchers, students, analysts, and technical writers who need a split workflow for evidence gathering and analysis.',
      avoidWhen: 'Avoid copying either tool output into research without opening the cited or official source.'
    }
  },
  'claude-code-vs-cursor': {
    sources: [claudeCodeDocs, anthropicClaude, cursorDocs],
    factPack: [
      { claim: 'Claude Code is evaluated as a terminal-first agent workflow, while Cursor is evaluated as an AI-native editor workflow.', evidence: 'Claude Code docs and Cursor docs.', confidence: 'high' },
      { claim: 'The tools are complementary when a team separates implementation, repository operations, and review workflows.', evidence: 'Page workflow analysis and tool profiles.', confidence: 'medium' },
      { claim: 'Terminal-agent behavior depends heavily on permissions, repository state, and verification discipline.', evidence: 'Risk notes and SignalForges methodology.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Use Cursor for editor-centered implementation and Claude Code for terminal-heavy investigation, repository operations, and end-to-end verification.',
      bestFor: 'Developers designing a two-tool AI coding workflow instead of picking a single assistant.',
      avoidWhen: 'Avoid giving either tool broad write or deploy permissions without tests, git review, and explicit quality gates.'
    }
  },
  'lovable-vs-bolt-vs-v0': {
    sources: [lovableDocs, boltProduct, v0Docs],
    factPack: [
      { claim: 'Lovable, Bolt, and v0 target different app-building moments: product scaffolding, full-stack prototyping, and UI generation.', evidence: 'Official docs/product pages and page comparison table.', confidence: 'high' },
      { claim: 'Production readiness depends on exported code quality, data model control, authentication, and deployment path.', evidence: 'Page testing framework and methodology notes.', confidence: 'medium' },
      { claim: 'Generated code should be reviewed as a starting point, not treated as production-ready by default.', evidence: 'Risk notes and development workflow conclusion.', confidence: 'high' }
    ],
    conclusion: {
      recommendation: 'Use Lovable for design-led product drafts, Bolt for fast full-stack prototypes, and v0 when you want high-quality React UI pieces to bring into an existing codebase.',
      bestFor: 'Founders and developers deciding which AI builder fits a prototype stage.',
      avoidWhen: 'Avoid shipping generated apps without dependency review, accessibility checks, security review, and deployment ownership.'
    }
  },
  'gpt-5-5-deep-analysis': {
    sources: [openaiGpt55Release, openaiGpt55SystemCard, openaiModels],
    factPack: [
      { claim: 'GPT-5.5 coverage is grounded primarily in OpenAI-published release and system-card material.', evidence: 'OpenAI GPT-5.5 release and system card.', confidence: 'high' },
      { claim: 'The article frames GPT-5.5 around agentic coding, computer use, knowledge work, and scientific research because those are the release themes.', evidence: 'OpenAI release source and article sections.', confidence: 'high' },
      { claim: 'Enterprise-deployment claims need ongoing source refresh because rollout details can change.', evidence: 'Risk notes and source ledger.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Treat GPT-5.5 as a signal that model competition is shifting toward long-horizon agent work, not merely chat quality.',
      bestFor: 'Engineering leaders evaluating how agentic coding and computer-use models affect tooling strategy.',
      avoidWhen: 'Avoid converting release claims into procurement conclusions until API limits, safety posture, and enterprise controls are verified.'
    }
  },
  'china-open-source-ai-2026': {
    sources: [tencentHy3, inclusionAiGithub, xiaomiMimo],
    factPack: [
      { claim: 'Tencent Hy3 parameter and context-window discussion is grounded in Tencent-published material.', evidence: 'Tencent Hy3 announcement.', confidence: 'high' },
      { claim: 'Open-source availability for Ant/InclusionAI artifacts should be checked against official repositories before claims are reused.', evidence: 'InclusionAI GitHub organization and risk notes.', confidence: 'medium' },
      { claim: 'Voice-model claims should be treated separately from general LLM claims.', evidence: 'Xiaomi MiMo platform source and article structure.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Read the China open-source wave as an infrastructure trend: efficient MoE, model specialization, and open ecosystem strategy matter as much as headline parameter counts.',
      bestFor: 'Developers comparing proprietary APIs with open-source or region-specific model options.',
      avoidWhen: 'Avoid adopting any model only from secondary news; verify licenses, weights, API terms, and deployment restrictions first.'
    },
    riskNotes: [
      'Some referenced Chinese model releases move through GitHub, platform pages, and social announcements at different speeds.',
      'Licensing, model-weight availability, and region access should be rechecked before this article is expanded or republished.'
    ]
  },
  'claude-ecosystem-expansion-2026': {
    sources: [anthropicManagedAgents, anthropicSystemCards, anthropicClaude, claudeCodeDocs],
    factPack: [
      { claim: 'Claude ecosystem analysis should be grounded in Anthropic-published engineering, product, and system-card material.', evidence: 'Anthropic Managed Agents post, system cards, Claude product page, and Claude Code docs.', confidence: 'high' },
      { claim: 'Memory and connector claims have governance implications, not just feature implications.', evidence: 'Article sections on memory, platform integration, and risk controls.', confidence: 'medium' },
      { claim: 'Ecosystem strategy is an editorial interpretation, not a vendor-stated conclusion.', evidence: 'SignalForges methodology and conclusion framing.', confidence: 'medium' }
    ],
    conclusion: {
      recommendation: 'Treat Claude as an ecosystem bet when your workflow depends on long-running agents, memory, and developer surfaces around the model.',
      bestFor: 'Product and engineering teams evaluating whether assistant platforms are becoming workflow infrastructure.',
      avoidWhen: 'Avoid assuming beta or ecosystem features are stable enough for regulated workflows without current Anthropic documentation.'
    }
  },
  'ai-ecosystem-developer-signal-2026-05-10': {
    sources: [
      source(
        'GitHub Blog: Validating agentic behavior when correct is not deterministic',
        'https://github.blog/ai-and-ml/generative-ai/validating-agentic-behavior-when-correct-isnt-deterministic/',
        'company-release',
        'Primary source for the dominator-analysis agent validation framework, including accuracy benchmarks and PTA construction methodology.'
      ),
      source(
        'OpenAI Blog: Running Codex safely at OpenAI',
        'https://openai.com/index/running-codex-safely',
        'company-release',
        'Primary source for Codex production security architecture, sandboxing, approval policies, network policies, and agent-native telemetry.'
      ),
      source(
        'GitHub Blog: Improving token efficiency in GitHub Agentic Workflows',
        'https://github.blog/ai-and-ml/github-copilot/improving-token-efficiency-in-github-agentic-workflows/',
        'company-release',
        'Primary source for token-efficiency optimization methodology, MCP tool pruning, CLI substitution, and Effective Tokens metric.'
      ),
    ],
    factPack: [
      { claim: 'Dominator-analysis structural validation achieved near-perfect precision and recall in controlled experiments, significantly outperforming agent self-assessment.', evidence: 'GitHub Blog post by Gaurav Mittal and Reshabh Kumar Sharma, published 2026-05-06.', confidence: 'high' },
      { claim: 'Auto-Triage Issues achieved a 62% sustained Effective Tokens reduction across 109 post-fix runs after MCP tool pruning and CLI substitution; Security Guard and Smoke Claude showed 43% and 59% reductions in the same GitHub results table.', evidence: 'GitHub Blog post by Landon Cox and Mara Kiefer, published 2026-05-07.', confidence: 'high' },
      { claim: 'GitHub reported that an MCP server with 40 tools can add 10-15 KB of schema per turn, and that pruning unused tools reduced smoke-test per-call context by 8-12 KB.', evidence: 'GitHub Blog post by Landon Cox and Mara Kiefer, published 2026-05-07.', confidence: 'high' },
      { claim: 'OpenAI runs Codex with sandboxing, approval policies, network restrictions, OS keyring credential storage, and OpenTelemetry-based agent-native logging.', evidence: 'OpenAI Blog post, published 2026-05-08.', confidence: 'high' }
    ],
    methodology: [
      'Analysis based on primary sources from GitHub Blog and OpenAI Blog, accessed on 2026-05-10 via MCP web reader.',
      'Quantified results are cited directly from primary sources without hands-on testing by SignalForges.',
      'All claims are attributed to their original authors. Performance figures are treated as refresh-sensitive.'
    ],
    conclusion: {
      recommendation: 'Teams deploying coding agents should prioritize token instrumentation, security posture review, and structural validation before scaling agent adoption.',
      bestFor: 'Engineering teams and managers evaluating infrastructure readiness for autonomous coding agents at production scale.',
      avoidWhen: 'Avoid applying these reference architectures without adaptation to your specific compliance, scale, and risk tolerance requirements.'
    },
    riskNotes: [
      'The validation framework requires 2-10 successful traces and cannot yet learn from failure logs alone.',
      'Token efficiency results come from GitHub internal repositories with high workflow volume; smaller teams may see more variance.'
    ]
  }
};

function sectionTypes(page: SeoPage): Set<string> {
  return new Set(page.sections.map((section) => section.type));
}

export function getEditorialQualityProfile(page: SeoPage): EditorialQualityProfile {
  const types = sectionTypes(page);
  const ledger = editorialLedgers[page.slug];
  const sources = ledger?.sources ?? [
    source(
      'SignalForges editorial inventory',
      'https://signalforges.com/editorial-policy/',
      'ecosystem-reference',
      'Fallback record for pages not yet promoted into the public index.'
    ),
  ];
  const factPack = ledger?.factPack ?? [
    { claim: 'This page is not yet assigned a full article-level evidence ledger.', evidence: 'Fallback editorial profile.', confidence: 'medium' },
    { claim: 'The page must not be promoted until sources and conclusions are expanded.', evidence: 'SignalForges publishing gate.', confidence: 'high' },
    { claim: 'Manual review is required before public sitemap inclusion.', evidence: 'SignalForges editorial policy.', confidence: 'high' }
  ];
  const methodology = ledger?.methodology ?? sharedMethodology;
  const conclusion = ledger?.conclusion ?? {
    recommendation: 'Hold this page until a full source ledger and article-specific conclusion are added.',
    bestFor: 'Internal editorial review only.',
    avoidWhen: 'Do not publish into the public index without a complete quality profile.'
  };
  const riskNotes = ledger?.riskNotes ?? standardRiskNotes;
  const sourceBasis = sources.map((item) => `${item.label}: ${item.whyUsed}`);

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
    sources.length > 0 ? 'Source ledger table' : '',
    factPack.length > 0 ? 'Fact pack cards' : '',
    conclusion.recommendation ? 'Editorial conclusion box' : '',
  ].filter(Boolean);

  const originalValue = [
    'Explains trade-offs and adoption fit instead of restating vendor marketing.',
    conclusion.recommendation,
    'Keeps a clear recommendation path for technical readers.',
    'Retains only articles that meet the public sitemap depth threshold.',
  ];

  const reviewerNotes = [
    `Public sitemap status: ${page.slug}.`,
    `Primary intent: ${page.targetKeyword}.`,
    'Thin historical drafts and duplicated variants are excluded from the public index.',
  ];

  return {
    sources,
    factPack,
    methodology,
    conclusion,
    riskNotes,
    sourceBasis,
    originalValue,
    visualAssets: visualAssets.length > 0 ? visualAssets : ['Structured editorial layout'],
    reviewerNotes,
    publishDecision: ledger ? 'approved-for-review' : 'hold',
  };
}
