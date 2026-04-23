# SignalForges Design System

> 本文档是 Hermes 和所有开发者创建/修改页面时的设计标准参考。遵循这些规范可确保所有页面视觉一致、体验统一。

---

## 1. 设计原则

- **克制**：宁少勿多，去掉多余装饰，让内容成为焦点
- **层次**：通过背景深度创造空间感，帮助用户理解信息优先级
- **对齐**：卡片等高、网格整齐，确保扫一眼就能理解结构
- **呼吸**：充足留白，避免页面拥挤，提升可读性
- **一致**：统一的过渡、间距、字号，构建可预测的体验

---

## 2. 颜色系统

### 2.1 背景层级（从深到浅）

| 变量 | 值 | 用途 |
|-----|-----|------|
| `--color-bg-deepest` | `#0a0e1a` | 页面主背景 |
| `--color-bg` | `#0d1220` | 一般背景 |
| `--color-bg-alt` | `#101828` | 表格头、对比背景 |
| `--color-surface` | `#131a2e` | 卡片背景、浮动元素 |
| `--color-surface-hover` | `#182035` | surface hover 状态 |
| `--color-card` | `#182035` | 卡片默认背景 |
| `--color-card-hover` | `#1e2a42` | 卡片 hover 状态 |

**DO**: 在表格和列表中使用 `--color-bg-alt` 作为头部背景  
**DON'T**: 混淆 `--color-surface` 和 `--color-card`，两者视觉上相近但用途不同

### 2.2 文本色层级

| 变量 | 值 | 用途 |
|-----|-----|------|
| `--color-text-primary` | `#f8fafc` | 未使用（保留） |
| `--color-text-bright` | `#f8fafc` | H1/H2/标题文本 |
| `--color-text` | `#e2e8f0` | 正文内容 |
| `--color-text-secondary` | `#cbd5e1` | 次要内容 |
| `--color-text-muted` | `#94a3b8` | 描述文本、元数据 |
| `--color-text-dim` | `#64748b` | 禁用态、脚注 |

### 2.3 交互色

| 变量 | 值 | 用途 |
|-----|-----|------|
| `--color-primary` | `#3b82f6` | 主操作色（按钮、链接） |
| `--color-primary-dark` | `#2563eb` | 按钮渐变终点 |
| `--color-primary-light` | `#60a5fa` | 亮色文本、链接 hover |
| `--color-accent` | `#8b5cf6` | 评分色、标签背景 |

**DO**: 按钮渐变使用 `primary` 到 `primary-dark`  
**DON'T**: 直接使用色值，改为使用 CSS 变量

### 2.4 语义色

| 变量 | 值 | 用途 |
|-----|-----|------|
| `--color-success` | `#22c55e` | 成功状态、正面指标 |
| `--color-warning` | `#eab308` | 警告态 |
| `--color-error` | `#ef4444` | 错误态、负面指标 |
| `--color-info` | `#06b6d4` | 信息提示 |

### 2.5 边框色

| 变量 | 值 | 用途 |
|-----|-----|------|
| `--color-border` | `rgba(148, 163, 184, 0.12)` | 默认边框（卡片、表格） |
| `--color-border-hover` | `rgba(148, 163, 184, 0.2)` | hover 时边框加深 |
| `--color-border-focus` | `rgba(59, 130, 246, 0.5)` | focus 状态边框 |

---

## 3. 排版系统

### 3.1 字号阶梯

| 变量 | 值 | 用途 |
|-----|-----|------|
| `--text-xs` | 12px | 标签、脚注 |
| `--text-sm` | 14px | 表格单元、小文本 |
| `--text-base` | 16px | 正文基准 |
| `--text-lg` | 18px | 介绍段、次级标题 |
| `--text-xl` | 20px | 大介绍 |
| `--text-2xl` | 24px | H2 标题 |
| `--text-3xl` | 30px | H2 响应式 |
| `--text-4xl` | 36px | H1 响应式 |
| `--text-5xl` | 48px | H1 基准 |

### 3.2 字体栈

| 变量 | 字体栈 |
|-----|--------|
| `--font-sans` | Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif |
| `--font-mono` | Fira Code, Consolas, monospace |

### 3.3 字重与行高

| 变量 | 值 | 用途 |
|-----|-----|------|
| `--font-normal` | 400 | 正文 |
| `--font-medium` | 500 | 强调 |
| `--font-semibold` | 600 | 小标题 |
| `--font-bold` | 700 | 标题 |
| `--font-extrabold` | 800 | H1 特效 |
| `--leading-tight` | 1.1 | 紧凑标题 |
| `--leading-snug` | 1.25 | 小标题 |
| `--leading-normal` | 1.5 | 列表、表格 |
| `--leading-relaxed` | 1.625 | 介绍文本 |
| `--leading-loose` | 1.75 | 正文段落 |

**例子**：
- H1：`font-size: 2.5rem; font-weight: 800; line-height: 1.15; letter-spacing: -0.03em;`
- H2：`font-size: 1.75rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em;`
- 正文：`font-size: 1rem; font-weight: 400; line-height: 1.625;`

---

## 4. 间距系统

### 4.1 基准单位

基准单位为 **8px**，所有间距都基于此倍数：

| 变量 | 值 | 像素 |
|-----|-----|------|
| `--space-0` | 0 | 0px |
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-5` | 1.25rem | 20px |
| `--space-6` | 1.5rem | 24px |
| `--space-8` | 2rem | 32px |
| `--space-10` | 2.5rem | 40px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-20` | 5rem | 80px |

### 4.2 组件内间距

- **卡片内边距**：`--space-6` (24px)
- **紧凑卡片内边距**：`--space-4` (16px)
- **表格单元内边距**：`--space-3` 竖向 x `--space-4` 横向
- **按钮内边距**：`--space-3` 竖向 x `--space-5` 横向

### 4.3 组件间间距

- **同行内元素间距**：`--space-3` ~ `--space-5`
- **卡片网格间距**：`--space-4` (16px)
- **大网格间距**：`--space-5` ~ `--space-6`

### 4.4 章节间间距

- **章节上边距**：`margin-top: 3rem` (48px)
- **章节内边距**：`padding-top: 2rem` (32px)
- **章节下边距**：由下一章节的上边距提供
- **hero 章节**：`padding: 4rem 0 2rem`

---

## 5. 过渡动画

### 5.1 过渡时间令牌

| 变量 | 时间 | 用途 |
|-----|------|------|
| `--transition-fast` | 100ms ease | 微妙交互（颜色变化） |
| `--transition-base` | 150ms ease | 标准交互（卡片、按钮） |
| `--transition-slow` | 200ms ease-out | 较大变化 |
| `--transition-spring` | 300ms cubic-bezier(0.34, 1.56, 0.64, 1) | 弹性进入 |

**DO**: 大多数交互使用 `--transition-base`  
**DON'T**: 使用超过 300ms 的过渡时间

### 5.2 Hover 规范

**卡片 Hover**：
```css
.card:hover {
  border-color: rgba(125, 211, 252, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(2, 6, 23, 0.35);
}
```
- 只改 border-color + 微妙阴影
- transform 最多 -1px（避免抖动）
- 过渡时间 150ms

**按钮 Hover**：
```css
.btn:hover {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}
```
- 使用 brightness() 或渐变变化
- 不改渐变方向或角度
- transform -1px

**链接 Hover**：
```css
a:hover {
  color: var(--color-primary);
}
```
- 仅改颜色

### 5.3 Focus 规范

```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  border-radius: 6px;
}
```
- outline 宽度 2px，颜色 `--color-border-focus`
- outline-offset 2px
- 适用于所有可交互元素

### 5.4 prefers-reduced-motion

所有组件应包含：
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
  .component:hover {
    transform: none;
  }
}
```

---

## 6. 组件规范

### 6.1 ToolRatingCard（工具评分卡）

**结构**：avatar + name + rating → summary → pros/cons → pricing → CTA

**布局**：
- flex column，height: 100%，确保等高
- 底部 CTA 区使用 `margin-top: auto` 对齐
- 网格：3 个工具用 3 列，2 个用 2 列，移动端 1 列

**样式细节**：
```css
.tool-rating-card {
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.5rem;
  background: var(--color-panel);
}

.tool-rating-card:hover {
  border-color: rgba(125, 211, 252, 0.3);
  transform: translateY(-1px);
}

.tool-summary {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-bottom {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
```

**DO**：
- 评分星号使用 gradient 渐变填充，支持小数评分
- pros/cons 列表用 flex，间距 0.375rem
- logo 56x56px，border-radius 14px
- 价格小字（0.8rem），CTA 全宽

**DON'T**：
- 不在摘要中换行显示超过 2 行
- 不改卡片边框厚度
- 不为每个工具使用不同的宽度

### 6.2 ComparisonTable（对比表格）

**评分条**：
```css
.rating-bar {
  height: 6px;
  border-radius: 3px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}
```
- 高度 6px，border-radius 3px
- 内阴影增加深度
- 宽度基于 rating / 10

**表头**：
- 大写字母，font-size 0.8rem，font-weight 600
- 背景 `--color-bg-alt`
- 粘性头部（sticky）

**移动端**：
- 切换为卡片视图（max-width: 900px）
- 每个工具一张卡片
- 维度显示为标签+值对

**行 Hover**：
```css
tbody tr:hover td {
  background: rgba(59, 130, 246, 0.04);
}
```

**DO**：
- 使用 min-width 控制尺度
- 评分色：9+ 品牌色，7-8 绿色，4-6 黄色，<4 红色
- 文本和数值独立对齐

**DON'T**：
- 不使用竖向线条分割列
- 不改表格 border-collapse

### 6.3 PricingComparison（价格对比表）

**Best For 列**：
- 普通文字样式（0.85rem），不用 badge/pill
- 最多显示 120 字

**高亮行**：
```css
tr.highlighted {
  border-left: 3px solid var(--color-primary);
  background: rgba(59, 130, 246, 0.04);
}
```
- 左侧蓝色边框 3px
- 微妙背景色

**表格**：
- `table-layout: fixed` 确保列宽固定
- 列宽比例：Tool 14% / Free 18% / Pro 22% / Enterprise 22% / Best For 24%

**DO**：
- 表头全大写，letter-spacing 0.04em
- 空值显示为 "—"（em dash）
- 手机端改为卡片网格

**DON'T**：
- 不使用多排表头
- 不改列宽比例

### 6.4 UseCaseRecommender（场景推荐）

**网格**：
- 默认 2 列，移动端 1 列（max-width: 900px）
- 间距 1.25rem

**卡片**：
```css
.usecase-card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.5rem;
}

.usecase-card:hover {
  border-color: rgba(125, 211, 252, 0.25);
}
```

**文本**：
- 图标：1.75rem 字体大小
- 场景标题：1.15rem / 700
- 推荐工具名：品牌色 `--color-primary-light`
- 原因：0.875rem / muted 色

**DO**：
- 场景标题 ≤ 40 字符
- 原因 ≤ 100 字符，1-2 句

**DON'T**：
- 不用 badge 样式标记工具名
- 不超过 4-5 个场景卡片

### 6.5 RelatedComparisons（内链导航）

**设计**：
- 纯色背景（`--color-surface`）
- 箭头 "→" 1.2rem 字体，颜色 `--color-primary-light`

**Hover 效果**：
```css
.related-card:hover .related-arrow {
  transform: translateX(4px);
}
```
- 箭头 hover 时右移 4px
- 过渡时间 150ms

**布局**：
- 2 列网格，间距 1rem
- 移动端 1 列
- 卡片内部 flex 对齐内容和箭头

**文本截断**：
- 标题 1.05rem / 600
- 描述自动截断到 120 字符 + "..."

**DO**：
- 只展示 relatedSlugs 中存在的页面
- 隐藏当前页面（currentSlug）

**DON'T**：
- 不显示超过 4 个相关页面

---

## 7. 页面模板规范

### 7.1 页面结构（[slug].astro）

```
Article Header
├── Breadcrumb + Meta
├── Title (H1 渐变)
├── Description
└── CTA Buttons

Table of Contents (侧边栏，仅桌面)

Article Content
├── Introduction
├── Content Sections (循环)
│   ├── Section Heading + Number
│   ├── Content (paragraphs/bullets/cards/table/special)
│   └── Divider
├── FAQ Section (可选)
├── Monetization Box
├── Related Comparisons (组件)
└── Related Articles (网格)

Footer
```

### 7.2 H1 样式

```css
.article-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  background: linear-gradient(180deg, #f8fafc 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

- 渐变文字效果（上亮下暗）
- 响应式：768px 以下改为 1.75rem 普通色
- 最大宽度 20ch 避免超长

**DO**：
- 使用渐变线性从上到下
- 响应式下取消渐变效果

**DON'T**：
- 不使用其他渐变方向
- 不超过 60 字符

### 7.3 章节间距

```css
.content-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--color-border);
}

.section-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
```

- 章节上间距 3rem（48px）
- 标题下内边距 0.75rem，下边线 2px
- 号码背景使用品牌渐变
- 号码宽高 32px，border-radius 8px

### 7.4 内容最大宽度

| 变量 | 值 | 用途 |
|-----|-----|------|
| `--max-width` | 1280px | 完整页宽 |
| `--max-width-narrow` | 860px | 较窄内容 |
| `--max-width-content` | 720px | 文章正文 |

- 文章内容使用 `content-width` (720px)
- 左侧导航固定定位，距离页面左边 calc((100vw - 1280px) / 2 - 280px)

---

## 8. 响应式断点

### 8.1 主要断点

| 断点 | 范围 | 特性 |
|-----|-----|------|
| Desktop | > 1024px | 完整布局，侧边栏 TOC |
| Tablet | 768px - 1024px | 1 列布局，隐藏 TOC |
| Mobile | 640px - 768px | 堆叠卡片，缩小字号 |
| Small Mobile | < 640px | 最小化间距 |

### 8.2 关键样式变化

**1024px 以下**：
```css
@media (max-width: 1024px) {
  .toc-sidebar {
    display: none;
  }
  .hero-grid,
  .footer-grid,
  .tool-cards-grid {
    grid-template-columns: 1fr;
  }
}
```

**768px 以下**：
```css
@media (max-width: 768px) {
  h1 {
    font-size: 1.875rem;
    -webkit-text-fill-color: unset;
    background: none;
  }
  .article-title {
    font-size: 1.75rem;
  }
  .btn,
  .button {
    width: 100%;
  }
}
```

**640px 以下**：
```css
@media (max-width: 640px) {
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  .meta-separator {
    display: none;
  }
  .site-nav a {
    padding-left: 0;
  }
}
```

**特殊表格处理**（900px）：
```css
@media (max-width: 900px) {
  .comparison-wrapper.desktop-view {
    display: none;
  }
  .comparison-wrapper.mobile-view {
    display: flex;
    flex-direction: column;
  }
}
```

---

## 9. 数据规范（给 Hermes 的内容约束）

### 9.1 文本长度限制

| 字段 | 限制 | 备注 |
|-----|------|------|
| 页面标题 (`title`) | ≤ 60 字符 | SEO 友好 |
| 页面描述 (`description`) | ≤ 155 字符 | Meta description |
| 工具摘要 (`summary`) | ≤ 120 字符 | 2 行内显示 |
| Pros/Cons | ≤ 50 字符/条 | 最多 4-5 条 |
| 价格文字 (`pricing`) | ≤ 40 字符 | 建议格式 "From $XX/mo" |
| CTA 文字 | ≤ 20 字符 | 例："Explore Tool" |
| 介绍段 (`intro`) | 1-3 段，每段 ≤ 200 字符 | 首段优先 |
| 章节标题 (`heading`) | ≤ 80 字符 | 清晰简洁 |

### 9.2 FAQ 规范

- **问题数量**：至少 3 个，最多 8 个
- **问题**：简短直接，≤ 80 字符
- **答案**：2-4 句话，≤ 300 字符
- **格式**：使用 `<details>` 元素可折叠显示

**DO**：
```json
{
  "question": "Which tool is best for team meetings?",
  "answer": "Claude excels at summarizing discussions. For detailed transcripts, use Otter.ai. Both integrate well with Slack."
}
```

**DON'T**：
```json
{
  "question": "Tell me all about the different meeting tools and their features and how to use them?",
  "answer": "There are many tools..."
}
```

### 9.3 工具卡片数据规范

```json
{
  "name": "Tool Name",
  "rating": 4.5,
  "summary": "Short summary ≤ 120 chars",
  "pros": ["Benefit 1", "Benefit 2"],
  "cons": ["Limitation 1"],
  "pricing": "From $20/mo",
  "ctaLabel": "Visit Site",
  "ctaUrl": "https://example.com",
  "logo": "path/to/logo.png"
}
```

### 9.4 Slug 格式规范

- **小写字母 + 连字符**：`best-ai-meeting-assistants`
- **不包含下划线或空格**
- **3-5 个单词**：`ai-tool-comparison` 而不是 `ai` 或 `ai-meeting-tool-comparison-guide`
- **避免时间戳**：不使用日期后缀

### 9.5 Related Slugs 规范

- 只引用已存在的页面 slug
- 最多 4 个相关页面
- 不包含当前页面 slug

---

## 10. 阴影系统

| 变量 | 值 | 用途 |
|-----|-----|------|
| `--shadow-sm` | 0 1px 2px rgba(0, 0, 0, 0.3) | 微妙阴影 |
| `--shadow-md` | 0 4px 6px rgba(0, 0, 0, 0.4) | 按钮默认 |
| `--shadow-lg` | 0 10px 15px rgba(0, 0, 0, 0.5) | 卡片 hover |
| `--shadow-xl` | 0 20px 25px rgba(0, 0, 0, 0.6) | 模态框 |
| `--shadow-glow` | 0 0 20px rgba(59, 130, 246, 0.3) | 品牌光晕 |

---

## 11. Border Radius 标准

| 变量 | 值 | 用途 |
|-----|-----|------|
| `--radius-sm` | 6px | 输入框、小元素 |
| `--radius-md` | 8px | 按钮、标签 |
| `--radius-lg` | 12px | 卡片、表格 |
| `--radius-xl` | 16px | 大卡片、面板 |
| `--radius-2xl` | 24px | 特殊组件 |
| `--radius-full` | 9999px | 完全圆形 |

---

## 12. 新页面创建 Checklist

在提交新页面前，请完成以下检查：

### 内容检查
- [ ] 页面标题 ≤ 60 字符
- [ ] Meta 描述 ≤ 155 字符
- [ ] 工具摘要 ≤ 120 字符（2 行内）
- [ ] 每条 Pros/Cons ≤ 50 字符，最多 4-5 条
- [ ] 价格格式：`From $XX/mo` 或 `$XX-YY/mo`
- [ ] CTA 文字 ≤ 20 字符
- [ ] FAQ 至少 3 个问题，最多 8 个

### 技术检查
- [ ] Slug 格式小写字母+连字符（`example-slug`）
- [ ] relatedSlugs 引用已存在的页面
- [ ] aiToolMeta 完整填写（或为空）
- [ ] 所有图片路径有效
- [ ] no-break 空格用于数字+单位

### 构建检查
- [ ] `npm run build` 成功（无错误）
- [ ] 构建产物 dist/ 中包含页面
- [ ] 本地预览无样式错误
- [ ] 响应式测试（移动/平板/桌面）
- [ ] 无控制台错误或警告

### 可访问性检查
- [ ] 所有图片有 alt 文本
- [ ] 标题层级正确（H1 → H2 → H3）
- [ ] 链接文本有意义（避免 "Click here"）
- [ ] 按钮和链接可 Tab 聚焦
- [ ] 颜色对比充分（WCAG AA）

### SEO 检查
- [ ] canonical 正确指向页面 URL
- [ ] 结构化数据（Schema.org）有效
- [ ] 关键词均匀分布（避免堆砌）
- [ ] 内链指向其他相关页面

---

## 13. 常见模式

### 按钮组合

```html
<div class="cta-row">
  <a href="#" class="btn btn-primary">Primary Action</a>
  <button class="btn btn-secondary">Secondary Action</button>
</div>
```

**桌面**：并排显示  
**移动**：全宽堆叠

### 卡片网格

```html
<div class="card-grid three-up">
  <!-- cards -->
</div>
```

- `three-up`：3 列（min 280px），自适应到 1 列
- `two-up`：2 列（min 320px），自适应到 1 列

### 特殊表格行

```html
<tr class="highlighted">
  <td>...</td>
</tr>
```

添加蓝色左边框和背景色强调重要行

### 工具卡片网格

```css
.tool-cards-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.tool-cards-grid:has(> :nth-child(2):last-child) {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

- 3 个工具：3 列
- 2 个工具：2 列
- 1 个工具：1 列
- 移动端：始终 1 列

---

## 14. 快速参考

### 最常用变量

```css
/* 背景 */
background: var(--color-card);
background: var(--color-surface);

/* 文本 */
color: var(--color-text);
color: var(--color-text-muted);

/* 边框 */
border: 1px solid var(--color-border);
border-color: var(--color-border-hover);

/* 间距 */
padding: var(--space-4);
gap: var(--space-3);
margin-top: var(--space-6);

/* 圆角 */
border-radius: var(--radius-lg);

/* 过渡 */
transition: all var(--transition-base);

/* 阴影 */
box-shadow: var(--shadow-md);
```

### 典型卡片样式

```css
.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-base);
}

.card:hover {
  background: var(--color-card-hover);
  border-color: var(--color-border-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}
```

---

## 15. 资源清单

- **全局样式**：`src/styles/global.css`
- **页面模板**：`src/pages/pages/[slug].astro`
- **基础布局**：`src/layouts/BaseLayout.astro`
- **组件**：
  - `src/components/ai-tools/ToolRatingCard.astro`
  - `src/components/ai-tools/ComparisonTable.astro`
  - `src/components/ai-tools/PricingComparison.astro`
  - `src/components/ai-tools/UseCaseRecommender.astro`
  - `src/components/ai-tools/RelatedComparisons.astro`

---

**版本** 1.0 | **更新于** 2026-04-24 | **维护者** SignalForges Team
