function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function formatInlineMarkdown(value: string): string {
  const codeSpans: string[] = [];
  const escaped = escapeHtml(value).replace(/`([^`]+)`/g, (_match, code) => {
    const index = codeSpans.push(`<code>${code}</code>`) - 1;
    return `@@CODE_SPAN_${index}@@`;
  });

  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/@@CODE_SPAN_(\d+)@@/g, (_match, index) => codeSpans[Number(index)] ?? '');
}
