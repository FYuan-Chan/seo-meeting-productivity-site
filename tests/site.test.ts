import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildCanonicalUrl, getAllPageEntries, pageMap, siteConfig } from '../src/lib/site';

const baseLayoutSource = readFileSync(
  resolve(import.meta.dirname, '../src/layouts/BaseLayout.astro'),
  'utf8'
);

describe('site metadata', () => {
  it('exposes a scalable starter page cluster without losing the core seed slugs', () => {
    const pages = getAllPageEntries();
    const slugs = pages.map((page) => page.slug);
    const starterMetric = siteConfig.metrics.find((metric) => metric.label === 'Starter pages');

    expect(pages.length).toBeGreaterThanOrEqual(36);
    expect(new Set(slugs).size).toBe(pages.length);
    expect(slugs).toEqual(
      expect.arrayContaining([
        'best-ai-meeting-assistants',
        'meeting-notes-template',
        'meeting-summary-examples',
        'action-items-template',
        'meeting-minutes-vs-notes',
        'remote-meeting-checklist'
      ])
    );
    expect(starterMetric?.value).toBe(String(pages.length));
  });

  it('builds canonical URLs without duplicating slashes', () => {
    expect(buildCanonicalUrl('https://meetingflowhub.com/', '/pages/action-items-template/')).toBe(
      'https://meetingflowhub.com/pages/action-items-template/'
    );
  });

  it('includes the AdSense Auto ads bootstrap script in the shared layout', () => {
    expect(baseLayoutSource).toContain('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6108188461869936');
    expect(baseLayoutSource).toContain('crossorigin="anonymous"');
  });

});
