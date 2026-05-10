# Cloudflare Pages 部署清单

适用项目：`seo-meeting-productivity-site` / `signalforges.com`

这个项目现在处于 **AdSense recovery** 模式：Cloudflare Pages 只发布首页、信任页和少量白名单文章，避免“低价值内容”风险继续扩大。

---

## 一、Cloudflare Pages 里要填什么

Cloudflare 官方 Astro Pages 指南的核心构建配置是：

- **Production branch**: `main`
- **Build command**: `npm run build`
- **Build output directory**: `dist`

如果 Cloudflare 自动识别 Astro，通常会帮你填好；如果没有，就手动填这三个值。

---

## 二、上线前必须配置的环境变量

在 Cloudflare Pages → 项目 → **Settings** → **Environment variables** 里添加：

```bash
PUBLIC_SITE_URL=https://yourdomain.com
SITE_URL=https://yourdomain.com
```

SignalForges 正式值：

```bash
PUBLIC_SITE_URL=https://signalforges.com
SITE_URL=https://signalforges.com
```

### 这两个变量分别做什么
- `PUBLIC_SITE_URL`
  - 给站内页面使用
  - 影响 canonical、sitemap、robots、og:url、structured data
- `SITE_URL`
  - 给 `astro.config.mjs` 构建时使用

### 不配置会发生什么
如果你不配置，项目会回退到：

```bash
https://signalforges.com
```

仍然建议在 Cloudflare Pages 显式填写这两个变量，避免预览环境或未来多域名部署时混乱。

---

## 三、推到 GitHub
在项目目录执行：

```bash
cd ~/Documents/hermes-code/seo-meeting-productivity-site
git init
git add .
git commit -m "Prepare Cloudflare Pages release"
git branch -M main
```

然后在 GitHub 新建仓库，再执行：

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

项目已经补了 `.gitignore`，会自动忽略：
- `node_modules/`
- `dist/`
- `.astro/`
- 本地 `.env`

---

## 四、在 Cloudflare Pages 创建项目

1. 登录 Cloudflare Dashboard
2. 进入 **Workers & Pages**
3. 点击 **Create application**
4. 选择 **Pages**
5. 选择 **Import an existing Git repository**
6. 授权 GitHub
7. 选择你的仓库
8. 点击 **Begin setup**
9. 检查构建参数
10. 添加环境变量
11. 点击 **Save and Deploy**

---

## 五、部署成功后先检查什么

先打开 Cloudflare 给你的临时域名：
- `https://<project>.pages.dev/`

重点检查这几项：

### 1. 首页
- `/`

### 2. 内容页
- `/pages/best-ai-coding-tools/`
- `/pages/chatgpt-vs-claude/`
- `/pages/github-copilot-vs-cursor/`

### 3. 信任页
- `/about/`
- `/contact/`
- `/privacy-policy/`
- `/terms/`
- `/editorial-policy/`
- `/ai-use-disclosure/`
- `/author/`

### 4. robots
- `/robots.txt`

### 5. sitemap
- `/sitemap.xml`

### 6. 恢复期审计
部署前本地必须通过：

```bash
npm run validate
npm run audit:content
npm test
npm run build
npm run audit:recovery
```

确认 sitemap 只有恢复期允许曝光的 URL，并且构建产物没有 `Ad Space`、`adsbygoogle`、`Primary monetization` 等广告痕迹。

---

## 六、绑定自定义域名

如果你的域名已经接入 Cloudflare：

1. 打开 Pages 项目
2. 进入 **Custom domains**
3. 点击 **Set up a custom domain**
4. 输入你的域名，例如：
   - `yourdomain.com`
   - `www.yourdomain.com`
5. 按提示完成配置

Cloudflare 一般会自动处理 DNS 记录和 SSL。

---

## 七、上线后立刻做的动作

### 1. 接 Google Search Console
提交：

```text
https://signalforges.com/sitemap.xml
```

### 2. 不要立刻扩页面
恢复期先观察：
- 抓取
- 收录
- impressions
- clicks
- AdSense review 状态

### 3. 再决定是否恢复广告
AdSense 通过前不要重新加入广告脚本、广告占位或“主要变现”模块。

---

## 八、当前项目已经补好的发布准备

目前项目已经具备：
- Cloudflare Pages 可用的 Astro 构建配置
- 环境变量驱动的站点域名配置
- `.gitignore`
- `.env.example`
- 部署说明文档
- 测试与构建校验能力

也就是说，你现在的最短路径就是：

**GitHub → Cloudflare Pages → 填环境变量 → 部署 → 绑域名 → 提交 Search Console**
