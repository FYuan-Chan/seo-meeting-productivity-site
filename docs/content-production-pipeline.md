# GitHub Trending 内容生产标准流程

## 核心原则

**你不是摘要 GitHub Trending，而是为 AI 学习者和技术创业者判断今日热点。**

## 完整流水线

```text
github-trending-analyst (选题判断 + 数据采集)
    ↓
news-analysis-writer (新闻分析 + 趋势判断)
    ↓
article-writer (深度写作 + 架构分析)
    ↓
seo-content-writer (SEO优化 + 结构化)
    ↓
humanizer (去除AI味 + 真人感)
    ↓
final QA (质量检查 + 发布)
```

## 第一步：github-trending-analyst

### 数据采集

1. **抓取GitHub Trending数据**
   ```bash
   cd ~/Documents/hermes-code/seo-meeting-productivity-site
   npx tsx scripts/fetch-trending.ts --period daily
   ```

2. **获取每个repo的详细信息**
   - repo name、stars、stars today、language、description
   - README摘要（前500字符）
   - 最近commit时间
   - issues/PR活跃度
   - 作者背景

3. **保存到数据文件**
   ```json
   {
     "date": "2026-04-27",
     "repos": [
       {
         "fullName": "mattpocock/skills",
         "stars": 15000,
         "todayStars": 2519,
         "language": "Shell",
         "description": "Agent Skills for real engineers...",
         "readmeSummary": "...",
         "lastCommit": "2 hours ago",
         "openIssues": 12,
         "authorType": "individual",
         "authorBackground": "Matt Pocock - TypeScript expert"
       }
     ]
   }
   ```

### 选题判断

对每个repo回答：

| 问题 | 判断标准 |
|------|----------|
| **值得写吗？** | stars today > 500？有实际用途？ |
| **为什么火？** | 作者知名？解决痛点？时机好？ |
| **什么趋势？** | AI Agent？开发工具？安全？学习？ |
| **初学者怎么学？** | 有文档？有教程？有社区？ |
| **该用吗？** | 成熟度？风险？替代方案？ |
| **噪音还是信号？** | 持续增长？一次性上榜？ |

### 输出

```markdown
## 今日选题判断

### 推荐深入分析（2-3个）
1. **mattpocock/skills** (+2,519 stars)
   - 角度：AI Agent Skills正在变成新的插件生态
   - 理由：作者知名、解决真实痛点、有实际用处
   
2. **build-your-own-x** (+1,075 stars)
   - 角度：AI时代，基础知识比以往更重要
   - 理由：经典项目、教育价值高、长期趋势

### 了解即可（2-3个）
- free-claude-code：可能违反服务条款
- hackingtool：适合入门，专业人士用Kali

### 不推荐分析
- 无
```

## 第二步：news-analysis-writer

### 核心任务

用新闻分析框架写文章：

1. **What happened** - 发生了什么
2. **Why it matters** - 为什么重要
3. **What this means for you** - 对你意味着什么

### 文章结构

```markdown
# [具体角度]

**一句话总结**：[值不值得看]

---

## 发生了什么

[具体数据、repo表格、GitHub链接]

---

## 为什么重要

[技术趋势、行业背景、为什么火]

---

## 对你意味着什么

[初学者怎么学、开发者该不该用、具体建议]

---

## 数据来源

[完整数据表格、来源说明]
```

### 强制要求

- ✅ 必须有repo表格（名称、stars、增长、语言、推荐度）
- ✅ 必须有GitHub链接
- ✅ 必须有具体数字
- ❌ 不能有空泛词（significant、landscape、ecosystem）
- ❌ 不能没有证据的判断

## 第三步：article-writer

### 核心任务

把分析写成深度文章：

1. **架构分析** - 技术原理、设计思路
2. **Trade-off** - 优缺点、适用场景
3. **代码示例** - 实际可运行的代码
4. **学习路径** - 初学者怎么学

### 文章增强

- 添加代码示例（安装、使用、配置）
- 添加对比分析（vs同类工具）
- 添加踩坑指南（常见问题、解决方案）
- 添加个人见解（犀利观点、明确判断）

### 输出标准

- 文章长度：1500-3000字
- 代码示例：至少3个
- 明确判断：推荐/不推荐/谨慎使用
- 可执行建议：今天/这周/这月

## 第四步：seo-content-writer

### 核心任务

优化SEO，但不主导内容：

1. **标题优化** - 包含关键词，吸引点击
2. **Meta description** - 160字符以内，包含核心信息
3. **FAQ** - 3-5个常见问题
4. **内链** - 链接到相关文章
5. **关键词** - 自然分布，不堆砌

### 注意

- SEO只能放在后面，不能主导文章
- 不能为了SEO牺牲内容质量
- 不能堆砌关键词
- 不能写"SEO垃圾页"

## 第五步：humanizer

### 核心任务

去除AI味，让文章像真人写的：

1. **删除空泛词**
   - significant, landscape, ecosystem, key findings
   - "This represents a shift in..."
   - "The broader implications are..."

2. **添加个人色彩**
   - "我试用了X，发现..."
   - "说实话，我不太看好Y，因为..."
   - "如果你是初学者，建议从Z开始"

3. **使用自然语言**
   - 短句为主
   - 口语化表达
   - 避免学术腔

### 检查清单

- [ ] 是否像真人技术编辑写的？
- [ ] 是否有个人观点和判断？
- [ ] 是否避免了"AI味"表达？
- [ ] 是否读起来自然流畅？

## 第六步：final QA

### 质量检查清单

#### 内容质量
- [ ] 是否回答了6个核心问题？
- [ ] 是否有repo表格和GitHub链接？
- [ ] 是否有具体数字（stars、日期、长度）？
- [ ] 是否有代码示例？
- [ ] 是否有明确判断（推荐/不推荐）？
- [ ] 是否有可执行建议（今天/这周/这月）？

#### 技术质量
- [ ] Markdown格式正确？
- [ ] 代码示例可运行？
- [ ] 链接可点击？
- [ ] 表格清晰？

#### SEO质量
- [ ] 标题吸引人？
- [ ] Meta description准确？
- [ ] FAQ有帮助？
- [ ] 内链合理？

#### 网站质量
- [ ] 页面可访问？
- [ ] 渲染正确？
- [ ] 移动端适配？
- [ ] 加载速度快？

## 每日执行流程

### 早上 8:00 - 数据采集
```bash
cd ~/Documents/hermes-code/seo-meeting-productivity-site
npx tsx scripts/fetch-trending.ts --period daily
```

### 早上 8:30 - 选题判断
- 运行github-trending-analyst
- 输出：今日选题判断文档

### 早上 9:00 - 内容生产
- 运行news-analysis-writer
- 运行article-writer
- 输出：深度文章草稿

### 早上 10:00 - SEO优化
- 运行seo-content-writer
- 输出：SEO优化文章

### 早上 10:30 - 润色和QA
- 运行humanizer
- 运行final QA
- 输出：发布就绪文章

### 早上 11:00 - 发布
- 添加到网站数据源
- 构建网站
- 部署到Cloudflare Pages

## 示例：完整流程输出

### 输入
```
今日GitHub Trending：
1. mattpocock/skills (+2,519 stars)
2. Z4nzu/hackingtool (+1,720 stars)
3. free-claude-code (+1,701 stars)
```

### github-trending-analyst 输出
```
选题判断：
- mattpocock/skills：值得深入分析（作者知名、解决真实痛点）
- free-claude-code：了解即可（有风险）
- hackingtool：了解即可（适合入门）
```

### news-analysis-writer 输出
```
角度：AI Agent Skills正在变成新的插件生态
核心内容：mattpocock/skills是什么、为什么火、怎么用
```

### article-writer 输出
```
深度文章：
- 架构分析：23个技能的设计思路
- 代码示例：安装、使用、配置
- 对比分析：vs其他技能库
- 学习路径：初学者怎么开始
```

### seo-content-writer 输出
```
SEO优化：
- 标题：GitHub热点：AI Agent Skills正在变成新的插件生态
- Meta：mattpocock/skills深度分析，23个Claude技能，安装使用指南
- FAQ：3个常见问题
```

### humanizer 输出
```
润色后：
- 删除空泛词
- 添加个人见解
- 使用自然语言
```

### final QA 输出
```
质量检查通过，可以发布
```

## 关键成功因素

1. **严格按流程执行** - 不能跳过任何一步
2. **强制证据化** - 没有证据就别写判断
3. **明确选题判断** - 不是每个repo都值得写
4. **可执行建议** - 读者看完能做什么
5. **真人感** - 像技术编辑写的，不是AI生成的

## 常见错误

### ❌ 错误1：每个repo都写
**问题**：导致文章泛而不深
**解决**：先做选题判断，只写2-3个最值得的

### ❌ 错误2：复制README假装分析
**问题**：没有价值，读者自己能看README
**解决**：提供实际使用体验、优缺点分析、对比分析

### ❌ 错误3：标题很深正文很浅
**问题**：读者期望高，但内容达不到
**解决**：标题要准确反映内容，不能过度承诺

### ❌ 错误4：没有代码示例
**问题**：读者看完不知道怎么用
**解决**：必须提供可运行的代码示例

### ❌ 错误5：没有明确判断
**问题**：模棱两可，读者不知道该不该用
**解决**：必须明确推荐/不推荐/谨慎使用

## 总结

**核心理念**：你不是摘要GitHub Trending，而是为AI学习者和技术创业者判断今日热点。

**关键流程**：github-trending-analyst → news-analysis-writer → article-writer → seo-content-writer → humanizer → final QA

**成功标准**：读者看完能知道该用什么、怎么用、该不该用。