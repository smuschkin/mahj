/**
 * Build a printable PDF from docs/LAUNCH_POSTS.md
 *
 * Reads the markdown file, converts it to styled HTML, then uses Chrome
 * headless to render it to PDF.
 *
 * Usage: node scripts/build-launch-pdf.mjs
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { execSync } from "child_process";
import { existsSync } from "fs";

// Accept input file via argv, default to LAUNCH_POSTS.md
const args = process.argv.slice(2);
const INPUT_MD = args[0] ?? "docs/LAUNCH_POSTS.md";
const OUTPUT_PDF = INPUT_MD.replace(/\.md$/, ".pdf");
const TEMP_HTML = INPUT_MD.replace(/\.md$/, ".tmp.html");
const TITLE = args[1] ?? "Launch Posts";
const SUBTITLE = args[2] ?? "Ready-to-share content";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

/** Minimal markdown-to-HTML converter covering the subset used in the file. */
function mdToHtml(md) {
  const lines = md.split("\n");
  const out = [];
  let inList = false;
  let inOl = false;
  let inTable = false;
  let tableHeader = false;
  let inCode = false;
  let paragraphBuffer = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      out.push(`<p>${inlineFormat(paragraphBuffer.join(" "))}</p>`);
      paragraphBuffer = [];
    }
  };

  const closeList = () => {
    if (inList) { out.push("</ul>"); inList = false; }
    if (inOl) { out.push("</ol>"); inOl = false; }
  };

  const closeTable = () => {
    if (inTable) { out.push("</tbody></table>"); inTable = false; tableHeader = false; }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code fences
    if (line.startsWith("```")) {
      flushParagraph();
      closeList();
      closeTable();
      if (!inCode) {
        out.push("<pre><code>");
        inCode = true;
      } else {
        out.push("</code></pre>");
        inCode = false;
      }
      continue;
    }
    if (inCode) {
      out.push(escapeHtml(line));
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      flushParagraph();
      closeList();
      closeTable();
      out.push('<hr class="page-break">');
      continue;
    }

    // Headings
    const h1 = line.match(/^# (.+)$/);
    const h2 = line.match(/^## (.+)$/);
    const h3 = line.match(/^### (.+)$/);
    const h4 = line.match(/^#### (.+)$/);
    if (h1 || h2 || h3 || h4) {
      flushParagraph();
      closeList();
      closeTable();
      if (h1) out.push(`<h1>${inlineFormat(h1[1])}</h1>`);
      else if (h2) out.push(`<h2>${inlineFormat(h2[1])}</h2>`);
      else if (h3) out.push(`<h3>${inlineFormat(h3[1])}</h3>`);
      else if (h4) out.push(`<h4>${inlineFormat(h4[1])}</h4>`);
      continue;
    }

    // Tables (simple pipe tables)
    if (line.match(/^\|/)) {
      flushParagraph();
      closeList();
      const cells = line.split("|").slice(1, -1).map(c => c.trim());
      // Separator row
      if (cells.every(c => /^[-:]+$/.test(c))) {
        if (inTable && tableHeader) {
          out.push("</thead><tbody>");
          tableHeader = false;
        }
        continue;
      }
      if (!inTable) {
        out.push("<table><thead>");
        inTable = true;
        tableHeader = true;
      }
      const tag = tableHeader ? "th" : "td";
      const row = cells.map(c => `<${tag}>${inlineFormat(c)}</${tag}>`).join("");
      out.push(`<tr>${row}</tr>`);
      continue;
    } else if (inTable) {
      closeTable();
    }

    // Blockquote
    const bq = line.match(/^> (.*)$/);
    if (bq) {
      flushParagraph();
      closeList();
      out.push(`<blockquote>${inlineFormat(bq[1])}</blockquote>`);
      continue;
    }

    // Unordered list
    const ul = line.match(/^(\s*)[-*] (.+)$/);
    if (ul) {
      flushParagraph();
      if (inOl) { out.push("</ol>"); inOl = false; }
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${inlineFormat(ul[2])}</li>`);
      continue;
    }

    // Ordered list
    const ol = line.match(/^(\s*)\d+\. (.+)$/);
    if (ol) {
      flushParagraph();
      if (inList) { out.push("</ul>"); inList = false; }
      if (!inOl) { out.push("<ol>"); inOl = true; }
      out.push(`<li>${inlineFormat(ol[2])}</li>`);
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      flushParagraph();
      closeList();
      continue;
    }

    // Regular paragraph content
    paragraphBuffer.push(line);
  }

  flushParagraph();
  closeList();
  closeTable();
  return out.join("\n");
}

/** Handle bold, italic, code, links. */
function inlineFormat(text) {
  // Preserve markdown special chars in code spans first
  text = text.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);
  // Bold
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Italic (simple — single asterisks not in bold context)
  text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  // Links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return text;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const CSS = `
  @page {
    size: letter;
    margin: 0.75in;
  }
  body {
    font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
    color: #1E293B;
    line-height: 1.55;
    font-size: 11pt;
    max-width: 100%;
  }
  h1 {
    font-family: Georgia, serif;
    font-size: 24pt;
    color: #1A4D2E;
    border-bottom: 3px solid #C8A951;
    padding-bottom: 8px;
    margin-top: 0;
  }
  h2 {
    font-family: Georgia, serif;
    font-size: 16pt;
    color: #1A4D2E;
    margin-top: 28px;
    padding-top: 12px;
    border-top: 1px solid #E2E8F0;
  }
  h3 {
    font-family: Georgia, serif;
    font-size: 13pt;
    color: #2D8B5E;
    margin-top: 20px;
  }
  h4 {
    font-size: 11pt;
    color: #475569;
    margin-top: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  p {
    margin: 8px 0;
  }
  ul, ol {
    margin: 8px 0;
    padding-left: 24px;
  }
  li {
    margin: 4px 0;
  }
  blockquote {
    border-left: 4px solid #C8A951;
    background: #FFFBEA;
    margin: 10px 0;
    padding: 8px 14px;
    color: #1E293B;
    font-style: italic;
  }
  code {
    background: #F1F5F9;
    padding: 1px 5px;
    border-radius: 3px;
    font-family: Menlo, Consolas, monospace;
    font-size: 9.5pt;
    color: #0F3320;
  }
  pre {
    background: #F1F5F9;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    border-left: 3px solid #2D8B5E;
  }
  pre code {
    background: transparent;
    padding: 0;
  }
  a {
    color: #2D8B5E;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  strong {
    color: #0F3320;
    font-weight: 700;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 12px 0;
    font-size: 10pt;
  }
  th {
    background: #E8F5EC;
    color: #1A4D2E;
    padding: 6px 10px;
    border: 1px solid #CBD5E1;
    text-align: left;
  }
  td {
    padding: 6px 10px;
    border: 1px solid #E2E8F0;
  }
  hr.page-break {
    border: none;
    border-top: 1px dashed #CBD5E1;
    margin: 24px 0;
  }
  /* Cover section */
  .cover {
    text-align: center;
    padding: 40px 0;
    border-bottom: 3px solid #C8A951;
    margin-bottom: 30px;
  }
  .cover-title {
    font-family: Georgia, serif;
    font-size: 32pt;
    color: #1A4D2E;
    margin: 0;
    border: none;
    padding: 0;
  }
  .cover-subtitle {
    font-size: 13pt;
    color: #475569;
    margin-top: 8px;
    font-style: italic;
  }
  .cover-url {
    display: inline-block;
    margin-top: 16px;
    padding: 8px 16px;
    background: #E8F5EC;
    border: 1px solid #2D8B5E;
    border-radius: 6px;
    color: #1A4D2E;
    font-family: Menlo, monospace;
    font-size: 10pt;
  }
`;

async function main() {
  console.log("Reading", INPUT_MD);
  const md = await readFile(INPUT_MD, "utf8");

  console.log("Converting markdown to HTML...");
  const bodyHtml = mdToHtml(md);

  const cover = `
    <div class="cover">
      <h1 class="cover-title">MAHJ</h1>
      <p class="cover-subtitle">${TITLE} &mdash; ${SUBTITLE}</p>
      <div class="cover-url">https://web-nine-nu-qqd4wog6yi.vercel.app</div>
    </div>
  `;

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MAHJ — Launch Posts</title>
  <style>${CSS}</style>
</head>
<body>
  ${cover}
  ${bodyHtml}
</body>
</html>`;

  console.log("Writing temp HTML to", TEMP_HTML);
  await writeFile(TEMP_HTML, fullHtml, "utf8");

  if (!existsSync(CHROME)) {
    throw new Error(`Chrome not found at ${CHROME}`);
  }

  console.log("Rendering PDF with Chrome headless...");
  const absTemp = new URL(TEMP_HTML, `file://${process.cwd()}/`).href;
  const absOutput = `${process.cwd()}/${OUTPUT_PDF}`;

  execSync(
    `"${CHROME}" --headless=new --disable-gpu --no-sandbox ` +
    `--print-to-pdf="${absOutput}" ` +
    `--print-to-pdf-no-header ` +
    `--virtual-time-budget=3000 ` +
    `"${absTemp}"`,
    { stdio: "inherit" }
  );

  console.log("\n✓ PDF saved to", OUTPUT_PDF);
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
