# Cloudflare Pages 部署清单

适用项目：`seo-meeting-productivity-site`

这个项目已经整理成可直接上 Cloudflare Pages 的发布版本了，当前采用 **环境变量驱动域名配置**，不需要每次部署都手改源码。

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

### 这两个变量分别做什么
- `PUBLIC_SITE_URL`
  - 给站内页面使用
  - 影响 canonical、sitemap、robots、og:url、structured data
- `SITE_URL`
  - 给 `astro.config.mjs` 构建时使用

### 不配置会发生什么
如果你不配置，项目会回退到：

```bash
https://example.com
```

这样会让 SEO 相关 URL 全部错误，所以正式上线前一定要填。

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
- `/pages/best-ai-meeting-assistants/`
- `/pages/meeting-notes-template/`
- `/pages/meeting-summary-examples/`

### 3. robots
- `/robots.txt`

### 4. sitemap
- `/sitemap.xml`

### 5. 源码里的 canonical
确认已经不是 `example.com`，而是你的真实域名。

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
https://yourdomain.com/sitemap.xml
```

### 2. 扩第二批页面
先把内容量做起来，再观察：
- 抓取
- 收录
- impressions
- clicks

### 3. 再决定是否接广告和联盟
SEO 项目最先验证的是：
- 页面能不能被收录
- 有没有真实曝光
- 哪类关键词有起势

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
