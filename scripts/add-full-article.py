#!/usr/bin/env python3
"""
将完整的 GitHub Trending 文章添加到网站

用法:
    python3 scripts/add-full-article.py --file data/articles/github-trending-daily-2026-04-27-english.md

输出:
    将完整文章内容添加到网站数据源
"""

import argparse
import re
from pathlib import Path
from datetime import datetime

# 配置
PROJECT_ROOT = Path(__file__).parent.parent
SITE_DATA_FILE = PROJECT_ROOT / "src" / "lib" / "ai-tools-data.ts"

def parse_markdown_article(file_path: Path) -> dict:
    """解析 Markdown 文章，提取结构化内容"""
    with open(file_path, "r") as f:
        content = f.read()
    
    # 提取标题
    title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
    title = title_match.group(1) if title_match else "GitHub Trending Daily Digest"
    
    # 提取描述（第一段）
    paragraphs = content.split('\n\n')
    description = ""
    for p in paragraphs:
        if p.strip() and not p.startswith('#'):
            description = p.strip()[:160]  # 限制长度
            break
    
    # 提取主要章节
    sections = []
    current_section = None
    
    for line in content.split('\n'):
        if line.startswith('## '):
            if current_section:
                sections.append(current_section)
            current_section = {
                "heading": line[3:].strip(),
                "content": []
            }
        elif current_section and line.strip():
            current_section["content"].append(line)
    
    if current_section:
        sections.append(current_section)
    
    return {
        "title": title,
        "description": description,
        "sections": sections,
        "full_content": content
    }

def create_article_page(article_data: dict, slug: str) -> dict:
    """创建文章页面数据"""
    # 构建 sections 数组
    sections = []
    
    # 添加简介部分
    sections.append({
        "type": "paragraphs",
        "heading": "Introduction",
        "paragraphs": [
            article_data["description"],
            "This analysis is based on real-time GitHub Trending data, providing insights into what's capturing developers' attention right now."
        ]
    })
    
    # 添加主要章节（取前3个）
    for section in article_data["sections"][:3]:
        if len(section["content"]) > 0:
            # 组合内容段落
            paragraphs = []
            for line in section["content"]:
                if line.strip() and not line.startswith('#'):
                    paragraphs.append(line.strip())
            
            if paragraphs:
                sections.append({
                    "type": "paragraphs",
                    "heading": section["heading"],
                    "paragraphs": paragraphs[:5]  # 限制段落数
                })
    
    # 添加 FAQ
    faq = [
        {
            "question": "What is GitHub Trending?",
            "answer": "GitHub Trending is a排行榜 that shows the most popular repositories on GitHub right now, based on stars, forks, and activity."
        },
        {
            "question": "How often is GitHub Trending updated?",
            "answer": "GitHub Trending is updated daily, showing repositories that are gaining stars and attention in real-time."
        },
        {
            "question": "How can I use GitHub Trending for my projects?",
            "answer": "Use GitHub Trending to discover new tools, learn about emerging technologies, and understand what the developer community is excited about."
        }
    ]
    
    return {
        "slug": slug,
        "title": article_data["title"],
        "description": article_data["description"],
        "eyebrow": "GitHub Trending Analysis",
        "intro": [
            article_data["description"][:200] + "...",
            "Deep analysis of today's hottest open-source projects and emerging developer trends."
        ],
        "targetKeyword": "github trending, open source trends, developer tools, ai agents",
        "category": "github-trending",
        "monetizationPrimary": "ads",
        "ctaLabel": "Explore GitHub Trending",
        "ctaHref": "https://github.com/trending",
        "relatedSlugs": [
            "chatgpt-vs-claude",
            "best-ai-coding-tools",
            "github-copilot-vs-cursor"
        ],
        "aiToolMeta": {
            "type": "comparison",
            "tools": ["GitHub", "Open Source", "Developer Tools", "AI Agents"],
            "lastUpdated": datetime.now().strftime("%Y-%m-%d")
        },
        "sections": sections,
        "faq": faq
    }

def escape_for_typescript(text: str) -> str:
    """转义字符串以用于 TypeScript"""
    # 转义单引号
    text = text.replace("\\", "\\\\")
    text = text.replace("'", "\\'")
    text = text.replace("\n", "\\n")
    text = text.replace("\r", "\\r")
    text = text.replace("\t", "\\t")
    return text

def add_article_to_site(page_data: dict) -> bool:
    """将文章添加到网站"""
    try:
        # 读取现有数据
        with open(SITE_DATA_FILE, "r") as f:
            content = f.read()
        
        # 检查是否已存在
        if f"slug: '{page_data['slug']}'" in content:
            print(f"⚠️ 页面已存在: {page_data['slug']}")
            return False
        
        # 构建 sections 代码
        sections_code = ""
        for section in page_data["sections"]:
            if section["type"] == "paragraphs":
                paragraphs_code = ""
                for p in section["paragraphs"]:
                    paragraphs_code += f"          '{escape_for_typescript(p)}',\n"
                
                sections_code += f'''      {{
        type: 'paragraphs',
        heading: '{escape_for_typescript(section["heading"])}',
        paragraphs: [
{paragraphs_code}        ],
      }},
'''
        
        # 构建 FAQ 代码
        faq_code = ""
        for item in page_data["faq"]:
            faq_code += f"      {{ question: '{escape_for_typescript(item['question'])}', answer: '{escape_for_typescript(item['answer'])}' }},\n"
        
        # 创建新页面代码
        new_page_code = f'''  {{
    slug: '{page_data["slug"]}',
    title: '{escape_for_typescript(page_data["title"])}',
    description:
      '{escape_for_typescript(page_data["description"])}',
    eyebrow: '{escape_for_typescript(page_data["eyebrow"])}',
    intro: [
      '{escape_for_typescript(page_data["intro"][0])}',
      '{escape_for_typescript(page_data["intro"][1])}',
    ],
    targetKeyword: '{escape_for_typescript(page_data["targetKeyword"])}',
    category: '{page_data["category"]}',
    monetizationPrimary: '{page_data["monetizationPrimary"]}',
    ctaLabel: '{page_data["ctaLabel"]}',
    ctaHref: '{page_data["ctaHref"]}',
    relatedSlugs: [
      '{page_data["relatedSlugs"][0]}',
      '{page_data["relatedSlugs"][1]}',
      '{page_data["relatedSlugs"][2]}',
    ],
    aiToolMeta: {{
      type: '{page_data["aiToolMeta"]["type"]}',
      tools: {json.dumps(page_data["aiToolMeta"]["tools"])},
      lastUpdated: '{page_data["aiToolMeta"]["lastUpdated"]}',
    }},
    sections: [
{sections_code}    ],
    faq: [
{faq_code}    ],
  }},'''
        
        # 在文件末尾的 ]; 前插入新页面
        if "];" in content:
            last_bracket = content.rfind("];")
            if last_bracket != -1:
                # 检查前面是否有逗号
                before_bracket = content[:last_bracket].rstrip()
                if before_bracket.endswith(","):
                    # 已经有逗号，直接插入
                    new_content = content[:last_bracket] + new_page_code + "\n" + content[last_bracket:]
                else:
                    # 没有逗号，先加逗号再插入
                    new_content = content[:last_bracket] + ",\n" + new_page_code + "\n" + content[last_bracket:]
                
                # 写入文件
                with open(SITE_DATA_FILE, "w") as f:
                    f.write(new_content)
                
                print(f"✅ 成功添加文章: {page_data['slug']}")
                return True
        
        print(f"❌ 无法添加文章: {page_data['slug']}")
        return False
        
    except Exception as e:
        print(f"❌ 添加文章失败: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="将完整的 GitHub Trending 文章添加到网站")
    parser.add_argument("--file", help="Markdown 文件路径", required=True)
    parser.add_argument("--slug", help="页面 slug", default="github-trending-daily-2026-04-27")
    args = parser.parse_args()
    
    file_path = Path(args.file)
    if not file_path.exists():
        print(f"❌ 文件不存在: {file_path}")
        return
    
    print(f"📝 添加文章到网站: {file_path}")
    
    try:
        # 解析文章
        print("📖 解析 Markdown 文章...")
        article_data = parse_markdown_article(file_path)
        
        # 创建页面数据
        print("🔧 创建页面数据...")
        page_data = create_article_page(article_data, args.slug)
        
        # 添加到网站
        print("📄 添加到网站...")
        if add_article_to_site(page_data):
            print("✅ 文章添加成功!")
            print(f"📊 标题: {page_data['title'][:60]}...")
            print(f"📝 章节数: {len(page_data['sections'])}")
            print(f"❓ FAQ 数: {len(page_data['faq'])}")
        else:
            print("❌ 文章添加失败")
        
    except Exception as e:
        print(f"❌ 处理失败: {e}")
        raise

if __name__ == "__main__":
    import json
    main()