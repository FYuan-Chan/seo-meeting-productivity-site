# SignalForges Design System v2.0 — Editorial

> v2.0 复位为"专业资讯站"风格：serif headlines、克制卡片、68ch 阅读宽度、明/暗主题、sticky TOC、⌘K 检索、归档导航。
> 本文档是 Hermes 和所有开发者创建 / 修改页面时的唯一设计标准。

---

## 0. 变更日志

- **2.0.0 (2026-05-10)** — 全局重构：
  - 新增 `tokens.css` 集中颜色 / 字号 / 字体 / elevation 变量。
  - 新增 `typography.css` editorial 文字工具（`.headline-display` `.dek` `.prose` `.eyebrow-caps` `.byline`）。
  - 引入三种 self-hosted 可变字体：Inter（sans / body）、Fraunces（serif display）、JetBrains Mono（code）。
  - 新增 light / dark 主题切换（`html[data-theme]` + `localStorage` + 无 FOUC inline script）。
  - 新增组件：`<SiteHeader>` `<SiteFooter>` `<ThemeToggle>` `<ReadingProgress>` `<SearchDialog>` `<ArticleCard>` `<CategoryChip>` `<HeroLead>` `<LatestGrid>` `<CategoryRail>` `<Masthead>` `<BylineMeta>` `<TableOfContents>` `<ShareBar>` `<PrevNext>`。
  - 新增 `src/lib/articles.ts`（排序 / 分组 / 上下篇 / 分类标签）。
  - 新增路由：`/archive/`、`/category/[category]/`、`/search.json`。
  - 文章页改为：Masthead + sticky TOC + intro lead + 章节（带 eyebrow + hairline）+ FAQ + PrevNext + Related。
  - 首页改为资讯站动线：Hero Lead（1 头条 + 2 次条）+ Latest 3×3 + Category Rails + Trust Center。
- **1.0.0** — 初版深色 SaaS 页风格（归档）。

---

## 1. 设计原则

- **克制胜装饰**：hairline 分隔优先于色块 section，让标题、正文成为视觉焦点。
- **三重字体层级**：serif display（Fraunces）用于 H1 / H2 头条，sans（Inter）用于 UI / 正文，mono（JetBrains Mono）用于代码。
- **阅读宽度**：正文段落限 `var(--measure)` = 68ch，行距 1.75。
- **主题中性**：所有组件同时支持 light / dark；色彩仅通过 tokens 表达，不使用硬编码。
- **渐进增强**：核心内容 / 导航 / FAQ / 归档无 JS 可用；搜索、TOC 高亮、Reading Progress、主题切换、Share Copy 都是可选增强。
- **降噪动效**：所有 `translate` `transition` 受 `prefers-reduced-motion` 控制。

---

## 2. Tokens

Token 实体定义见 `src/styles/tokens.css`，典型用法：

```css
background: var(--color-card);
color: var(--color-text);
border: 1px solid var(--color-border);
padding: var(--space-4);
gap: var(--space-3);
border-radius: var(--radius-lg);
transition: all var(--transition-base);
box-shadow: var(--elevation-2);
```

### 2.1 主题颜色

| Token                      | Dark 默认                        | Light                     |
| -------------------------- | -------------------------------- | ------------------------- |
| `--color-bg`               | `#0b1020`                        | `#ffffff`                 |
| `--color-bg-alt`           | `#101828`                        | `#f5f5f4`                 |
| `--color-surface`          | `#131a2e`                        | `#ffffff`                 |
| `--color-card`             | `#131a2e`                        | `#ffffff`                 |
| `--color-card-hover`       | `#1a2239`                        | `#fafafa`                 |
| `--color-text-bright`      | `#f8fafc`                        | `#0f172a`                 |
| `--color-text`             | `#e2e8f0`                        | `#1f2937`                 |
| `--color-text-muted`       | `#94a3b8`                        | `#6b7280`                 |
| `--color-text-dim`         | `#64748b`                        | `#9ca3af`                 |
| `--color-border`           | rgba(148,163,184,.14)            | rgba(15,23,42,.08)        |
| `--color-border-hover`     | rgba(148,163,184,.28)            | rgba(15,23,42,.16)        |
| `--color-primary`          | `#3b82f6`                        | `#1d4ed8`                 |
| `--color-accent`           | `#8b5cf6`                        | `#6d28d9`                 |
| `--color-success/warning/error` | green/yellow/red            | green/yellow/red          |

### 2.2 字体

| Token              | 值                                                                 | 用途              |
| ------------------ | ------------------------------------------------------------------ | ----------------- |
| `--font-sans`      | Inter Variable                                                     | UI / 正文         |
| `--font-serif` / `--font-display` | Fraunces Variable                                    | H1 / H2 / 头条卡  |
| `--font-mono`      | JetBrains Mono Variable                                            | inline code       |

### 2.3 Editorial 字号

| Token              | 值                                  | 用途               |
| ------------------ | ----------------------------------- | ------------------ |
| `--text-display-1` | clamp(2.25rem, 4vw + 1rem, 4rem)    | 文章 H1 / 首页头条 |
| `--text-display-2` | clamp(1.875rem, 3vw + 1rem, 3rem)   | 章节 H2            |
| `--text-headline`  | clamp(1.375rem, 1.5vw + 1rem, 2rem) | 卡片标题           |
| `--text-kicker`    | 0.75rem                             | eyebrow small-caps |

### 2.4 间距 / 圆角 / elevation

保持 v1.0 8px 基准 + `--radius-*`；elevation 从 `--elevation-0` 到 `--elevation-3` + `--elevation-glow`，资讯站风格以 elevation-1/2 为主。

---

## 3. 核心组件

### 3.1 ArticleCard

唯一的文章入口组件，`variant` prop 覆盖所有展示场景：

| variant   | 使用场景                  | 版式                                          |
| --------- | ------------------------- | --------------------------------------------- |
| `hero`    | 首页头条（1）             | serif display 标题 + 大 dek + meta             |
| `featured`| 首页次条（2）             | serif headline + 2 行 dek                      |
| `default` | Latest grid               | sans headline + 2 行 dek + meta                |
| `compact` | Category rail             | 紧凑 sans 标题 + meta                          |
| `row`     | Archive / Category list   | 一行横排：title + meta                         |

Props:

```ts
interface ArticleCardProps {
  page: SeoPage;
  variant?: 'hero' | 'featured' | 'default' | 'compact' | 'row';
  showDek?: boolean;
  showEyebrow?: boolean;
  showMeta?: boolean;
}
```

### 3.2 SiteHeader

sticky + backdrop-blur。grid: `brand / nav / actions`。搜索触发器（⌘K）+ 主题切换。< 768px 折叠为汉堡 `<details>`。

### 3.3 SiteFooter

4 栏：品牌 + Explore + Trust + 审计指标。底栏固定法律提示。

### 3.4 SearchDialog

- 原生 `<dialog>` + `showModal`。
- ⌘K / Ctrl+K 打开；Esc 关闭；↑↓ 导航；Enter 跳转。
- `GET /search.json` 生成索引；首次打开后懒加载。
- JS 禁用 → header 的 `/archive/` 链接兜底。

### 3.5 Masthead（文章页）

Breadcrumbs → CategoryChip → serif display H1（≤ 24ch）→ dek → BylineMeta（阅读时长 · 更新 · 来源数）→ ShareBar。

### 3.6 TableOfContents

- ≥ 1200px：sticky 侧栏，`IntersectionObserver` 高亮当前 section。
- < 1200px：Masthead 下方 `<details>`。
- 均基于同一 `items: { id, label }[]` 数据驱动。

### 3.7 ShareBar

Copy link（Clipboard API + execCommand fallback） · X · LinkedIn · Hacker News。Copy 成功 2 秒反馈。

### 3.8 ReadingProgress

顶部 3px 条，通过 `transform: scaleX(progress)` 更新。`prefers-reduced-motion` 时条仍渲染但不过渡。

### 3.9 PrevNext

文章末尾 grid 2 列：上一篇 / 下一篇。移动端堆叠。基于同 category 排序，fallback 到全量。

---

## 4. Typography 工具类（typography.css）

- `.headline-display` — 文章 H1（Fraunces，display-1）
- `.headline-2` — 章节标题（Fraunces，display-2）
- `.headline` / `.headline-sans` — 卡片 / 小标题
- `.dek` / `.dek--large` — 介绍段
- `.eyebrow-caps` / `.kicker` — small-caps 分类标签（可叠加 `.kicker--accent`）
- `.byline` / `.byline-item` — 文章 meta 行
- `.prose` — 正文容器（68ch + 1.75 行距）
- `.prose-lead` — 首段引导（略大、加粗、亮色）
- `.drop-cap` — 可选首字母大号

---

## 5. 布局规范

### 5.1 容器宽度

| Token / 类            | 宽度      | 用途                 |
| --------------------- | --------- | -------------------- |
| `.container`          | 1280px    | 完整页宽             |
| `.narrow`             | 860px     | 中等宽度             |
| `.content-width`      | 720px     | 文章正文、trust page |

### 5.2 文章页栅格

```
@media (min-width: 1200px) {
  .article-layout { grid-template-columns: 240px minmax(0, 1fr); }
}
```

TOC 固定左列 240px，正文右列；< 1200px 单列 + inline TOC。

### 5.3 Section 节奏

```
<section class="article-section" id="section-i">
  <header>
    <p class="eyebrow-caps">Section 01</p>
    <h2 class="headline-2">…</h2>
  </header>
  <div class="prose">…</div>
</section>
```

相邻 section 通过 `border-top` + `padding-top: var(--space-4)` 形成 hairline 分隔，替换 v1.0 的 2px heavy 线。

---

## 6. 路由地图

| 路径                       | 说明                                                    |
| -------------------------- | ------------------------------------------------------- |
| `/`                        | 首页（Hero + Latest + Rails + Trust）                   |
| `/pages/[slug]/`           | 文章页（白名单中 12 篇）                                 |
| `/archive/`                | 全量按年月归档                                           |
| `/category/[category]/`    | 分类归档（仅 ≥ 3 篇才生成）                              |
| `/[trustSlug]/`            | Trust Center（7 页）                                    |
| `/search.json`             | 客户端检索索引                                           |
| `/sitemap.xml`             | 白名单 + archive + category + trust                      |

---

## 7. 主题切换

- `<head>` 最早 inline script 从 `localStorage.signalforges-theme` 或 `prefers-color-scheme` 读取并写入 `data-theme`，避免 FOUC。
- `<ThemeToggle>` 点击切换后写入 `localStorage`；异常时静默回退系统偏好。
- 所有颜色值**不得**硬编码，一律走 tokens。

---

## 8. 可访问性

- 所有 `<a>` `<button>` `<summary>` `<input>` 均有 `:focus-visible` outline ring。
- H 级别不得跳跃：每页仅一个 H1（Masthead），H2 仅用于 section 标题，H3 卡片内。
- FAQ 使用 `<details>` / `<summary>` 原生展开，JS 禁用时同样可用。
- Skip link（`.skip-link`）在 focus 时浮现，指向 `#main-content`。
- 正文文字 vs 背景：≥ 4.5:1（light + dark 均已调校）。
- 所有 SVG 图标 `aria-hidden="true"`；含义由邻近文字提供。
- `prefers-reduced-motion` 降级：全局 transition 最小化，card hover 不抬升。

---

## 9. 约束与审计闸口

改版不破坏以下机制：

- `SeoPage` 数据契约与 `getAdsenseReviewPageEntries()` 白名单不变。
- `npm run validate`：白名单、FAQ、AI 元数据、公共链接、trust page。
- `npm run audit:content`：文章质量 JSON 报告。
- `npm test`：
  - BaseLayout 禁 `adsbygoogle` / `googlesyndication`；
  - 文章页禁 `AdPlaceholder` / `ad-section` / `monetization-box` / `Primary monetization` / `getReviewSchema` / `reviewRating`；
  - 所有白名单页 `EditorialQualityProfile` 完整。
- `npm run build`：Astro 静态输出。
- `npm run audit:recovery`：
  - sitemap 路径 = homepage + archive + archivable categories + trust + whitelisted articles，**顺序严格相等**（见 `recovery-audit.ts`）；
  - 任何 HTML 内的内部链接必须匹配到构建产物中的页面或资源；
  - 禁止包含阻断模式（AdSense 脚本、reviewRating、monetization-box 等）。

**新增路由时的必改清单：**

1. `scripts/recovery-audit.ts` → `expectedPublicPaths`（若静态路径）。
2. `src/pages/sitemap.xml.ts` → 对应条目。
3. `scripts/validate-pages.ts` → `validatePublicInternalLinks` `allowedPaths`（若要被文章内链引用）。

---

## 10. 内容规范（Hermes 输入约束）

| 字段                          | 限制                    |
| ----------------------------- | ----------------------- |
| `title`                       | ≤ 60 字符               |
| `description`                 | ≤ 155 字符              |
| `intro[0]`                    | ≤ 240 字符（lead 段）   |
| `sections[].heading`          | ≤ 80 字符               |
| `faq[]`                       | 3 ~ 8 条，answer ≤ 300 字 |
| `aiToolMeta.tools`            | 若分类为 ai-*，必填      |
| `aiToolMeta.lastUpdated`      | `YYYY-MM-DD` 或 `YYYY-MM` |
| `relatedSlugs`                | 只能引用白名单 slug      |

---

## 11. 常用代码片段

### 卡片基础

```html
<a class="article-card" href="/pages/x/">
  <span class="eyebrow-caps">AI Comparison</span>
  <h3 class="article-card-title">…</h3>
  <p class="article-card-dek">…</p>
  <p class="article-card-meta"><span>7 min read</span></p>
</a>
```

### 章节标题

```html
<section class="article-section" id="section-0">
  <header class="article-section-header">
    <p class="eyebrow-caps">Section 01</p>
    <h2 class="headline-2">…</h2>
  </header>
  <div class="prose">
    <p>…</p>
  </div>
</section>
```

### CategoryChip

```astro
<CategoryChip category={page.category} />
```

---

**版本** 2.0 | **更新于** 2026-05-10 | **维护者** SignalForges Team
