# MeetingFlow Hub — Cloudflare Pages Ready Astro SEO Starter

This project is a deployable Astro static site prepared for Cloudflare Pages.

## What is included
- Astro-based static SEO site
- 6 starter pages in a focused meeting-productivity cluster
- Dynamic route generation for `/pages/[slug]/`
- Dynamic `robots.txt` and `sitemap.xml`
- FAQ + Article schema helpers
- Vitest coverage for core site metadata and route generation
- Cloudflare Pages deployment guide
- Environment-based site URL configuration

## Local development
```bash
npm install
npm run dev
```

## Validation
```bash
npm test
npm run build
```

## Cloudflare Pages build settings
Use these values in Cloudflare Pages:

- **Production branch**: `main`
- **Build command**: `npm run build`
- **Build output directory**: `dist`

## Required environment variables
Before production deployment, set these values either in a local `.env` file or in Cloudflare Pages > Settings > Environment variables.

```bash
PUBLIC_SITE_URL=https://yourdomain.com
SITE_URL=https://yourdomain.com
```

Why both?
- `PUBLIC_SITE_URL` is consumed inside Astro source files for canonical tags, sitemap, robots, and schema URLs.
- `SITE_URL` is consumed by `astro.config.mjs` during the build.

If you do not set them, the project falls back to `https://example.com`.

## Project structure
- `src/lib/site.ts` — site config, page inventory, schema helpers
- `src/pages/index.astro` — homepage
- `src/pages/pages/[slug].astro` — dynamic SEO page template
- `src/pages/robots.txt.ts` — robots output
- `src/pages/sitemap.xml.ts` — sitemap output
- `src/styles/global.css` — site styling
- `tests/site.test.ts` — test coverage for core metadata logic
- `DEPLOY-CLOUDFLARE-PAGES.md` — deployment checklist
- `legacy-static/` — archived first-pass static HTML version

## Recommended release flow
1. Create a GitHub repository.
2. Push this project to the `main` branch.
3. Create a Cloudflare Pages project from that repository.
4. Add `PUBLIC_SITE_URL` and `SITE_URL` in Cloudflare Pages environment variables.
5. Deploy.
6. Bind your custom domain.
7. Submit `https://yourdomain.com/sitemap.xml` to Google Search Console.

## SEO reminder
Do not launch with the default placeholder domain. Make sure your deployed pages, `robots.txt`, and `sitemap.xml` all point to the real domain before submitting the site to Google.
