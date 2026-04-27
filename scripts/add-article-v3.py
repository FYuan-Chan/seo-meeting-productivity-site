#!/usr/bin/env python3
"""
添加GitHub Trending文章到网站（v3 - 高质量版本）
"""

import json
import re
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(__file__).parent.parent
SITE_DATA_FILE = PROJECT_ROOT / "src" / "lib" / "ai-tools-data.ts"

def escape_for_ts(text):
    """转义TypeScript字符串"""
    text = text.replace("\\", "\\\\")
    text = text.replace("'", "\\'")
    text = text.replace("\n", "\\n")
    return text

def add_article_v3():
    """添加v3版本的文章"""
    
    # 读取文章
    article_file = PROJECT_ROOT / "data" / "articles" / "github-trending-2026-04-27-v3.md"
    with open(article_file, "r") as f:
        content = f.read()
    
    # 读取现有数据
    with open(SITE_DATA_FILE, "r") as f:
        site_data = f.read()
    
    # 检查是否已存在
    slug = "github-trending-2026-04-27"
    if f"slug: '{slug}'" in site_data:
        print("⚠️ 页面已存在，需要先删除旧的")
        # 找到并删除旧的页面
        # 这里简化处理，直接添加新的slug
        slug = "github-trending-2026-04-27-v3"
    
    # 提取文章的关键段落
    paragraphs = []
    current_section = []
    
    for line in content.split("\n"):
        if line.startswith("## ") and current_section:
            paragraphs.append("\n".join(current_section[:10]))
            current_section = []
        elif not line.startswith("#"):
            current_section.append(line)
    
    if current_section:
        paragraphs.append("\n".join(current_section[:10]))
    
    # 创建页面数据
    new_page = f'''  {{
    slug: '{slug}',
    title: '今日GitHub热点：5个仓库，5个你需要知道的趋势',
    description:
      '2026-04-27 GitHub Trending深度分析：AI Agent工具链正在成型。mattpocock/skills、free-claude-code、build-your-own-x等热门仓库解析。',
    eyebrow: 'GitHub Trending',
    intro: [
      '今日GitHub Trending有13个仓库，总计+9,656 stars。核心趋势：AI Agent工具链正在从玩具变成工具。',
      '本文直接回答：这些项目解决什么问题？为什么火？哪些值得学？新手该先看哪个？',
    ],
    targetKeyword: 'github trending, ai agent tools, mattpocock skills, build your own x',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: '查看完整分析',
    ctaHref: 'https://github.com/trending',
    relatedSlugs: [
      'chatgpt-vs-claude',
      'best-ai-coding-tools',
      'github-copilot-vs-cursor',
    ],
    aiToolMeta: {{
      type: 'comparison',
      tools: ['GitHub', 'AI Agent', 'Developer Tools'],
      lastUpdated: '2026-04-27',
    }},
    sections: [
      {{
        type: 'paragraphs',
        heading: '先说结论',
        paragraphs: [
          '今天GitHub Trending有13个仓库，总计+9,656 stars。核心趋势只有一个：**AI Agent工具链正在从"玩具"变成"工具"**。',
          '具体表现：mattpocock/skills（Claude技能库，+2,519 stars）、free-claude-code（免费用Claude，+1,701 stars）、awesome-codex-skills（Codex技能集合，+517 stars）。',
          '这三个仓库代表了AI Agent的三层：**技能层、访问层、生态层**。',
        ],
      }},
      {{
        type: 'table',
        heading: '这5个仓库解决什么问题？',
        columns: ['仓库', '解决的问题', '一句话'],
        rows: [
          ['mattpocock/skills', '每次都要重新写提示词', '23个现成的Claude技能，直接用'],
          ['Z4nzu/hackingtool', '安全工具太多太分散', '一个命令行，集成几十个安全工具'],
          ['free-claude-code', 'Claude太贵', '不用API Key，免费用Claude Code'],
          ['build-your-own-x', '不理解底层原理', '从零实现Git/数据库/Docker，真正学会'],
          ['GitNexus', '大型代码库看不懂', '浏览器里生成知识图谱，AI回答代码问题'],
        ],
      }},
      {{
        type: 'paragraphs',
        heading: '为什么今天突然火？',
        paragraphs: [
          '**mattpocock/skills**：作者是Matt Pocock（TypeScript大神，Total TypeScript作者）。他把自己的真实工作流开源了。时机好：Claude Code用户正在找技能库。',
          '**free-claude-code**：Claude Code确实好用，但$20/月太贵。开发者想先体验再决定是否付费。项目找到了绕过付费墙的方法。',
          '**build-your-own-x**：不是今天突然火，是一直火。AI时代，理解底层原理更重要了。',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: '新手学习路径',
        paragraphs: [
          '**第1周**：mattpocock/skills - 安装：`npx skills@latest add mattpocock/skills/to-prd` - 目的：学会用AI辅助开发',
          '**第2-3周**：build-your-own-x（选一个） - 推荐：Build Your Own Git - 目的：理解版本控制底层原理',
          '**第4周**：GitNexus - 安装：`npx gitnexus analyze` - 目的：学会用AI理解代码库',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: '代码示例：怎么用？',
        paragraphs: [
          '**mattpocock/skills**：`npx skills@latest add mattpocock/skills/to-prd` - 安装单个技能。最有用的3个：to-prd（对话转PRD）、to-issues（PRD拆解成Issues）、code-review（代码审查）。',
          '**GitNexus**：`cd your-project && npx gitnexus analyze` - 分析你的仓库。使用场景：新员工入职、代码审查、技术债务识别。',
          '**build-your-own-x**：推荐新手从Build Your Own Shell（1-2天）开始，然后Build Your Own Git（3-5天）。',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: 'AI Agent三层架构',
        paragraphs: [
          '**技能层**（mattpocock/skills, awesome-codex-skills）：解决可复用的工作流问题。',
          '**访问层**（free-claude-code）：解决降低成本门槛问题。',
          '**工具层**（GitNexus, hackingtool）：解决具体场景的工具问题。',
          '这不是巧合，是**开发者正在构建完整的AI Agent基础设施**。',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: '我的判断',
        paragraphs: [
          '**值得投入时间的**：mattpocock/skills（如果你用Claude，必装）、build-your-own-x（基础知识永远不过时）、GitNexus（理解代码库是核心能力）。',
          '**了解即可的**：hackingtool（适合入门，专业人士用Kali）、free-claude-code（可能随时失效，不要依赖）。',
          '**关键洞察**：AI Agent不是未来，是现在。今天的仓库证明，AI Agent工具链正在成型。如果你现在不开始学习，半年后会落后。',
        ],
      }},
      {{
        type: 'paragraphs',
        heading: '下一步行动',
        paragraphs: [
          '**今天（5分钟）**：`npx skills@latest add mattpocock/skills/to-prd`',
          '**这周（2小时）**：看看build-your-own-x，选一个项目；用GitNexus分析一个你熟悉的仓库。',
          '**这个月（10小时）**：完成一个build-your-own-x项目；把mattpocock/skills整合到你的工作流；写博客分享你的学习。',
        ],
      }},
    ],
    faq: [
      {{ question: 'mattpocock/skills怎么安装？', answer: '运行 `npx skills@latest add mattpocock/skills/to-prd` 安装单个技能，或克隆仓库后复制到 ~/.claude/skills/ 目录。' }},
      {{ question: 'build-your-own-x新手从哪个开始？', answer: '推荐从Build Your Own Shell（1-2天）开始，然后Build Your Own Git（3-5天），最后Build Your Own Database（1-2周）。' }},
      {{ question: 'free-claude-code安全吗？', answer: '可能违反Anthropic服务条款，随时可能失效。建议仅用于体验，正式项目用官方付费方案。' }},
    ],
  }},'''
    
    # 添加到文件
    if "];" in site_data:
        last_bracket = site_data.rfind("];")
        before = site_data[:last_bracket].rstrip()
        
        if before.endswith(","):
            new_content = site_data[:last_bracket] + new_page + "\n" + site_data[last_bracket:]
        else:
            new_content = site_data[:last_bracket] + ",\n" + new_page + "\n" + site_data[last_bracket:]
        
        with open(SITE_DATA_FILE, "w") as f:
            f.write(new_content)
        
        print(f"✅ 成功添加文章: {slug}")
        return True
    
    return False

if __name__ == "__main__":
    add_article_v3()