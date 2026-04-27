#!/usr/bin/env python3
"""
GitHub Trending 单个仓库深度文章生成器

用法:
    python3 scripts/generate-repo-deep-dive.py [--date YYYY-MM-DD] [--repo owner/repo]

输出:
    生成单个仓库深度文章，保存到 data/articles/repo-deep-dive-{repo}-{date}.md
"""

import json
import argparse
import subprocess
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional

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

def fetch_readme(repo_url: str) -> Optional[str]:
    """获取仓库 README 内容"""
    try:
        # 从 URL 提取 owner/repo
        parts = repo_url.rstrip("/").split("/")
        owner_repo = f"{parts[-2]}/{parts[-1]}"
        
        # 使用 GitHub API 获取 README
        api_url = f"https://api.github.com/repos/{owner_repo}/readme"
        result = subprocess.run(
            ["curl", "-s", "-H", "Accept: application/vnd.github.v3+json", api_url],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if result.returncode == 0:
            data = json.loads(result.stdout)
            if "content" in data:
                import base64
                content = base64.b64decode(data["content"]).decode("utf-8")
                return content
    except Exception as e:
        print(f"获取 README 失败: {e}")
    
    return None

def analyze_repo(repo: Dict[str, Any], readme_content: Optional[str] = None) -> Dict[str, Any]:
    """分析仓库"""
    analysis = {
        "name": repo["fullName"],
        "description": repo["description"],
        "language": repo["language"],
        "stars": repo["todayStars"],
        "url": repo["url"],
        "readme_available": readme_content is not None,
        "highlights": [],
        "pain_points": [],
        "use_cases": [],
        "technical_features": [],
        "installation_steps": [],
        "best_practices": [],
    }
    
    # 分析描述
    desc = repo["description"].lower()
    
    # 识别亮点
    if "free" in desc or "open source" in desc:
        analysis["highlights"].append("免费/开源")
    if "ai" in desc or "agent" in desc:
        analysis["highlights"].append("AI/Agent 技术")
    if "tool" in desc or "platform" in desc:
        analysis["highlights"].append("实用工具")
    if "learn" in desc or "build" in desc:
        analysis["highlights"].append("学习资源")
    if "security" in desc or "hack" in desc:
        analysis["highlights"].append("安全工具")
    
    # 识别痛点
    if "problem" in desc or "issue" in desc:
        analysis["pain_points"].append("解决特定问题")
    if "difficulty" in desc or "hard" in desc:
        analysis["pain_points"].append("降低使用难度")
    if "time" in desc or "fast" in desc:
        analysis["pain_points"].append("节省时间")
    
    # 识别使用场景
    if "developer" in desc or "engineer" in desc:
        analysis["use_cases"].append("开发者工具")
    if "student" in desc or "learn" in desc:
        analysis["use_cases"].append("学习工具")
    if "enterprise" in desc or "company" in desc:
        analysis["use_cases"].append("企业级应用")
    
    # 如果有 README，分析更多内容
    if readme_content:
        readme_lower = readme_content.lower()
        
        # 提取安装步骤
        if "install" in readme_lower or "setup" in readme_lower:
            analysis["installation_steps"].append("查看 README 中的安装指南")
        
        # 提取最佳实践
        if "best practice" in readme_lower or "usage" in readme_lower:
            analysis["best_practices"].append("遵循 README 中的使用建议")
        
        # 提取技术特性
        if "feature" in readme_lower:
            analysis["technical_features"].append("查看 README 中的功能列表")
    
    return analysis

def generate_article_content(repo: Dict[str, Any], analysis: Dict[str, Any], readme_content: Optional[str] = None) -> str:
    """生成文章内容"""
    # 生成文章
    article = f"""# 深度解析：{repo["fullName"]} - {repo["description"][:50]}...

> {repo["fullName"]} 在 GitHub Trending 榜单上今日增长 {repo["todayStars"]} stars，成为热门仓库之一。本文将深入分析这个项目的核心价值、技术亮点和使用建议。

## 📊 仓库概览

| 指标 | 数值 |
|------|------|
| **仓库名称** | [{repo["fullName"]}]({repo["url"]}) |
| **今日增长** | +{repo["todayStars"]} stars |
| **编程语言** | {repo["language"]} |
| **一句话描述** | {repo["description"]} |

## 🎯 核心亮点

### 1. 解决什么问题？
{repo["fullName"]} 主要解决以下问题：
- **痛点**: {repo["description"][:100]}...
- **目标用户**: {repo["language"]} 开发者
- **使用场景**: {repo["description"][:50]}...

### 2. 为什么值得关注？
- **今日增长**: +{repo["todayStars"]} stars，说明社区关注度高
- **实用价值**: {analysis["highlights"][0] if analysis["highlights"] else "解决实际问题"}
- **技术趋势**: 符合当前技术发展趋势

### 3. 核心价值
- **免费/开源**: { "是" if "free" in repo["description"].lower() or "open source" in repo["description"].lower() else "否" }
- **易用性**: 根据描述，使用门槛较低
- **社区活跃度**: 今日增长 {repo["todayStars"]} stars，说明社区活跃

## 🔧 技术架构

### 1. 核心组件
根据仓库描述和 README，{repo["fullName"]} 包含以下核心组件：
- **主要功能**: {repo["description"][:100]}...
- **技术栈**: {repo["language"]}
- **架构特点**: 根据描述推断架构特点

### 2. 技术亮点
- **创新点**: {analysis["highlights"][0] if analysis["highlights"] else "技术创新"}
- **性能优化**: 根据描述推断性能优化
- **扩展性**: 根据描述推断扩展性

### 3. 同类对比
与同类项目相比，{repo["fullName"]} 的优势：
- **功能差异**: 根据描述分析功能差异
- **性能差异**: 根据描述分析性能差异
- **易用性差异**: 根据描述分析易用性差异

## 🚀 使用指南

### 1. 快速开始
"""
    
    # 添加安装步骤
    if analysis["installation_steps"]:
        article += "根据 README，安装步骤如下：\n\n"
        for i, step in enumerate(analysis["installation_steps"], 1):
            article += f"{i}. {step}\n"
    else:
        article += f"""1. 访问仓库地址: [{repo["fullName"]}]({repo["url"]})
2. 查看 README 文档
3. 按照文档指引进行安装和配置

"""
    
    article += f"""### 2. 基本使用
根据仓库描述，{repo["fullName"]} 的基本使用方法：
- **主要功能**: {repo["description"][:100]}...
- **使用场景**: {repo["description"][:50]}...
- **注意事项**: 查看 README 中的使用说明

### 3. 高级功能
- **扩展功能**: 根据 README 推断扩展功能
- **自定义配置**: 根据 README 推断自定义配置
- **集成方式**: 根据 README 推断集成方式

## 💡 最佳实践

### 1. 使用建议
"""
    
    # 添加最佳实践
    if analysis["best_practices"]:
        for practice in analysis["best_practices"]:
            article += f"- {practice}\n"
    else:
        article += f"""- **合理使用**: 根据实际需求使用，避免过度依赖
- **定期更新**: 关注仓库更新，及时升级版本
- **社区参与**: 积极参与社区讨论，贡献代码或文档

"""
    
    article += f"""### 2. 常见问题
- **问题1**: 根据描述推断常见问题
- **问题2**: 根据描述推断常见问题
- **问题3**: 根据描述推断常见问题

### 3. 性能优化
- **优化建议1**: 根据描述推断优化建议
- **优化建议2**: 根据描述推断优化建议
- **优化建议3**: 根据描述推断优化建议

## 🔮 未来展望

### 1. 发展趋势
- **短期趋势**: 根据今日增长推断短期趋势
- **中期趋势**: 根据技术趋势推断中期趋势
- **长期趋势**: 根据行业趋势推断长期趋势

### 2. 潜在机会
- **商业机会**: 根据项目特点推断商业机会
- **技术机会**: 根据技术特点推断技术机会
- **社区机会**: 根据社区特点推断社区机会

### 3. 风险提示
- **技术风险**: 根据项目特点推断技术风险
- **社区风险**: 根据社区特点推断社区风险
- **市场风险**: 根据市场特点推断市场风险

## 📚 总结

### 核心价值
{repo["fullName"]} 是一个 {analysis["highlights"][0] if analysis["highlights"] else "有价值的"} 项目，主要解决 {repo["description"][:50]}... 的问题。

### 适用人群
- **开发者**: 需要 {repo["description"][:30]}... 的开发者
- **学习者**: 想要学习 {repo["language"]} 技术的学习者
- **企业用户**: 需要 {repo["description"][:30]}... 的企业用户

### 使用建议
1. **评估需求**: 根据实际需求评估是否使用
2. **试用体验**: 先试用体验，了解功能和性能
3. **逐步集成**: 逐步集成到现有项目中
4. **持续优化**: 根据使用情况持续优化

## 📖 相关资源

- **仓库地址**: [{repo["fullName"]}]({repo["url"]})
- **官方文档**: 查看 README 和文档
- **社区讨论**: 查看 Issues 和 Discussions
- **同类项目**: 搜索相关项目进行对比

## 🎯 行动建议

### 1. 立即行动
- **访问仓库**: [{repo["fullName"]}]({repo["url"]})
- **查看 README**: 了解详细功能和使用方法
- **试用体验**: 按照文档指引进行试用

### 2. 深入学习
- **阅读源码**: 了解技术实现细节
- **参与社区**: 参与 Issues 和 Discussions
- **贡献代码**: 如果觉得有价值，可以贡献代码

### 3. 分享传播
- **分享经验**: 分享使用经验和心得
- **推荐给他人**: 推荐给有需要的朋友
- **写博客**: 写博客分享使用经验

---

**数据来源**: [GitHub Trending](https://github.com/trending)
**分析时间**: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
**免责声明**: 本文数据来源于 GitHub Trending，仅供参考。具体使用请参考各仓库的官方文档。
"""
    
    return article

def save_article(content: str, repo_name: str, date: str) -> Path:
    """保存文章"""
    # 清理仓库名称，用于文件名
    clean_name = repo_name.replace("/", "-").replace(".", "-")
    article_file = ARTICLES_DIR / f"repo-deep-dive-{clean_name}-{date}.md"
    with open(article_file, "w") as f:
        f.write(content)
    return article_file

def main():
    parser = argparse.ArgumentParser(description="生成 GitHub Trending 单个仓库深度文章")
    parser.add_argument("--date", help="日期 (YYYY-MM-DD)，默认为今天", default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--repo", help="仓库名称 (owner/repo)，默认为今日最热门仓库")
    args = parser.parse_args()
    
    date = args.date
    print(f"📝 生成单个仓库深度文章: {date}")
    
    try:
        # 加载数据
        trending_data = load_trending_data(date)
        repos = trending_data["repos"]
        
        # 选择仓库
        if args.repo:
            # 查找指定仓库
            repo = next((r for r in repos if r["fullName"] == args.repo), None)
            if not repo:
                raise ValueError(f"仓库不存在: {args.repo}")
        else:
            # 选择今日最热门仓库
            repo = max(repos, key=lambda x: x["todayStars"])
        
        print(f"🎯 目标仓库: {repo['fullName']} (+{repo['todayStars']} stars)")
        
        # 获取 README
        print("📖 获取 README...")
        readme_content = fetch_readme(repo["url"])
        
        # 分析仓库
        print("🔍 分析仓库...")
        analysis = analyze_repo(repo, readme_content)
        
        # 生成文章
        print("✍️ 生成文章...")
        article_content = generate_article_content(repo, analysis, readme_content)
        
        # 保存文章
        article_file = save_article(article_content, repo["fullName"], date)
        
        print(f"✅ 文章生成成功!")
        print(f"📄 文件: {article_file}")
        print(f"📊 数据: {repo['fullName']} (+{repo['todayStars']} stars)")
        print(f"📝 字数: {len(article_content)} 字符")
        
    except Exception as e:
        print(f"❌ 生成失败: {e}")
        raise

if __name__ == "__main__":
    main()