#!/usr/bin/env python3
"""
GitHub Trending 文章发布到网站 (安全版本)

用法:
    python3 scripts/publish-trending-articles-safe.py [--date YYYY-MM-DD] [--type daily|repo|all]

输出:
    将文章添加到网站数据源，构建并部署网站
"""

import json
import argparse
import subprocess
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any

# 配置
PROJECT_ROOT = Path(__file__).parent.parent
DATA_DIR = PROJECT_ROOT / "scripts" / "data"
ARTICLES_DIR = PROJECT_ROOT / "data" / "articles"
SITE_DATA_FILE = PROJECT_ROOT / "src" / "lib" / "ai-tools-data.ts"

def escape_string(text: str) -> str:
    """转义字符串，确保安全"""
    # 转义单引号
    text = text.replace("'", "\\'")
    # 转义换行符
    text = text.replace("\n", "\\n")
    # 转义回车符
    text = text.replace("\r", "\\r")
    # 转义制表符
    text = text.replace("\t", "\\t")
    return text

def load_article_content(article_file: Path) -> str:
    """加载文章内容"""
    with open(article_file, "r") as f:
        return f.read()

def create_safe_page_data(slug: str, title: str, description: str, content: str) -> Dict[str, Any]:
    """创建安全的页面数据"""
    # 截取内容，避免过长
    safe_content = content[:500] + "..." if len(content) > 500 else content
    
    return {
        "slug": slug,
        "title": escape_string(title),
        "description": escape_string(description),
        "content": escape_string(safe_content)
    }

def add_page_to_site_safe(page_data: Dict[str, Any]) -> bool:
    """安全地添加页面到网站数据源"""
    try:
        # 读取现有数据
        with open(SITE_DATA_FILE, "r") as f:
            content = f.read()
        
        # 检查是否已存在
        if f"slug: '{page_data['slug']}'" in content:
            print(f"⚠️ 页面已存在: {page_data['slug']}")
            return False
        
        # 创建新页面代码
        new_page_code = f'''  {{
    slug: '{page_data["slug"]}',
    title: '{page_data["title"]}',
    description:
      '{page_data["description"]}',
    eyebrow: 'GitHub Trending',
    intro: [
      '{page_data["content"][:200]}...',
      '本文基于 GitHub Trending 数据分析，提供深度见解和使用建议。',
    ],
    targetKeyword: 'github trending, {page_data["slug"].replace("-", " ")}',
    category: 'github-trending',
    monetizationPrimary: 'ads',
    ctaLabel: '查看 GitHub Trending',
    ctaHref: 'https://github.com/trending',
    relatedSlugs: [
      'chatgpt-vs-claude',
      'best-ai-coding-tools',
      'github-copilot-vs-cursor',
    ],
    aiToolMeta: {{
      type: 'comparison',
      tools: ['GitHub', 'Open Source', 'Developer Tools'],
      lastUpdated: '{datetime.now().strftime("%Y-%m-%d")}',
    }},
    sections: [
      {{
        type: 'paragraphs',
        heading: '文章内容',
        paragraphs: [
          '{page_data["content"][:300]}...',
          '完整内容请查看文章详情。',
        ],
      }},
    ],
    faq: [
      {{ question: 'GitHub Trending 是什么？', answer: 'GitHub Trending 是 GitHub 的热门仓库排行榜，展示当前最受欢迎的开源项目。' }},
      {{ question: '如何使用 GitHub Trending？', answer: '可以访问 https://github.com/trending 查看每日、每周、每月的热门仓库。' }},
      {{ question: '如何分析 GitHub Trending 数据？', answer: '可以关注 stars 增长、语言分布、主题分类等指标，了解技术趋势。' }},
    ],
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
                
                print(f"✅ 成功添加页面: {page_data['slug']}")
                return True
        
        print(f"❌ 无法添加页面: {page_data['slug']}")
        return False
        
    except Exception as e:
        print(f"❌ 添加页面失败: {e}")
        return False

def build_and_deploy_site() -> bool:
    """构建并部署网站"""
    try:
        print("🔨 构建网站...")
        result = subprocess.run(
            ["npm", "run", "build"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True,
            timeout=60
        )
        
        if result.returncode != 0:
            print(f"❌ 构建失败: {result.stderr}")
            return False
        
        print("✅ 构建成功")
        
        print("🚀 部署到 GitHub...")
        result = subprocess.run(
            ["git", "add", "."],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True,
            timeout=30
        )
        
        result = subprocess.run(
            ["git", "commit", "-m", f"Add GitHub Trending articles for {datetime.now().strftime('%Y-%m-%d')}"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True,
            timeout=30
        )
        
        result = subprocess.run(
            ["git", "push", "origin", "main"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True,
            timeout=60
        )
        
        if result.returncode != 0:
            print(f"❌ 推送失败: {result.stderr}")
            return False
        
        print("✅ 推送成功")
        return True
        
    except Exception as e:
        print(f"❌ 部署失败: {e}")
        return False

def publish_daily_summary_safe(date: str) -> bool:
    """安全地发布每日综述文章"""
    article_file = ARTICLES_DIR / f"daily-summary-{date}.md"
    if not article_file.exists():
        print(f"❌ 文章不存在: {article_file}")
        return False
    
    content = load_article_content(article_file)
    
    # 提取标题
    title = content.split("\n")[0].replace("# ", "")
    
    # 创建安全的页面数据
    page_data = create_safe_page_data(
        slug=f"github-trending-daily-{date}",
        title=title,
        description=f"GitHub Trending 每日综述 {date}，分析热门仓库趋势和亮点。",
        content=content[:500]
    )
    
    return add_page_to_site_safe(page_data)

def main():
    parser = argparse.ArgumentParser(description="安全地发布 GitHub Trending 文章到网站")
    parser.add_argument("--date", help="日期 (YYYY-MM-DD)，默认为今天", default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--type", help="文章类型: daily, repo, all", default="daily")
    args = parser.parse_args()
    
    date = args.date
    print(f"📝 安全发布 GitHub Trending 文章: {date}")
    
    success_count = 0
    total_count = 0
    
    try:
        if args.type in ["daily", "all"]:
            print("\n📊 发布每日综述文章...")
            if publish_daily_summary_safe(date):
                success_count += 1
            total_count += 1
        
        if success_count > 0:
            print(f"\n🚀 成功发布 {success_count}/{total_count} 篇文章")
            print("🔨 构建并部署网站...")
            
            if build_and_deploy_site():
                print("✅ 网站部署成功!")
                print(f"📄 新增页面: {success_count} 个")
            else:
                print("❌ 网站部署失败")
        else:
            print(f"\n⚠️ 没有成功发布任何文章")
        
    except Exception as e:
        print(f"❌ 发布失败: {e}")
        raise

if __name__ == "__main__":
    main()