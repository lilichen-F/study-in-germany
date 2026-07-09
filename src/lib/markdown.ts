/**
 * 零依賴 markdown renderer · 支援：
 *   # / ## / ###                → h1 / h2 / h3
 *   段落文字                    → <p>
 *   - 或 *                       → <ul><li>
 *   1. 2. 3.                     → <ol><li>
 *   `code`                       → <code>
 *   ```code block```             → <pre><code>
 *   [text](url)                  → <a>
 *   **bold** / *italic*          → <strong> / <em>
 *   ---                          → <hr>
 *   > blockquote                 → <blockquote>
 *
 * 不支援：table / image / html raw / footnote
 * 若日後需要複雜 markdown，可換 marked（+ npm 3 KB gzip）
 * 但目前 Edu 內容用得到的語法都涵蓋。
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function inline(text: string): string {
  return escapeHtml(text)
    // code
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-surface-hover text-content-primary text-xs font-mono">$1</code>')
    // bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-content-primary">$1</strong>')
    // italic
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
    // link
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer noopener" class="text-brand-burgundy hover:text-brand-burgundy-hover underline underline-offset-2">$1</a>'
    );
}

export function renderMarkdown(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let inCode = false;
  let codeBuf: string[] = [];
  let inList = false;
  let listOrdered = false;
  let paraBuf: string[] = [];

  const flushPara = () => {
    if (paraBuf.length === 0) return;
    const text = paraBuf.join(' ').trim();
    if (text) out.push(`<p class="text-content-secondary leading-relaxed my-3">${inline(text)}</p>`);
    paraBuf = [];
  };

  const flushList = () => {
    if (!inList) return;
    out.push(listOrdered ? '</ol>' : '</ul>');
    inList = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, '');

    // code fence
    if (line.startsWith('```')) {
      if (inCode) {
        out.push(`<pre class="my-4 p-3 rounded-card bg-surface-hover overflow-x-auto text-xs font-mono text-content-primary"><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`);
        codeBuf = [];
        inCode = false;
      } else {
        flushPara();
        flushList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    // empty line
    if (line.trim() === '') {
      flushPara();
      flushList();
      continue;
    }

    // horizontal rule
    if (/^---+$/.test(line.trim())) {
      flushPara();
      flushList();
      out.push('<hr class="my-6 border-border-subtle" />');
      continue;
    }

    // heading
    const h = /^(#{1,3})\s+(.+)$/.exec(line);
    if (h) {
      flushPara();
      flushList();
      const level = h[1].length;
      const text = inline(h[2]);
      if (level === 1) out.push(`<h1 class="text-2xl font-semibold text-content-primary mt-8 mb-4">${text}</h1>`);
      else if (level === 2) out.push(`<h2 class="text-xl font-semibold text-content-primary mt-8 mb-3">${text}</h2>`);
      else out.push(`<h3 class="text-base font-semibold text-content-primary mt-6 mb-2">${text}</h3>`);
      continue;
    }

    // blockquote
    if (line.startsWith('> ')) {
      flushPara();
      flushList();
      out.push(`<blockquote class="my-4 pl-4 border-l-2 border-brand-gold/60 text-content-secondary italic">${inline(line.slice(2))}</blockquote>`);
      continue;
    }

    // unordered list
    const ul = /^[-*]\s+(.+)$/.exec(line);
    if (ul) {
      flushPara();
      if (!inList || listOrdered) {
        flushList();
        out.push('<ul class="my-3 pl-5 space-y-1 list-disc text-content-secondary">');
        inList = true;
        listOrdered = false;
      }
      out.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }

    // ordered list
    const ol = /^\d+\.\s+(.+)$/.exec(line);
    if (ol) {
      flushPara();
      if (!inList || !listOrdered) {
        flushList();
        out.push('<ol class="my-3 pl-5 space-y-1 list-decimal text-content-secondary">');
        inList = true;
        listOrdered = true;
      }
      out.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }

    // paragraph accumulator
    paraBuf.push(line);
  }

  flushPara();
  flushList();
  return out.join('\n');
}
