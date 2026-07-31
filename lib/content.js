import fs from 'node:fs';
import path from 'node:path';

/**
 * A tiny file-based content layer for case studies and journal posts.
 *
 * Each entry is a markdown file with a YAML-ish front matter block:
 *
 *   ---
 *   title: The Grange Golf Club
 *   date: 2026-03-11
 *   summary: More leads than they could keep up with.
 *   client: The Grange Golf Club
 *   services: Marketing Strategy, Digital Advertising
 *   image: /photos/boardroom.webp
 *   ---
 *
 *   Body copy in markdown…
 *
 * Deliberately dependency-free: the parser handles the small subset of
 * markdown these pages need. If the content grows past that — tables,
 * embeds, per-post components — swap this for MDX rather than extending it.
 */

const ROOT = path.join(process.cwd(), 'content');

function parseFrontMatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (key === 'services' || key === 'tags') {
      data[key] = value ? value.split(',').map((v) => v.trim()).filter(Boolean) : [];
    } else {
      data[key] = value;
    }
  }
  return { data, body: match[2] };
}

/** Markdown → HTML for the subset used here: headings, bold, italic, links, lists. */
function renderMarkdown(md) {
  const escape = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const inline = (s) =>
    escape(s)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');

  const blocks = md.trim().split(/\r?\n\r?\n+/);
  return blocks
    .map((block) => {
      const lines = block.split(/\r?\n/);

      const heading = /^(#{2,4})\s+(.*)$/.exec(lines[0]);
      if (heading && lines.length === 1) {
        const level = heading[1].length;
        return `<h${level}>${inline(heading[2])}</h${level}>`;
      }

      if (lines.every((l) => /^[-*]\s+/.test(l))) {
        const items = lines.map((l) => `<li>${inline(l.replace(/^[-*]\s+/, ''))}</li>`).join('');
        return `<ul>${items}</ul>`;
      }

      if (lines.every((l) => /^>\s?/.test(l))) {
        return `<blockquote>${inline(lines.map((l) => l.replace(/^>\s?/, '')).join(' '))}</blockquote>`;
      }

      return `<p>${inline(lines.join(' '))}</p>`;
    })
    .join('\n');
}

function readCollection(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];

  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { data, body } = parseFrontMatter(fs.readFileSync(path.join(abs, file), 'utf8'));
      return {
        slug: data.slug || file.replace(/\.md$/, ''),
        ...data,
        html: renderMarkdown(body),
      };
    })
    .sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')));
}

export const getCaseStudies = () => readCollection('work');
export const getPosts = () => readCollection('blog');
export const getCaseStudy = (slug) => getCaseStudies().find((e) => e.slug === slug);
export const getPost = (slug) => getPosts().find((e) => e.slug === slug);

export function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}
