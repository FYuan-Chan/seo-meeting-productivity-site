import { describe, expect, it } from 'vitest';
import { buildCanonicalUrl, getAllPageEntries, pageMap } from '../src/lib/site';

describe('site metadata', () => {
  it('exposes the starter page cluster', () => {
    const pages = getAllPageEntries();

    expect(pages).toHaveLength(6);
    expect(pages.map((page) => page.slug)).toEqual([
      'best-ai-meeting-assistants',
      'meeting-notes-template',
      'meeting-summary-examples',
      'action-items-template',
      'meeting-minutes-vs-notes',
      'remote-meeting-checklist'
    ]);
  });

  it('builds canonical URLs without duplicating slashes', () => {
    expect(buildCanonicalUrl('https://meetingflowhub.com/', '/pages/action-items-template/')).toBe(
      'https://meetingflowhub.com/pages/action-items-template/'
    );
  });

  it('marks the commercial comparison page as monetization-ready', () => {
    expect(pageMap['best-ai-meeting-assistants'].monetizationPrimary).toBe('affiliate');
    expect(pageMap['best-ai-meeting-assistants'].category).toBe('commercial');
  });
});
