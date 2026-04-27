# Why mattpocock/skills Took Over GitHub Trending: AI Agent Skills as a New Plugin Pattern

**Snapshot Time**: 2026-04-27 08:08 UTC  
**Data Source**: GitHub Trending (daily)  
**Language**: English  
**Reading Time**: 7 minutes

---

## Bottom Line

mattpocock/skills gained stars on GitHub Trending today. The interesting part is not the star spike itself, but the format: small, version-controlled workflow files for agents.

If you use Claude Code, inspect the skill files first, then try one low-risk skill such as `to-prd`.

---

## GitHub Trending Snapshot

Captured on 2026-04-27 08:08 UTC. Star counts are "today" values and will fluctuate.

| # | Repository | Stars Today | Language | What It Does |
|---|------------|-------------|----------|--------------|
| 1 | [mattpocock/skills](https://github.com/mattpocock/skills) | +2,519 | Shell | Claude Agent skills for real engineering |
| 2 | [Z4nzu/hackingtool](https://github.com/Z4nzu/hackingtool) | +1,720 | Python | All-in-one security toolkit |
| 3 | [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) | +1,701 | Python | Free Claude Code access (may violate TOS) |
| 4 | [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x) | +1,075 | Markdown | Learn by rebuilding Git, DB, Docker, etc. |
| 5 | [abhigyanpatwari/GitNexus](https://github.com/abhigyanpatwari/GitNexus) | +700 | TypeScript | Client-side code knowledge graph |
| 6 | [openclaw/openclaw](https://github.com/openclaw/openclaw) | +627 | TypeScript | Personal AI assistant |
| 7 | [ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills) | +517 | Python | Curated Codex skills list |
| 8 | [PostHog/posthog](https://github.com/PostHog/posthog) | +337 | Python | Product analytics platform |
| 9 | [trycua/cua](https://github.com/trycua/cua) | +182 | HTML | Computer-use agent infrastructure |
| 10 | [gastownhall/beads](https://github.com/gastownhall/beads) | +152 | Go | Memory upgrade for coding agents |
| 11 | [home-assistant/core](https://github.com/home-assistant/core) | +73 | Python | Open source home automation |
| 12 | [curl/curl](https://github.com/curl/curl) | +30 | C | Data transfer library |
| 13 | [microsoft/typescript-go](https://github.com/microsoft/typescript-go) | +23 | Go | Native TypeScript port |

**Total**: 13 repositories, +9,656 stars today

---

## Theme Clustering

| Theme | Count | Total Stars | Key Repos |
|-------|-------|-------------|-----------|
| AI/Agent | 7 | +6,398 | mattpocock/skills, free-claude-code, beads |
| Security | 1 | +1,720 | hackingtool |
| Learning | 1 | +1,075 | build-your-own-x |
| DevTools | 2 | +367 | PostHog, curl |
| Other | 2 | +96 | home-assistant, typescript-go |

**Verification**: 6,398 + 1,720 + 1,075 + 367 + 96 = 9,656 ✓

**Pattern**: AI/Agent tooling dominates. We see a 3-layer stack forming: Skills (mattpocock/skills), Memory (beads), Access (free-claude-code).

---

## Deep Dive: mattpocock/skills

### What Is It?

A growing collection of Claude Agent skills. Each skill lives in its own directory with a `SKILL.md` file you copy to `~/.claude/skills/`.

**Key Facts** (as of 2026-04-27 08:08 UTC):
- **Stars Today**: +2,519
- **Author**: Matt Pocock (creator of Total TypeScript, 50k+ students)
- **Structure**: Directory-based (`to-prd/SKILL.md`, `to-issues/SKILL.md`, etc.)
- **Last Commit**: Check [GitHub commits](https://github.com/mattpocock/skills/commits/main) for latest

### Skill File Structure

Each skill follows a directory pattern like `to-prd/SKILL.md`. Here's what the structure looks like:

````text
mattpocock/skills/
├── to-prd/
│   └── SKILL.md
├── to-issues/
│   └── SKILL.md
├── code-review/
│   └── SKILL.md
└── ...
````

Inside each `SKILL.md`, the format is:

````markdown
---
name: to-prd
description: Turn conversation context into a PRD and submit as GitHub issue
---

# Workflow

1. Extract context from current conversation
2. Identify missing requirements
3. Generate structured PRD:
   - Product Overview
   - Requirements (P0/P1/P2)
   - Success Criteria
4. Submit as GitHub issue

# Output Format

[Template for PRD output]
````

**Note**: Simplified example based on to-prd/SKILL.md; the actual file uses a longer Process section and PRD template. See the [source](https://github.com/mattpocock/skills/blob/main/to-prd/SKILL.md) for the full version.

**Why This Matters**: The `metadata + workflow + template` format could become one practical pattern for agent plugins. It's simple, version-controllable, and model-agnostic in theory.

### Installation

```bash
# Recommended: Install individual skills
npx skills@latest add mattpocock/skills/to-prd

# Verify
ls ~/.claude/skills/  # Should see to-prd/ directory

# Alternative: Clone repo for manual inspection
git clone https://github.com/mattpocock/skills.git
# Then manually copy specific skill directories you want
```

### Representative Workflows

The repository includes skills across several categories. Representative workflows include:

| Category | Example Skills | Purpose |
|----------|----------------|---------|
| Planning | to-prd, to-issues | Requirements → tasks |
| Development | tdd, improve-codebase-architecture | Testing and architecture |
| Tooling | setup-pre-commit, git-guardrails-claude-code | Dev workflow automation |
| Meta | write-a-skill, edit-article | Create and refine skills |

For the complete list, check the [repository directory](https://github.com/mattpocock/skills).

---

## Evidence-Based Assessment

### Claim 1: Author is credible

**Evidence**:
- [Matt Pocock on Twitter](https://twitter.com/mattpocock) — 100k+ followers
- [Total TypeScript](https://totaltypescript.com) — paid course with 50k+ students
- Known for TypeScript education, not random AI hype

**Confidence**: High

### Claim 2: Solves real problem

**Evidence**:
- Claude Code users frequently rewrite similar prompts
- Skills cover common workflows (PRD, issues, review, docs)
- README shows actual use cases, not toy examples

**Confidence**: High

### Claim 3: Installation is simple

**Evidence**:
- `npx skills@latest add mattpocock/skills/to-prd` — one command
- No API keys, no config files, no cloud dependencies
- Skills are local files, not remote services

**Confidence**: High

### Claim 4: May save time in PRD-to-issue workflows

**Evidence**:
- In typical workflows, these skills may reduce repeated prompting and formatting time
- Actual time saved depends on project complexity
- No controlled study exists; this is qualitative observation

**Confidence**: Medium

---

## Should You Use It?

### If You Use Claude Code

**Inspect first, then try**:
1. View skill source: browse the [repository](https://github.com/mattpocock/skills)
2. Understand the workflow
3. Try on a low-stakes task
4. Evaluate output quality

**Why**: The skills are just prompts. You can modify them. No lock-in.

### If You Use ChatGPT

**Skip**: These skills are designed for Claude's agent system. They won't work with ChatGPT.

### If You're an Enterprise

**Caution**: This is a personal project by one developer. No SLA, no official support. For critical workflows, consider building your own prompts.

---

## The Bigger Picture: Agent Skills as Plugins

### Why This Trend Matters

We're seeing early signs of a plugin ecosystem for AI agents:

| Layer | Example | Status |
|-------|---------|--------|
| Skills | mattpocock/skills | Emerging |
| Memory | gastownhall/beads | Early |
| Access | free-claude-code | Risky |
| Orchestration | (not yet) | Missing |

This is similar to how npm started: individual developers sharing small, reusable modules.

### What's Missing

1. **Standard Format**: No universally adopted cross-agent schema yet
2. **Registry**: Discovery is still fragmented across individual repos and emerging registries
3. **Versioning**: Update/versioning workflows are still immature
4. **Testing**: No established way to validate skill quality

### What's Next

Expect to see:
- More skill libraries for different domains
- Attempts at standardization
- Integration into IDE plugins
- Enterprise skill management tools

---

## Learning Path

### Day 1: Inspect (30 minutes)

```bash
# Install one skill
npx skills@latest add mattpocock/skills/to-prd

# Read the source
cat ~/.claude/skills/to-prd/SKILL.md

# Try it
# In Claude Code: "Use to-prd skill to convert this discussion into a PRD"
```

### Day 2-3: Experiment (2 hours)

```bash
# Install more skills
npx skills@latest add mattpocock/skills/to-issues
npx skills@latest add mattpocock/skills/code-review

# Compare outputs
# Note: which skills are useful for your workflow?
```

### Week 2: Understand (5 hours)

- Read all skill files
- Understand prompt structure
- Modify one skill for your needs
- Write down what worked and what didn't

---

## Data Sources

- **GitHub Trending**: https://github.com/trending?since=daily
- **Snapshot Time**: 2026-04-27 08:08 UTC
- **mattpocock/skills**: https://github.com/mattpocock/skills
- **README Analysis**: Direct GitHub raw content

---

## FAQ

### Q: How do I install mattpocock/skills?

A: Run `npx skills@latest add mattpocock/skills/to-prd` for a single skill, or clone the repo and copy to `~/.claude/skills/`.

### Q: Does this work with ChatGPT?

A: No. These skills are designed for Claude's agent system. ChatGPT users need different prompts.

### Q: Which skill should I start with?

A: Start with `to-prd`. It's the most practical for converting discussions into structured documents.

### Q: Is this safe?

A: The skill files themselves are local prompt instructions, but some skills may ask the agent to use external services such as GitHub (e.g., `to-prd` submits a GitHub issue). Review the instructions before running them.

### Q: Will this be maintained?

A: Unknown. This is a personal project by Matt Pocock. Check the [GitHub repo](https://github.com/mattpocock/skills) for recent activity.

---

**Disclaimer**: Analysis based on GitHub Trending data captured on 2026-04-27 08:08 UTC. Star counts change daily. Verify current numbers before making decisions.
