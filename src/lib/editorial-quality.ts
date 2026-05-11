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
  },
  'github-trending-ai-devtools-2026-05-10': {
    sources: [
      source(
        'GitHub: bytedance/UI-TARS-desktop',
        'https://github.com/bytedance/UI-TARS-desktop',
        'ecosystem-reference',
        'Primary repository evidence for the top-ranked multimodal AI agent stack, including stars, forks, license, recent commits, and README content.'
      ),
      source(
        'GitHub: anthropics/financial-services',
        'https://github.com/anthropics/financial-services',
        'ecosystem-reference',
        'Primary repository evidence for Anthropic financial-services agent workflows, including named agents, vertical plugins, and deployment templates.'
      ),
      source(
        'GitHub: addyosmani/agent-skills',
        'https://github.com/addyosmani/agent-skills',
        'ecosystem-reference',
        'Primary repository evidence for agent skill standardization project, including 22 skills, slash commands, and multi-IDE support.'
      ),
    ],
    factPack: [
      { claim: 'GitHub Trending returned 13 repositories for the daily period on 2026-05-10, with the top 12 repositories analyzed in the ranking table.', evidence: 'SignalForges Growth OS GitHub Trending collection script output (reports/github-trending.json).', confidence: 'high' },
      { claim: 'bytedance/UI-TARS-desktop ranked #1 with +656 stars in the daily window, has Apache-2.0 licensing evidence, and README evidence for Agent TARS, UI-TARS Desktop, CLI/Web UI usage, and Node.js 22+ quick-start requirements.', evidence: 'GitHub Trending report and README extraction collected 2026-05-10.', confidence: 'high' },
      { claim: 'addyosmani/agent-skills ranked #3 with +1,092 stars, has MIT licensing evidence, and README evidence for 22 skills and 7 slash commands across the AI coding-agent development lifecycle.', evidence: 'GitHub Trending report and README extraction collected 2026-05-10.', confidence: 'high' },
      { claim: 'anthropics/financial-services ranked #2 with +1,479 stars, has Apache-2.0 licensing evidence, and README evidence for 10 named agents plus human sign-off disclaimers for financial-services workflows.', evidence: 'GitHub Trending report and README extraction collected 2026-05-10.', confidence: 'high' },
      { claim: 'Editorial risk screening marked 1 repository as blocked from recommendation and 3 repositories as mention-only risk context among the top 12 analyzed repositories.', evidence: 'editorialRisk fields in reports/github-trending.json.', confidence: 'high' }
    ],
    methodology: [
      'Repository ranking follows GitHub Trending daily position, not editorial preference.',
      'Editorial signals are based on GitHub API metadata, README evidence, license, activity recency, and content-fit scoring.',
      'No hands-on testing was performed by SignalForges. All numeric claims (stars, forks, issues) are refresh-sensitive and reflect the collection timestamp of 2026-05-10.',
      'Repositories flagged outside editorial scope are included in the ranking for completeness but not recommended.'
    ],
    conclusion: {
      recommendation: 'Use this ranking as a triage list: inspect UI-TARS-desktop, agent-skills, and financial-services first; keep watchlist rows separate from risk-only mentions.',
      bestFor: 'Developers, students, and engineering leaders who want a fast but evidence-grounded read on which GitHub Trending AI repositories deserve follow-up.',
      avoidWhen: 'Avoid treating Trending position or star gain as adoption proof. Verify licenses, maintenance cadence, issues, and a local run before committing evaluation resources.'
    },
    riskNotes: [
      'GitHub Trending is a 24-hour attention snapshot; daily rankings shift frequently and do not indicate sustained interest.',
      'Star counts and repository metadata are refresh-sensitive and may differ from the collection timestamp values by the time a reader visits the repositories.'
    ]
  },
  'addyosmani-agent-skills-best-practices-2026-05-10': {
    sources: [
      source('addyosmani/agent-skills GitHub repository', 'https://github.com/addyosmani/agent-skills', 'official-product', 'Primary repository identity, public metadata, and project framing.'),
      source('addyosmani/agent-skills README', 'https://github.com/addyosmani/agent-skills/blob/main/README.md', 'official-docs', 'Primary evidence for purpose, install path, usage, supported runtimes, skill anatomy, and project structure.'),
      source('addyosmani/agent-skills repository structure', 'https://github.com/addyosmani/agent-skills', 'official-docs', 'Directory listing for skills/, agents/, references/, hooks/, and docs/ used to verify file and directory counts.'),
      source('addyosmani/agent-skills CONTRIBUTING.md', 'https://github.com/addyosmani/agent-skills/blob/main/CONTRIBUTING.md', 'official-docs', 'Contribution guidelines and skill quality bar evidence.'),
      source('GitHub Trending daily snapshot 2026-05-10', 'https://github.com/trending', 'ecosystem-reference', 'Trending rank #3, star-gain +1,092, and daily window context.'),
    ],
    factPack: [
      { claim: 'addyosmani/agent-skills appeared at rank #3 on GitHub Trending daily for May 10, 2026, gaining +1,092 stars.', evidence: 'GitHub Trending daily snapshot collected by Growth OS collect_github_trending.py on 2026-05-10.', confidence: 'high' },
      { claim: 'The repository is licensed under MIT.', evidence: 'GitHub API repository metadata.', confidence: 'high' },
      { claim: 'The latest detected push time is 2026-05-09T21:55:43Z.', evidence: 'GitHub API repository metadata.', confidence: 'high' },
      { claim: 'The repository contains 20 skills (structured as skill directories), 3 agent persona files, 4 reference checklists, 7 slash commands, and session lifecycle hooks.', evidence: 'Repository structure inspection via zread-repo MCP tool.', confidence: 'high' },
      { claim: 'The project supports Claude Code, Cursor, Gemini CLI, Windsurf, OpenCode, GitHub Copilot, Kiro IDE, and Codex.', evidence: 'README Quick Start section.', confidence: 'high' },
      { claim: 'Skills follow a consistent anatomy: YAML frontmatter, overview, trigger conditions, step-by-step process, anti-rationalization tables, red flags, and verification checklists.', evidence: 'README skill anatomy documentation and docs/skill-anatomy.md.', confidence: 'high' },
      { claim: 'The project is authored primarily by Addy Osmani and incorporates Google engineering practices including Hyrum\'s Law, the Beyonce Rule, trunk-based development, and shift-left CI/CD.', evidence: 'README "Why Agent Skills" section.', confidence: 'medium' },
    ],
    methodology: [
      'Evidence comes from the GitHub repository README, repository structure inspection via the zread-repo MCP tool, and the GitHub Trending daily snapshot for May 10, 2026.',
      'No hands-on testing was performed. The article does not claim installation, execution, or evaluation in a live environment.',
      'Numeric claims (star count, skill count, persona count, command count) are sourced from the repository structure and README as of the collection timestamp. These values may change after publication.',
      'The editorial focus is on inspection value, not adoption recommendation. The verdict reflects editorial judgment about whether the repository is worth a reader\'s inspection time.'
    ],
    conclusion: {
      recommendation: 'Inspect agent-skills as a process reference and pattern library for encoding engineering discipline into AI coding agents. Borrow the anti-rationalization pattern, skill anatomy contract, and progressive disclosure design even if you do not adopt the skill pack directly.',
      bestFor: 'Engineering teams and individual developers who want to bring structured workflow discipline to their AI coding agent sessions, especially teams using Claude Code, Cursor, or Gemini CLI.',
      avoidWhen: 'Avoid if you need runtime-level enforcement rather than instruction-level guidance, if your agent runtime does not support instruction files, or if your team already has a mature agent discipline framework.'
    },
    riskNotes: [
      'Skills are Markdown instructions, not executable constraints. Agent compliance is not guaranteed and depends on the runtime and context window.',
      'The project is relatively new and the skill library may evolve rapidly. Counts and structure details are refresh-sensitive.',
      'No automated test suite or CI pipeline is documented. Verification of skill effectiveness is subjective.',
      'GitHub Trending rank and star-gain figures are specific to the May 10, 2026 daily snapshot and will not remain stable.'
    ]
  },
  'emo-pretraining-mixture-of-experts-for-emergent-modularity-2026-05-08': {
    sources: [
      source('Ai2 EMO blog post', 'https://huggingface.co/blog/allenai/emo', 'official-docs', 'Official Ai2 blog post describing EMO architecture, training method, benchmark results, and release details.'),
      source('EMO arXiv technical report', 'https://arxiv.org/abs/2605.06663', 'peer-reviewed', 'arXiv:2605.06663 — primary evidence for model architecture (14B total, 1B active, 128 experts), training data (1T tokens), document-level routing constraint, benchmark evaluations, and clustering analysis.'),
      source('allenai/EMO GitHub repository', 'https://github.com/allenai/EMO', 'official-product', 'Training code, evaluation scripts, vLLM plugin, and model checkpoint documentation. License: Apache 2.0.'),
      source('Ai2 EMO blog post (allenai.org)', 'https://allenai.org/blog/emo', 'official-docs', 'Official Ai2 website blog post with summary of EMO contributions and released artifacts.'),
      source('HuggingFace EMO model collection', 'https://huggingface.co/collections/allenai/emo', 'official-product', 'Model checkpoints: allenai/Emo_1b14b_1T, allenai/StdMoE_1b14b_1T, and ablation models.'),
    ],
    factPack: [
      { claim: 'EMO is a 14B-total-parameter, 1B-active-parameter MoE with 128 total experts (127 routed, 1 shared), 8 active experts per token, trained on 1 trillion tokens from the OLMoE pretraining corpus followed by 50 billion annealing tokens.', evidence: 'arXiv:2605.06663 Section 2 (Model Architecture) and Ai2 blog post.', confidence: 'high' },
      { claim: 'The core innovation is a document-level routing constraint where all tokens in a document are restricted to route through a shared expert pool, determined by averaging router preferences across the document.', evidence: 'arXiv:2605.06663 Section 3 (Method) and Ai2 blog post.', confidence: 'high' },
      { claim: 'Document pool sizes are randomly sampled uniformly from 8 to 127 experts during training.', evidence: 'arXiv:2605.06663 Section 3.2 (Document Pool Size).', confidence: 'high' },
      { claim: 'With 16 of 128 experts (12.5% of total), EMO loses approximately 3% absolute performance. With 32 of 128 experts (25%), the drop is approximately 1%.', evidence: 'arXiv:2605.06663 Section 4 (Results) and Ai2 blog post benchmark figures.', confidence: 'high' },
      { claim: 'A standard MoE of equal architecture trained on the same data degrades sharply at small expert subset sizes, often falling near or below random performance at the 12.5% setting.', evidence: 'arXiv:2605.06663 Section 4 (Selective Expert Use) and Ai2 blog post.', confidence: 'high' },
      { claim: 'Expert selection requires as few as 1 to 5 examples with few-shot demonstrations to identify a task-specific expert subset that performs on par with one selected using a full validation set.', evidence: 'arXiv:2605.06663 Section 4 (Expert Selection).', confidence: 'high' },
      { claim: 'EMO expert clusters correspond to semantic domains (Health, Medical & Wellness; News Reporting; US Politics & Elections; Film & Music) while standard MoE clusters correspond to surface-level features (Prepositions; Proper Names; Copula Verbs; Definite Articles).', evidence: 'arXiv:2605.06663 Section 5 (Analysis) and Ai2 blog post clustering visualization.', confidence: 'high' },
      { claim: 'The clustering analysis used the first 100 tokens from 12,000 pretraining documents with PCA and spherical k-means clustering (k=32).', evidence: 'arXiv:2605.06663 Section 5 (Clustering Methodology).', confidence: 'high' },
      { claim: '8 model checkpoints are released on HuggingFace under the allenai/emo collection, including the main EMO model, a standard MoE baseline, and ablation models.', evidence: 'HuggingFace model collection page and GitHub repository README.', confidence: 'high' },
      { claim: 'The code and models are released under the Apache 2.0 license.', evidence: 'GitHub repository LICENSE file.', confidence: 'high' },
      { claim: 'The authors are Ryan Wang (UC Berkeley), Akshita Bhagia (Ai2), and Sewon Min (UC Berkeley and Ai2).', evidence: 'arXiv:2605.06663 author list and affiliations.', confidence: 'high' },
    ],
    methodology: [
      'Evidence comes from the official Ai2 blog post on HuggingFace (huggingface.co/blog/allenai/emo), the arXiv technical report (2605.06663), the allenai/EMO GitHub repository, and the HuggingFace model collection.',
      'The event was originally surfaced by the AIHOT clustering system. The public article was written entirely from primary sources (the blog post, paper, and repository), not from AIHOT summaries.',
      'No hands-on testing was performed. The article does not claim that the author loaded, ran, or evaluated the model in a live environment.',
      'Numeric claims are sourced directly from the paper and blog post. Benchmark performance numbers are approximate where read from charts.'
    ],
    conclusion: {
      recommendation: 'Track EMO as a concrete step toward modular, composable LLM deployment. The document-level routing technique is reproducible and could reduce inference costs for domain-specific deployments, but wait for scale-up validation before betting production infrastructure on selective expert deployment.',
      bestFor: 'Teams serving MoE models at scale who want to reduce memory costs for domain-specific tasks, researchers studying MoE architecture design, and developers building domain-specific LLM tools.',
      avoidWhen: 'Avoid relying on EMO for production deployment today — it is a research release at 14B scale with no evidence yet that the technique transfers to frontier-scale models.'
    },
    riskNotes: [
      'The model is a 14B research checkpoint. There is no evidence that the 12.5% expert deployment finding holds at 70B, 400B, or larger scale.',
      'The selective deployment results depend on task domain specificity. Multi-domain tasks may not benefit as cleanly from expert subset selection.',
      'Benchmark numbers (approximately 1% at 25%, approximately 3% at 12.5%) are approximate values from paper figures, not exact table readings.',
      'The model requires custom HuggingFace modeling code (trust_remote_code=True), which carries security considerations for production use.',
      'The clustering analysis uses 12,000 documents and 32 clusters. Different configurations might reveal different specialization patterns.'
    ]
  },
  'github-trending-ai-devtools-2026-05-11': {
    sources: [
      source('bytedance/UI-TARS-desktop GitHub repository', 'https://github.com/bytedance/UI-TARS-desktop', 'official-product', 'Rank #1 repository evidence: multimodal AI agent stack with CLI, Web UI, desktop GUI agent, browser and computer operators, MCP integration.'),
      source('anthropics/financial-services GitHub repository', 'https://github.com/anthropics/financial-services', 'official-product', 'Rank #2 repository evidence: Claude for Financial Services with 10 named agents, 7 vertical plugins, 11 MCP integrations, and human sign-off governance.'),
      source('addyosmani/agent-skills GitHub repository', 'https://github.com/addyosmani/agent-skills', 'official-product', 'Rank #3 repository evidence: production-grade engineering skills for AI coding agents with 22 skills, 7 slash commands, and 8 supported platforms.'),
      source('CloakHQ/CloakBrowser GitHub repository', 'https://github.com/CloakHQ/CloakBrowser', 'official-product', 'Rank #4 repository evidence: stealth Chromium browser with source-level fingerprint patches. Included as risk context only.'),
      source('HKUDS/AI-Trader GitHub repository', 'https://github.com/HKUDS/AI-Trader', 'official-product', 'Rank #5 repository evidence: agent-native trading platform. Included as risk context only.'),
      source('jundot/omlx GitHub repository', 'https://github.com/jundot/omlx', 'official-product', 'Rank #6 repository evidence: LLM inference server for Apple Silicon with continuous batching and SSD caching.'),
      source('lsdefine/GenericAgent GitHub repository', 'https://github.com/lsdefine/GenericAgent', 'official-product', 'Rank #9 repository evidence: self-evolving agent framework with minimal core and layered memory.'),
      source('decolua/9router GitHub repository', 'https://github.com/decolua/9router', 'official-product', 'Rank #10 repository blocked by editorial risk rules. Do not recommend or deep-dive.'),
      source('GitHub Trending daily snapshot 2026-05-11', 'https://github.com/trending', 'ecosystem-reference', 'Daily snapshot collected by Growth OS collect_github_trending.py on 2026-05-11. 12 repositories returned.'),
    ],
    factPack: [
      { claim: 'GitHub Trending returned 12 repositories for the daily period on May 11, 2026.', evidence: 'reports/github-trending.json generated at 2026-05-11T04:49:41Z.', confidence: 'high' },
      { claim: 'bytedance/UI-TARS-desktop ranked #1 with +669 stars gained, 32,356 total stars, Apache-2.0 license, TypeScript.', evidence: 'GitHub Trending daily snapshot and GitHub API repository metadata.', confidence: 'high' },
      { claim: 'anthropics/financial-services ranked #2 with +1,449 stars gained, 19,201 total stars, Apache-2.0 license, Python.', evidence: 'GitHub Trending daily snapshot and GitHub API repository metadata.', confidence: 'high' },
      { claim: 'addyosmani/agent-skills ranked #3 with +1,065 stars gained, 38,734 total stars, MIT license, Shell.', evidence: 'GitHub Trending daily snapshot and GitHub API repository metadata.', confidence: 'high' },
      { claim: 'CloakHQ/CloakBrowser ranked #4 with +496 stars gained, 5,004 total stars, MIT license. Editorial risk score 35: scraping context. Mention only with risk context.', evidence: 'GitHub Trending daily snapshot, GitHub API metadata, and Growth OS editorial risk screening.', confidence: 'high' },
      { claim: 'HKUDS/AI-Trader ranked #5 with +163 stars gained, 15,744 total stars, no license declared. Editorial risk score 35: regulated-financial context. Mention only with risk context.', evidence: 'GitHub Trending daily snapshot, GitHub API metadata, and Growth OS editorial risk screening.', confidence: 'high' },
      { claim: 'decolua/9router ranked #10 with +803 stars gained. Editorial risk score 100, blocked: terms-bypass pattern. Do not recommend or deep-dive.', evidence: 'Growth OS editorial risk screening with blocked recommendation.', confidence: 'high' },
      { claim: '5 repositories were enriched with GitHub API metadata; 1 repository was blocked by editorial risk rules.', evidence: 'enrichment and editorialRisk fields in reports/github-trending.json.', confidence: 'high' },
      { claim: 'The top three repositories (UI-TARS-desktop, financial-services, agent-skills) are the same top three as the May 10 snapshot, indicating sustained multi-day attention rather than a single-day spike.', evidence: 'Comparison of May 10 and May 11 GitHub Trending daily snapshots in Growth OS reports.', confidence: 'high' },
      { claim: 'UI-TARS-desktop ships two products: Agent TARS (CLI and Web UI multimodal agent) and UI-TARS Desktop (native GUI agent for desktop control).', evidence: 'README headings and excerpt.', confidence: 'high' },
      { claim: 'anthropics/financial-services packages 10 named agents, 7 vertical plugins, 11 MCP integrations, and dual deployment paths.', evidence: 'README headings and excerpt.', confidence: 'high' },
      { claim: 'addyosmani/agent-skills now supports 8 platforms.', evidence: 'README Quick Start section and search results confirming platform support.', confidence: 'high' },
      { claim: 'lsdefine/GenericAgent has a minimal core of approximately 3,000 lines with 9 atomic tools and a layered memory system.', evidence: 'README and repository structure inspection.', confidence: 'medium' },
    ],
    methodology: [
      'Evidence comes from the GitHub Trending daily snapshot collected by Growth OS on 2026-05-11, enriched with GitHub API metadata for the top 5 repositories, and README evidence extracted via the zread-repo MCP tool.',
      'Repository ranking is based on GitHub Trending position, not editorial endorsement. Editorial fit scores and risk screening determine inspect/watch/avoid tiers.',
      'No hands-on testing was performed. The article does not claim installation, execution, or benchmark results for any repository.',
      'Star counts, ranks, and metadata are refresh-sensitive and reflect the collection timestamp.',
      'Blocked and high-risk repositories are included in the ranking table for completeness but are not recommended or deep-dived.'
    ],
    conclusion: {
      recommendation: 'Inspect UI-TARS-desktop for GUI agent infrastructure, agent-skills for coding-agent process discipline, and financial-services for enterprise agent packaging patterns. The remaining rows are watchlist items or risk context.',
      bestFor: 'Developers and engineering teams tracking the AI agent ecosystem who want a filtered daily snapshot rather than an unranked list.',
      avoidWhen: 'Avoid treating any Trending rank as a quality or adoption signal. Trending measures short-window attention only.'
    },
    riskNotes: [
      'GitHub Trending is a 24-hour attention snapshot; daily rankings shift frequently and do not indicate sustained interest or production readiness.',
      'Star counts and repository metadata are refresh-sensitive and may differ from collection timestamp values.',
      'CloakBrowser and AI-Trader carry editorial risk flags (scraping and regulated financial contexts). They are mentioned for completeness but not recommended.',
      'decolua/9router is blocked by editorial risk rules and must not be recommended or deep-dived.',
      'GenericAgent self-evolving claims and token consumption comparisons are README-sourced and not independently verified.'
    ]
  },
  'ai-ecosystem-developer-signal-2026-05-11': {
    sources: [
      source(
        'OpenAI Blog: Parloa builds service agents customers want to talk to',
        'https://openai.com/index/parloa',
        'company-release',
        'Primary source for Parloa AI Agent Management Platform architecture, multi-model orchestration with GPT-5.4, GPT-4.1, and GPT-5-mini, voice pipeline testing methodology, and production deployment results.'
      ),
      source(
        'GitHub Blog: Why age assurance laws matter for developers',
        'https://github.blog/news-insights/policy-news-and-insights/why-age-assurance-laws-matter-for-developers/',
        'company-release',
        'Primary source for age assurance legislation landscape including California AB 1043, Colorado SB 26-051, Illinois HB 4140, New York S 8102, Brazil Digital ECA, Australia and France legislation, and developer impact analysis.'
      ),
      source(
        'GitHub Blog: Validating agentic behavior when correct is not deterministic',
        'https://github.blog/ai-and-ml/generative-ai/validating-agentic-behavior-when-correct-isnt-deterministic/',
        'company-release',
        'Continued development: dominator-analysis framework for structural validation of agent outputs.'
      ),
      source(
        'OpenAI Blog: Running Codex safely at OpenAI',
        'https://openai.com/index/running-codex-safely',
        'company-release',
        'Continued development: production security architecture for coding agents including sandboxing and telemetry.'
      ),
      source(
        'GitHub Blog: Improving token efficiency in GitHub Agentic Workflows',
        'https://github.blog/ai-and-ml/github-copilot/improving-token-efficiency-in-github-agentic-workflows/',
        'company-release',
        'Continued development: MCP tool pruning and CLI substitution for token efficiency in agentic workflows.'
      ),
    ],
    factPack: [
      { claim: 'Parloa uses GPT-5.4 for core agent orchestration, GPT-4.1 for evaluation and simulation, and GPT-5-mini for post-conversation tasks.', evidence: 'OpenAI Blog case study on Parloa, published April 1, 2026.', confidence: 'high' },
      { claim: 'Parloa has managed millions of conversations across retail, travel, and insurance industries.', evidence: 'OpenAI Blog case study on Parloa, published April 1, 2026.', confidence: 'high' },
      { claim: 'Parloa reported an eighty percent reduction in requests for human agents at one global travel company deployment.', evidence: 'OpenAI Blog case study on Parloa, published April 1, 2026.', confidence: 'medium' },
      { claim: 'Parloa decomposes complex agents into modular sub-agents for authentication, booking changes, and account updates.', evidence: 'OpenAI Blog case study on Parloa, published April 1, 2026.', confidence: 'high' },
      { claim: 'California AB 1043 and AB 1856 would require OS providers to collect self-declared age and transmit age-range signals to applications via real-time API.', evidence: 'GitHub Blog post by Margaret Tucker, published May 8, 2026.', confidence: 'high' },
      { claim: 'Brazil Digital ECA became enforceable in March 2026 and applies broadly to digital services likely accessed by minors.', evidence: 'GitHub Blog post by Margaret Tucker, published May 8, 2026.', confidence: 'high' },
      { claim: 'GitHub secured an exemption for open source code collaboration platforms under Australia Social Media Minimum Age legislation.', evidence: 'GitHub Blog post by Margaret Tucker, published May 8, 2026.', confidence: 'high' },
      { claim: 'Four US states (California, Colorado, Illinois, New York) are advancing age assurance legislation affecting software distribution.', evidence: 'GitHub Blog post by Margaret Tucker, published May 8, 2026.', confidence: 'high' },
      { claim: 'Some open source projects have already restricted access in Brazil preemptively due to Digital ECA legal uncertainty.', evidence: 'GitHub Blog post by Margaret Tucker, published May 8, 2026.', confidence: 'medium' },
      { claim: 'A Maintainer Month livestream with FreeBSD Foundation and Open Source Initiative is scheduled for May 22, 2026 to discuss regulatory issues.', evidence: 'GitHub Blog post by Margaret Tucker, published May 8, 2026.', confidence: 'high' },
    ],
    methodology: [
      'Analysis based on primary sources from OpenAI Blog and GitHub Blog, accessed on 2026-05-11 via MCP web reader.',
      'Parloa architecture details and deployment metrics are cited from the OpenAI case study and have not been independently verified by SignalForges.',
      'Legislative details are cited from the GitHub Blog policy analysis. Bill numbers, sponsors, and status were extracted from the primary source.',
      'Continued developments (agentic validation, Codex safety, token efficiency) were covered in depth in the May 10 SignalForges ecosystem analysis and are summarized here with cross-reference.',
      'No hands-on testing was performed. Performance figures are treated as refresh-sensitive and attributed to their original sources.',
    ],
    conclusion: {
      recommendation: 'Adopt the Parloa architecture patterns (multi-model orchestration, deterministic guardrails, evaluation-first deployment) for production agent readiness. Track California and New York age assurance legislation for compliance planning. Monitor open source exemptions as the regulatory landscape evolves.',
      bestFor: 'Developers building or deploying AI agents who need to understand both production architecture patterns and emerging regulatory requirements that affect distribution.',
      avoidWhen: 'Do not treat legislative proposals as enacted law. Do not adopt the Parloa patterns without adapting them to your specific latency, cost, and compliance requirements.'
    },
    riskNotes: [
      'Parloa deployment metrics come from a vendor case study and have not been independently verified. The eighty percent reduction figure applies to one deployment and may not generalize.',
      'Age assurance legislation is in varying stages across jurisdictions. Bill text may change before enactment. Enforcement dates and compliance grace periods are not yet fixed for most US state bills.',
      'Brazil ANPD has not yet clarified whether FOSS projects fall under Digital ECA obligations. Draft guidance is under public consultation.',
      'Speech-to-speech model evaluation results from Parloa are not yet available. Whether these replace the STT-reasoning-TTS pipeline remains uncertain.',
      'Open source exemptions in Australia and France are specific to code collaboration platforms and may not extend to all developer tools or agent distribution channels.',
    ]
  },
  'openai-launches-deployco-to-help-businesses-build-around-intelligence-2026-05-11': {
    sources: [
      source(
        'OpenAI Blog: The Deployment Company launch',
        'https://openai.com/index/openai-launches-the-deployment-company',
        'company-release',
        'Primary source for all structural details about DeployCo: Tomoro acquisition, investment partners, operating model, and leadership quotes.'
      ),
      source(
        'Bloomberg: OpenAI Finalizes Joint Venture',
        'https://www.bloomberg.com/news/articles/2026-05-04/openai-finalizes-10-billion-joint-venture-with-pe-firms-to-deploy-ai',
        'ecosystem-reference',
        'Corroborating source for the investment amount, joint venture structure, and private equity backing.'
      ),
      source(
        'The Next Web: OpenAI closes The Deployment Company',
        'https://thenextweb.com/news/openai-deployco-finalized-10-billion-joint-venture',
        'ecosystem-reference',
        'Secondary source for valuation context and stake structure details.'
      ),
      source(
        'The Decoder: OpenAI raises over four billion for new enterprise deployment venture',
        'https://the-decoder.com/openai-raises-over-4-billion-for-new-enterprise-deployment-venture/',
        'ecosystem-reference',
        'Corroborating source confirming the joint venture structure and investment figures.'
      ),
      source(
        'IQ.wiki: The Deployment Company milestones',
        'https://iq.wiki/wiki/the-deployment-company/milestones',
        'ecosystem-reference',
        'Timeline reference for the ten billion dollar Delaware-domiciled vehicle confirmation.'
      ),
    ],
    factPack: [
      { claim: 'OpenAI has launched the OpenAI Deployment Company, a new subsidiary designed to embed Forward Deployed Engineers into organizations.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'high' },
      { claim: 'OpenAI has agreed to acquire Tomoro, bringing approximately one hundred fifty experienced Forward Deployed Engineers and Deployment Specialists.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'high' },
      { claim: 'Tomoro has built real-time AI systems for Tesco, Virgin Atlantic, and Supercell.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'high' },
      { claim: 'The Deployment Company launches with more than four billion dollars of initial investment.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'high' },
      { claim: 'Nineteen global firms are committed partners, led by TPG with Advent, Bain Capital, and Brookfield as co-lead founding partners.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'high' },
      { claim: 'Consulting and systems integration partners include Bain and Company, Capgemini, and McKinsey and Company.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'high' },
      { claim: 'The Deployment Company is majority-owned and controlled by OpenAI.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'high' },
      { claim: 'Denise Dresser is the Chief Revenue Officer at OpenAI, quoted in the official announcement.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'high' },
      { claim: 'The Tomoro acquisition is subject to customary closing conditions including regulatory approvals and is expected to close in the coming months.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'high' },
      { claim: 'Bloomberg reported the joint venture valuation at approximately ten billion dollars, citing unnamed sources familiar with the matter.', evidence: 'Bloomberg, May 4, 2026; corroborated by The Next Web.', confidence: 'medium' },
      { claim: 'The Deployment Company partnership sponsors more than two thousand businesses worldwide through its private equity partners.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'medium' },
      { claim: 'More than one million businesses have adopted OpenAI products and APIs.', evidence: 'OpenAI official blog post, May 11, 2026.', confidence: 'medium' },
    ],
    methodology: [
      'Analysis based on the primary source (OpenAI official blog post, May 11, 2026) accessed via MCP web reader.',
      'Corroborating evidence from Bloomberg, The Next Web, The Decoder, and IQ.wiki was used for market context only.',
      'The ten billion dollar valuation is reported by secondary sources and is not confirmed in the primary OpenAI announcement. It is treated as market intelligence.',
      'No hands-on testing was performed. All factual claims are attributed to their original sources.',
      'Developer impact analysis is based on SignalForges editorial assessment of the announcement\'s implications for different developer roles.',
    ],
    conclusion: {
      recommendation: 'Developers building on OpenAI APIs should evaluate how DeployCo\'s services overlap with their own offerings. Enterprise development teams should clarify data governance and intellectual property arrangements before engaging with embedded FDEs. Independent consultants should differentiate on multi-model expertise and vendor neutrality.',
      bestFor: 'Developers, engineering leaders, and AI consultants who need to understand how the AI deployment layer is changing and what competitive dynamics emerge when model providers vertically integrate into implementation services.',
      avoidWhen: 'Do not treat the DeployCo launch as a guarantee of enterprise AI deployment success. The Tomoro acquisition has not closed. Pricing, scope, and competitive dynamics remain uncertain. Do not assume DeployCo will recommend only OpenAI models.'
    },
    riskNotes: [
      'The Tomoro acquisition is subject to regulatory approvals and has not closed. Operating capacity is limited until closing.',
      'The ten billion dollar valuation is from secondary sources (Bloomberg, The Next Web) and is not confirmed in the primary OpenAI announcement.',
      'Pricing for DeployCo engagements has not been disclosed. Whether tiered engagement models for mid-market organizations will be offered is unknown.',
      'DeployCo consulting partners (McKinsey, Bain, Capgemini) also work with competing model providers. Conflict-of-interest management is not addressed in the announcement.',
      'It is unclear whether DeployCo FDEs will recommend OpenAI models exclusively or evaluate competing models based on client needs.',
      'The "more than four billion dollars" figure represents committed capital, not deployed capital. Scaling speed depends on recruitment and training capacity.',
      'One million businesses adopting OpenAI products and two thousand businesses sponsored by private equity partners are cited from the official announcement and have not been independently verified by SignalForges.',
    ]
  },
  'v2-1-139-2026-05-11': {
    sources: [
      source(
        'Anthropic GitHub Release: Claude Code v2.1.139',
        'https://github.com/anthropics/claude-code/releases/tag/v2.1.139',
        'official-product',
        'Primary source for all feature descriptions, command names, configuration options, and bug-fix details in this article.'
      ),
      source(
        'Claude Code Agent View documentation',
        'https://code.claude.com/docs/en/agent-view',
        'official-docs',
        'Official documentation for the Agent View research-preview feature linked from the v2.1.139 release notes.'
      ),
      source(
        'anthropics/claude-code GitHub repository',
        'https://github.com/anthropics/claude-code',
        'official-product',
        'Repository context for Claude Code as an agentic coding tool: project identity, description, and version history.'
      ),
    ],
    factPack: [
      { claim: 'Claude Code v2.1.139 adds Agent View (Research Preview) accessible via claude agents, providing a single list of every session.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'The /goal command sets a completion condition and Claude keeps working across turns until it is met, with a live overlay showing elapsed time, turns, and tokens.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'Hook args: string[] field provides exec form that spawns commands directly without a shell, so path placeholders never need quoting.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'Hook continueOnBlock config option for PostToolUse feeds the hook rejection reason back to Claude and continues the turn.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'MCP stdio servers receive CLAUDE_PROJECT_DIR in their environment, matching hooks. Plugin configs can reference ${CLAUDE_PROJECT_DIR} in commands.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'API requests from subagents carry x-claude-code-agent-id and x-claude-code-parent-agent-id headers.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'Remote Control, /schedule, claude.ai MCP connectors, and notification preferences are disabled when ANTHROPIC_API_KEY / apiKeyHelper / ANTHROPIC_AUTH_TOKEN is set.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'Unbounded memory growth from HTTP/SSE MCP servers streaming non-protocol data is now capped at a 16 MB limit per SSE frame.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'autoAllowBashIfSandboxed now auto-approves commands with shell expansions like $VAR and $(cmd).', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'Skill(name *) permission rules now work as prefix matches, matching Bash(ls *) behavior.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'A deadlock involving expired credentials and forceRemoteSettingsRefresh that blocked claude auth login/logout/status is now fixed.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'claude plugin details <name> shows plugin component inventory and projected per-session token cost.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'Compaction prompt now asks the model to preserve sensitive user instructions.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
      { claim: 'VS Code extension supports Cmd/Ctrl+Shift+T to reopen the most recently closed session tab.', evidence: 'Anthropic release notes for v2.1.139 on GitHub.', confidence: 'high' },
    ],
    methodology: [
      'Analysis based exclusively on the official Anthropic release notes for Claude Code v2.1.139, published on GitHub and accessed on 2026-05-11.',
      'No hands-on testing was performed. Every feature description, command name, and configuration option is cited directly from the release notes.',
      'Agent View is labeled Research Preview by Anthropic; its interface and behavior may change in future releases.',
      'No claims about performance, reliability, or user experience beyond what the release notes state are made.',
      'Developer impact analysis is based on SignalForges editorial assessment of the feature changes for different developer roles.',
    ],
    conclusion: {
      recommendation: 'Upgrade to v2.1.139 for the memory growth cap and deadlock fix if running Claude Code in production or CI. Explore Agent View and /goal as research-preview capabilities. Migrate hooks to exec form and evaluate continueOnBlock for automation pipelines.',
      bestFor: 'Developers and engineering teams using Claude Code in multi-session, CI, or automated environments who need session visibility, autonomous completion, and tighter hook control.',
      avoidWhen: 'Do not hard-code Agent View output parsing into automation scripts while it remains in Research Preview. Do not assume /goal conditions will be evaluated reliably for complex or ambiguous goals without testing.'
    },
    riskNotes: [
      'Agent View is a Research Preview feature. The command name, interface, and behavior may change in future Claude Code releases.',
      'The /goal command evaluation criteria for complex conditions are not specified in the release notes. Reliability for ambiguous goals is untested.',
      'The 16 MB SSE frame cap may be insufficient for heavily streaming MCP servers. Teams should monitor whether the cap is hit frequently in their configurations.',
      'continueOnBlock may interact unpredictably with layered hook chains. Teams with complex hook policies should test the behavior before relying on it in production.',
      'API key feature isolation disables Remote Control and /schedule when an API key is set. Teams using both authentication modes will need to choose one.',
      'This article is based on a single primary source (the Anthropic GitHub release notes). No corroborating secondary sources were used.',
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
    types.has('visual-asset') ? 'Article visual asset' : '',
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
