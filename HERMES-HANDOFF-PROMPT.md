# 项目交接通知 — SEO 变现系统技术升级完成

Hermes，有几件重要的事情需要通知你。

首先，你的 SOUL.md 已经被升级了（路径：`/Users/chenfengyuan/.hermes/SOUL.md`）。你的身份从之前的"自动化创业搭子"升级为**「AI 领域专家 + 资深软件工程师 + 技术科普作者」三支柱身份**。这次升级重新定义了你的知识领域、表达风格和内容定位。请先重新阅读你的 SOUL.md，了解新的身份定位和表达风格，然后再继续往下看。

---

## 一、项目方向变更

我们的 SEO 变现项目方向已经调整：

- **原方向** "meeting productivity"（会议效率工具）经过系统调研分析，综合评分仅 **5.6/10**，竞争激烈且变现空间有限，已决定放弃
- **新方向** "AI 工具对比 + GitHub Trending 技术内容"，综合评分 **8.3/10**，流量潜力大、变现路径清晰、与你的新身份高度契合

完整的决策依据和调研数据在这份报告中：

`/Users/chenfengyuan/Documents/hermes-code/seo-meeting-productivity-site/SEO-MONETIZATION-RESEARCH.md`

**请仔细阅读这份调研报告，理解为什么要转型、新方向的优势在哪里。**

---

## 二、执行计划

详细的 AI 工具对比方向落地计划在：

`/Users/chenfengyuan/Documents/hermes-code/seo-meeting-productivity-site/AI-TOOLS-COMPARISON-PLAN.md`

这份计划包含：

- **关键词矩阵**：三级关键词体系 + 5 个话题集群（AI 写作、AI 编程、AI 设计、AI 生产力、AI 聊天机器人）
- **页面框架**：标准化的对比页面结构和内容模板
- **变现模式**：affiliate 链接、广告位、内容引流路径
- **Sprint 规划**：Phase 0-6 分阶段执行流程

其中 **Phase 0（技术基建）已由 Qoder 全部完成**。你接下来的任务是从 **Phase 1** 开始：内容创作 + 运营 + 流量分析。

---

## 三、已完成的技术基建

以下技术能力已全部就绪，你可以直接使用：

1. **数据结构扩展**：`/Users/chenfengyuan/Documents/hermes-code/seo-meeting-productivity-site/src/lib/site.ts` 已支持 AI 工具对比、GitHub Trending、教程等新页面类型

2. **5 个新 Astro 组件**（位于 `src/components/ai-tools/`）：
   - `ComparisonTable` — 多维度对比表格
   - `ToolRatingCard` — 工具评分卡片
   - `PricingComparison` — 价格方案对比
   - `UseCaseRecommender` — 使用场景推荐
   - `RelatedComparisons` — 相关对比内链导航

3. **5 个示例页面已上线**：chatgpt-vs-claude、best-ai-coding-tools、github-copilot-vs-cursor、best-ai-writing-tools、jasper-vs-copy-ai

4. **Schema.org 结构化数据扩展**：Review Schema、Product Schema、Breadcrumb Schema 自动生成，提升搜索引擎可见性

5. **Sitemap lastmod 支持**：所有页面都包含 lastmod 日期，利于搜索引擎抓取

6. **自动化脚本**：
   - `npm run trending` — 抓取 GitHub Trending 热门项目数据
   - `npm run google-trends` — 发现 Google 热搜关键词
   - `npm run gen-page` — 自动生成页面骨架代码
   - `npm run validate` — 校验页面数据完整性

---

## 四、你的操作手册

极细粒度的操作 SOP 在：

`/Users/chenfengyuan/Documents/hermes-code/seo-meeting-productivity-site/HERMES-ITERATION-GUIDE.md`

这份文档共 10 章，覆盖：

- 三条内容源的完整 SOP（Google 热搜 → AI 工具对比 → GitHub Trending）
- 自动化流水线主流程
- 内容质量检查清单
- Sprint 1-3 执行指引（含具体页面列表）
- 变现配置指引（affiliate 链接嵌入方式）
- 常见问题排查

**请仔细阅读这份操作手册后再开始工作。** 这是你日常执行的核心参考文档。

---

## 五、职责边界

我们的分工很明确：

**你（Hermes）负责：**
- 内容创作（使用 `seo-content-writer` / `humanizer` / `social-writer` skill）
- SEO 运营优化（关键词布局、标题优化、内链策略）
- 流量数据分析与复盘
- 社交媒体推广内容生成
- Affiliate 链接配置与优化

**Qoder 负责：**
- 技术开发（新组件、新功能）
- 构建系统维护
- Bug 修复
- 自动化脚本升级

**如果你遇到技术问题**（构建失败、TypeScript 类型错误、组件渲染异常等），不要自己处理，告诉我，我会让 Qoder 来修。

---

## 六、立即行动清单

请按以下顺序开始：

1. **重新阅读 SOUL.md**（`/Users/chenfengyuan/.hermes/SOUL.md`），了解你的新身份定位
2. **阅读调研报告**（`/Users/chenfengyuan/Documents/hermes-code/seo-meeting-productivity-site/SEO-MONETIZATION-RESEARCH.md`），理解转型决策
3. **阅读执行计划**（`/Users/chenfengyuan/Documents/hermes-code/seo-meeting-productivity-site/AI-TOOLS-COMPARISON-PLAN.md`），掌握完整执行路线
4. **阅读操作手册**（`/Users/chenfengyuan/Documents/hermes-code/seo-meeting-productivity-site/HERMES-ITERATION-GUIDE.md`），掌握日常操作 SOP
5. **从 Phase 1 开始**：检查现有 5 个示例页面的内容质量，用 `humanizer` skill 优化文案
6. **运行热搜词发现**：`npm run google-trends --seed "ai tools,chatgpt,claude,copilot"` 获取最新热搜关键词
7. **运行趋势抓取**：`npm run trending` 获取 GitHub Trending 数据
8. **选题规划**：根据热搜数据和趋势数据，选择下一批要创建的页面
9. **按 SOP 执行**：创建新页面 → 校验 → 构建 → 部署

技术基建已经全部就绪，现在是你大展身手的时候了。开干吧！
