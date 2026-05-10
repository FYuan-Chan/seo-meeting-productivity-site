# SignalForges — AdSense Recovery Astro Site

`signalforges.com` is currently in AdSense recovery mode after a low-value-content rejection. The Astro site is now treated as the publishing front end only: it exposes a small whitelist of higher-quality AI developer tools pages, trust pages, and the homepage while the Growth OS control plane decides what should be improved, held, merged, noindexed, or deleted.

## Current Publishing Rules

- Public sitemap contains only the homepage, trust pages, and 10-15 selected analysis pages.
- Automated publishing is frozen during recovery.
- Visible ad placeholders and AdSense scripts are disabled until review gates pass.
- Thin GitHub Trending pages, duplicate slugs, risky topics, and generic meeting-template inventory are kept out of the public build.
- Public pages must stay inside the `AI developer tools and agent infrastructure` positioning.

## Local Development

```bash
npm install
npm run dev
```

## Recovery Verification

Run these before deploying or reapplying for AdSense:

```bash
npm run validate
npm run audit:content
npm test
npm run build
npm run audit:recovery
```

What the gates cover:

- `npm run validate`: duplicate slugs, review-set size/depth, trust pages, AI metadata, and public internal links.
- `npm run audit:content`: machine-readable content audit in `reports/content-quality-audit.json`.
- `npm test`: core metadata and recovery-mode assertions.
- `npm run build`: Astro static output.
- `npm run audit:recovery`: built HTML, sitemap whitelist, broken links, and blocked ad/monetization patterns.

## Required Environment Variables

Set these in Cloudflare Pages and local production builds:

```bash
PUBLIC_SITE_URL=https://signalforges.com
SITE_URL=https://signalforges.com
```

## Project Structure

- `src/lib/site.ts`: site config, raw inventory, AdSense review whitelist, schema helpers.
- `src/lib/trust-pages.ts`: About, Contact, Privacy, Terms, Editorial Policy, AI Use Disclosure, Author pages.
- `src/lib/editorial-quality.ts`: per-page source/value/visual audit profile.
- `src/pages/index.astro`: recovery-mode homepage.
- `src/pages/pages/[slug].astro`: whitelisted public article template.
- `src/pages/[trustSlug].astro`: trust-center route.
- `scripts/validate-pages.ts`: data and public-link gate.
- `scripts/content-quality-audit.ts`: machine-readable content audit.
- `scripts/recovery-audit.ts`: post-build recovery crawler.
- `legacy-static/`: archived first-pass static output, not part of the public Astro build.

## Growth OS

The long-term automation control plane lives at:

```bash
~/Documents/hermes-code/signalforges-growth-os
```

It follows the three-layer rule:

- scripts define facts;
- skills define repeatable editorial process;
- agents define weekly strategy and evolution decisions.

## Reapply Checklist

1. Confirm `PUBLIC_SITE_URL` and `SITE_URL` are `https://signalforges.com`.
2. Run the full recovery verification sequence above.
3. Confirm `dist/sitemap.xml` contains only recovery-approved URLs.
4. Spot-check homepage, representative articles, trust pages, and mobile layout.
5. Submit the refreshed sitemap in Search Console.
6. Reapply for AdSense only after the deployed production site matches the local recovery audit.
