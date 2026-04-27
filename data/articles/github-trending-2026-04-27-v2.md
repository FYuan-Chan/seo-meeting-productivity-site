# Why mattpocock/skills Took Over GitHub Trending: AI Agent Skills as the New Plugin Layer

**Snapshot Time**: 2026-04-27 15:55 UTC
**Data Source**: GitHub Trending (daily)
**Language**: English
**Reading Time**: 7 minutes

---

## Bottom Line

mattpocock/skills gained +2,519 stars on 2026-04-27. This is not just another trending repo—it signals that **AI Agent Skills are becoming a new plugin format**.

If you use Claude Code, inspect the skill files first, then try one low-risk skill such as `to-prd`.

---

## GitHub Trending Snapshot

Captured on 2026-04-27 15:55 UTC. Stars are "today" values and will change.

| # | Repository | Stars Today | Language | What It Does |
|---|------------|-------------|----------|--------------|
| 1 | [mattpocock/skills](https://github.com/mattpocock/skills) | +2,519 | Shell | 23 Claude Agent skills for real engineering |
| 2 | [Z4nzu/hackingtool](https://github.com/Z4nzu/hackingtool) | +1,720 | Python | All-in-one security toolkit |
| 3 | [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) | +1,701 | Python | Free Claude Code access (risk: may violate TOS) |
| 4 | [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x) | +1,075 | Markdown | Learn by rebuilding: Git, DB, Docker, etc. |
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
| AI/Agent Tooling | 7 | +6,218 | mattpocock/skills, free-claude-code, beads |
| Security | 1 | +1,720 | hackingtool |
| Learning | 1 | +1,075 | build-your-own-x |
| Developer Tools | 2 | +360 | PostHog, curl |
| Other | 2 | +96 | home-assistant, typescript-go |

**Pattern**: AI/Agent tooling dominates. We see a 3-layer stack forming: Skills (mattpocock/skills), Memory (beads), Access (free-claude-code).

---

## Deep Dive: mattpocock/skills

### What Is It?

23 Claude Agent skills. Each is a standalone `.md` file you copy to `~/.claude/skills/`.

**Key Facts** (as of 2026-04-27 15:55 UTC):
- **Stars Today**: +2,519
- **Author**: Matt Pocock (creator of Total TypeScript, 50k+ students)
- **README Size**: 3,680 characters
- **Last Commit**: Check [GitHub](https://github.com/mattpocock/skills/commits/main) for latest

### Skill File Structure

Here's what a skill file actually looks like:

```markdown
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

```markdown
# PRD: [Product Name]

## 1. Product Overview
### 1.1 Positioning
[One paragraph]

## 2. Requirements
### 2.1 Core Features
- [Feature 1]
- [Feature 2]

### 2.2 Priority
P0: [Must have]
P1: [Should have]
```
```

**Why This Matters**: The `---metadata--- + workflow + template` format could become the standard for agent plugins. It's simple, version-controllable, and model-agnostic (in theory).

### Installation

```bash
# Option 1: Single skill (recommended for inspection)
npx skills@latest add mattpocock/skills/to-prd

# Option 2: All skills
git clone https://github.com/mattpocock/skills.git
cp -r skills/* ~/.claude/skills/

# Verify
ls ~/.claude/skills/  # Should see to-prd.md, to-issues.md, etc.
```

### Available Skills

| Category | Skills | Purpose |
|----------|--------|---------|
| Planning | to-prd, to-issues, to-design-doc | Requirements → tasks |
| Code Quality | code-review, debug-helper | Review and debug |
| Documentation | to-readme, to-changelog | Auto-generate docs |
| Workflow | to-test, to-deploy | Automation |

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
- 23 skills cover common workflows (PRD, issues, review, docs)
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
1. View skill source: `cat ~/.claude/skills/to-prd.md`
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

We're seeing early signs of a **plugin ecosystem for AI agents**:

| Layer | Example | Status |
|-------|---------|--------|
| Skills | mattpocock/skills | Emerging |
| Memory | gastownhall/beads | Early |
| Access | free-claude-code | Risky |
| Orchestration | (not yet) | Missing |

This is similar to how npm started: individual developers sharing small, reusable modules.

### What's Missing

1. **Standard Format**: No agreed-upon metadata schema yet
2. **Registry**: No central place to discover skills
3. **Versioning**: No way to handle skill updates
4. **Testing**: No way to validate skill quality

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
cat ~/.claude/skills/to-prd.md

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
- **Snapshot Time**: 2026-04-27 15:55 UTC
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

A: Skills are local prompt files. They don't send data externally. But always review the content before using in production.

### Q: Will this be maintained?

A: Unknown. This is a personal project by Matt Pocock. Check the GitHub repo for recent activity.

---

**Disclaimer**: Analysis based on GitHub Trending data captured on 2026-04-27 15:55 UTC. Star counts change daily. Verify current numbers before making decisions.
