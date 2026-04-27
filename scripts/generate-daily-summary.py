#!/usr/bin/env python3
"""
GitHub Trending 每日综述文章生成器

用法:
    python3 scripts/generate-daily-summary.py [--date YYYY-MM-DD]

输出:
    生成每日综述文章，保存到 data/articles/daily-summary-{date}.md
"""

import json
import argparse
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, List, Any

# 配置
PROJECT_ROOT = Path(__file__).parent.parent
DATA_DIR = PROJECT_ROOT / "scripts" / "data"
ARTICLES_DIR = PROJECT_ROOT / "data" / "articles"
ARTICLES_DIR.mkdir(parents=True, exist_ok=True)

def load_trending_data(date: str) -> Dict[str, Any]:
    """加载 trending 数据"""
    data_file = DATA_DIR / f"trending-{date}.json"
    if not data_file.exists():
        raise FileNotFoundError(f"数据文件不存在: {data_file}")
    
    with open(data_file, "r") as f:
        return json.load(f)

def load_analysis_data(date: str) -> Dict[str, Any]:
    """加载分析数据"""
    analysis_file = DATA_DIR / f"analysis-{date}.json"
    if not analysis_file.exists():
        # 如果没有分析文件，就进行简单分析
        trending_data = load_trending_data(date)
        return analyze_trending_data(trending_data)
    
    with open(analysis_file, "r") as f:
        return json.load(f)

def analyze_trending_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """分析 trending 数据"""
    repos = data["repos"]
    
    # 按今日 stars 排序
    sorted_repos = sorted(repos, key=lambda x: x["todayStars"], reverse=True)
    
    # 按语言分类
    languages = {}
    for repo in repos:
        lang = repo["language"]
        if lang not in languages:
            languages[lang] = []
        languages[lang].append(repo)
    
    # 按主题分类
    categories = {
        "AI/Agent": [],
        "开发工具": [],
        "安全工具": [],
        "学习资源": [],
        "其他": []
    }
    
    for repo in repos:
        desc = repo["description"].lower()
        if any(keyword in desc for keyword in ["ai", "agent", "claude", "gpt", "llm"]):
            categories["AI/Agent"].append(repo)
        elif any(keyword in desc for keyword in ["tool", "platform", "analytics", "debug"]):
            categories["开发工具"].append(repo)
        elif any(keyword in desc for keyword in ["hack", "security", "penetration"]):
            categories["安全工具"].append(repo)
        elif any(keyword in desc for keyword in ["learn", "build", "master", "tutorial"]):
            categories["学习资源"].append(repo)
        else:
            categories["其他"].append(repo)
    
    # 分析爆点
    top_repo = sorted_repos[0]
    second_repo = sorted_repos[1]
    
    def analyze_explosion(repo):
        desc = repo["description"].lower()
        reasons = []
        if "free" in desc or "open source" in desc:
            reasons.append("免费/开源")
        if "ai" in desc or "agent" in desc:
            reasons.append("AI/Agent 热潮")
        if "tool" in desc or "platform" in desc:
            reasons.append("实用工具")
        if "learn" in desc or "build" in desc:
            reasons.append("学习资源")
        if "security" in desc or "hack" in desc:
            reasons.append("安全需求")
        if not reasons:
            reasons.append("解决特定痛点")
        return "、".join(reasons)
    
    return {
        "date": data["date"],
        "period": data["period"],
        "totalRepos": len(repos),
        "topRepos": sorted_repos[:5],
        "languages": {lang: len(lang_repos) for lang, lang_repos in languages.items()},
        "categories": {cat: len(cat_repos) for cat, cat_repos in categories.items()},
        "explosions": [
            {"repo": top_repo["fullName"], "stars": top_repo["todayStars"], "reason": analyze_explosion(top_repo)},
            {"repo": second_repo["fullName"], "stars": second_repo["todayStars"], "reason": analyze_explosion(second_repo)}
        ]
    }

def generate_article_content(date: str, trending_data: Dict[str, Any], analysis_data: Dict[str, Any]) -> str:
    """生成文章内容"""
    repos = trending_data["repos"]
    sorted_repos = sorted(repos, key=lambda x: x["todayStars"], reverse=True)
    
    # 计算总增长
    total_stars = sum(repo["todayStars"] for repo in repos)
    
    # 生成文章
    article = f"""# GitHub Trending 每日综述 | {date} - {len(repos)} 个仓库爆火，总增长 {total_stars} stars

> 今日 GitHub Trending 榜单共有 {len(repos)} 个仓库上榜，总增长 {total_stars} stars。AI/Agent 相关仓库占据主导地位，开发者工具和学习资源紧随其后。让我们一起看看今天有哪些值得关注的开源项目！

## 📊 榜单概览

| 指标 | 数值 |
|------|------|
| **上榜仓库数** | {len(repos)} |
| **总增长 stars** | +{total_stars} |
| **平均增长** | +{total_stars // len(repos)} stars/仓库 |
| **最热门语言** | {max(analysis_data["languages"].items(), key=lambda x: x[1])[0]} |
| **最热门主题** | {max(analysis_data["categories"].items(), key=lambda x: x[1])[0]} |

## 🔥 热门仓库 Top 5

### 1. {sorted_repos[0]["fullName"]} - +{sorted_repos[0]["todayStars"]} stars 🏆

**一句话亮点**: {sorted_repos[0]["description"]}

**为什么火**: {analysis_data["explosions"][0]["reason"]}

**核心价值**: 
- 解决的问题：{sorted_repos[0]["description"][:100]}...
- 目标用户：{sorted_repos[0]["language"]} 开发者
- 使用场景：{sorted_repos[0]["description"][:50]}...

**快速了解**: 
- 仓库地址: [{sorted_repos[0]["fullName"]}]({sorted_repos[0]["url"]})
- 编程语言: {sorted_repos[0]["language"]}
- 今日增长: +{sorted_repos[0]["todayStars"]} stars

---

### 2. {sorted_repos[1]["fullName"]} - +{sorted_repos[1]["todayStars"]} stars 🥈

**一句话亮点**: {sorted_repos[1]["description"]}

**为什么火**: {analysis_data["explosions"][1]["reason"]}

**核心价值**: 
- 解决的问题：{sorted_repos[1]["description"][:100]}...
- 目标用户：{sorted_repos[1]["language"]} 开发者
- 使用场景：{sorted_repos[1]["description"][:50]}...

**快速了解**: 
- 仓库地址: [{sorted_repos[1]["fullName"]}]({sorted_repos[1]["url"]})
- 编程语言: {sorted_repos[1]["language"]}
- 今日增长: +{sorted_repos[1]["todayStars"]} stars

---

### 3. {sorted_repos[2]["fullName"]} - +{sorted_repos[2]["todayStars"]} stars 🥉

**一句话亮点**: {sorted_repos[2]["description"]}

**核心价值**: 
- 解决的问题：{sorted_repos[2]["description"][:100]}...
- 目标用户：{sorted_repos[2]["language"]} 开发者

**快速了解**: 
- 仓库地址: [{sorted_repos[2]["fullName"]}]({sorted_repos[2]["url"]})
- 编程语言: {sorted_repos[2]["language"]}
- 今日增长: +{sorted_repos[2]["todayStars"]} stars

---

### 4. {sorted_repos[3]["fullName"]} - +{sorted_repos[3]["todayStars"]} stars

**一句话亮点**: {sorted_repos[3]["description"]}

**核心价值**: 
- 解决的问题：{sorted_repos[3]["description"][:100]}...
- 目标用户：{sorted_repos[3]["language"]} 开发者

**快速了解**: 
- 仓库地址: [{sorted_repos[3]["fullName"]}]({sorted_repos[3]["url"]})
- 编程语言: {sorted_repos[3]["language"]}
- 今日增长: +{sorted_repos[3]["todayStars"]} stars

---

### 5. {sorted_repos[4]["fullName"]} - +{sorted_repos[4]["todayStars"]} stars

**一句话亮点**: {sorted_repos[4]["description"]}

**核心价值**: 
- 解决的问题：{sorted_repos[4]["description"][:100]}...
- 目标用户：{sorted_repos[4]["language"]} 开发者

**快速了解**: 
- 仓库地址: [{sorted_repos[4]["fullName"]}]({sorted_repos[4]["url"]})
- 编程语言: {sorted_repos[4]["language"]}
- 今日增长: +{sorted_repos[4]["todayStars"]} stars

---

## 📈 趋势洞察

### 1. 编程语言分布

| 语言 | 仓库数 | 总增长 stars |
|------|--------|-------------|
"""
    
    # 添加语言分布表格
    for lang, count in sorted(analysis_data["languages"].items(), key=lambda x: x[1], reverse=True):
        lang_stars = sum(repo["todayStars"] for repo in repos if repo["language"] == lang)
        article += f"| {lang} | {count} | +{lang_stars} |\n"
    
    article += f"""
**分析**: {max(analysis_data["languages"].items(), key=lambda x: x[1])[0]} 语言占据主导地位，说明...

### 2. 主题分类

| 主题 | 仓库数 | 总增长 stars |
|------|--------|-------------|
"""
    
    # 添加主题分类表格
    for category, count in sorted(analysis_data["categories"].items(), key=lambda x: x[1], reverse=True):
        if count > 0:
            if category == "AI/Agent":
                cat_stars = sum(repo["todayStars"] for repo in repos if any(keyword in repo["description"].lower() for keyword in ["ai", "agent", "claude", "gpt", "llm"]))
            elif category == "开发工具":
                cat_stars = sum(repo["todayStars"] for repo in repos if any(keyword in repo["description"].lower() for keyword in ["tool", "platform", "analytics", "debug"]))
            elif category == "安全工具":
                cat_stars = sum(repo["todayStars"] for repo in repos if any(keyword in repo["description"].lower() for keyword in ["hack", "security", "penetration"]))
            elif category == "学习资源":
                cat_stars = sum(repo["todayStars"] for repo in repos if any(keyword in repo["description"].lower() for keyword in ["learn", "build", "master", "tutorial"]))
            else:
                cat_stars = sum(repo["todayStars"] for repo in repos if not any(keyword in repo["description"].lower() for keyword in ["ai", "agent", "claude", "gpt", "llm", "tool", "platform", "analytics", "debug", "hack", "security", "penetration", "learn", "build", "master", "tutorial"]))
            article += f"| {category} | {count} | +{cat_stars} |\n"
    
    article += f"""
**分析**: {max(analysis_data["categories"].items(), key=lambda x: x[1])[0]} 主题最受欢迎，说明...

### 3. 爆点分析

**今日之星**: {analysis_data["explosions"][0]["repo"]}
- 增长: +{analysis_data["explosions"][0]["stars"]} stars
- 原因: {analysis_data["explosions"][0]["reason"]}

**第二爆点**: {analysis_data["explosions"][1]["repo"]}
- 增长: +{analysis_data["explosions"][1]["stars"]} stars
- 原因: {analysis_data["explosions"][1]["reason"]}

**为什么这些仓库会火？**
1. **AI/Agent 热潮**: AI 相关工具持续火热，开发者对 AI 工具的需求旺盛
2. **实用工具**: 解决实际问题的工具最受欢迎
3. **免费/开源**: 免费和开源的项目更容易获得关注
4. **学习资源**: 开发者对学习资源的需求持续增长

## 🎯 值得关注的仓库推荐

### 1. AI/Agent 类
"""
    
    # 添加 AI/Agent 类仓库
    ai_repos = [repo for repo in repos if any(keyword in repo["description"].lower() for keyword in ["ai", "agent", "claude", "gpt", "llm"])]
    for repo in ai_repos[:3]:
        article += f"- **{repo['fullName']}**: {repo['description'][:80]}... (+{repo['todayStars']} stars)\n"
    
    article += f"""
### 2. 开发工具类
"""
    
    # 添加开发工具类仓库
    tool_repos = [repo for repo in repos if any(keyword in repo["description"].lower() for keyword in ["tool", "platform", "analytics", "debug"])]
    for repo in tool_repos[:3]:
        article += f"- **{repo['fullName']}**: {repo['description'][:80]}... (+{repo['todayStars']} stars)\n"
    
    article += f"""
### 3. 学习资源类
"""
    
    # 添加学习资源类仓库
    learn_repos = [repo for repo in repos if any(keyword in repo["description"].lower() for keyword in ["learn", "build", "master", "tutorial"])]
    for repo in learn_repos[:3]:
        article += f"- **{repo['fullName']}**: {repo['description'][:80]}... (+{repo['todayStars']} stars)\n"
    
    article += f"""
## 💡 总结与展望

### 今日亮点
1. **AI/Agent 持续火热**: AI 相关工具占据主导地位
2. **实用工具受欢迎**: 解决实际问题的工具最受欢迎
3. **学习资源需求大**: 开发者对学习资源的需求持续增长

### 趋势预测
1. **AI 工具将继续增长**: 随着 AI 技术的发展，AI 工具将继续增长
2. **开发者工具需求旺盛**: 开发者对工具的需求将持续增长
3. **学习资源将更加重要**: 随着技术更新速度加快，学习资源将更加重要

### 建议
1. **关注 AI 工具**: 如果你是 AI 开发者，建议关注 AI 相关工具
2. **尝试新工具**: 尝试使用今天上榜的新工具，提高开发效率
3. **持续学习**: 利用学习资源，持续提升自己的技能

## 📚 相关阅读

- [GitHub Trending 每周综述](#)
- [GitHub Trending 每月综述](#)
- [AI 工具深度分析](#)

---

**数据来源**: [GitHub Trending](https://github.com/trending)
**分析时间**: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
**免责声明**: 本文数据来源于 GitHub Trending，仅供参考。具体使用请参考各仓库的官方文档。
"""
    
    return article

def save_article(content: str, date: str) -> Path:
    """保存文章"""
    article_file = ARTICLES_DIR / f"daily-summary-{date}.md"
    with open(article_file, "w") as f:
        f.write(content)
    return article_file

def main():
    parser = argparse.ArgumentParser(description="生成 GitHub Trending 每日综述文章")
    parser.add_argument("--date", help="日期 (YYYY-MM-DD)，默认为今天", default=datetime.now().strftime("%Y-%m-%d"))
    args = parser.parse_args()
    
    date = args.date
    print(f"📝 生成每日综述文章: {date}")
    
    try:
        # 加载数据
        trending_data = load_trending_data(date)
        analysis_data = load_analysis_data(date)
        
        # 生成文章
        article_content = generate_article_content(date, trending_data, analysis_data)
        
        # 保存文章
        article_file = save_article(article_content, date)
        
        print(f"✅ 文章生成成功!")
        print(f"📄 文件: {article_file}")
        print(f"📊 数据: {len(trending_data['repos'])} 个仓库")
        print(f"📝 字数: {len(article_content)} 字符")
        
    except Exception as e:
        print(f"❌ 生成失败: {e}")
        raise

if __name__ == "__main__":
    main()