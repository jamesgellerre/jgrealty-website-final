import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { HOME_DESCRIPTION, llmsText, SALES_DESCRIPTION, SITE_NAME, SITE_URL } from '../src/site.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const serverEntry = path.join(dist, 'server', 'entry-server.js');
const { render } = await import(pathToFileURL(serverEntry).href) as { render: (pathname: string) => string };

const pages = [
  {
    pathname: '/',
    outfile: path.join(dist, 'index.html'),
    title: SITE_NAME,
    canonical: `${SITE_URL}/`,
    description: HOME_DESCRIPTION,
  },
  {
    pathname: '/sales',
    outfile: path.join(dist, 'sales', 'index.html'),
    title: `Past Sales | ${SITE_NAME}`,
    canonical: `${SITE_URL}/sales`,
    description: SALES_DESCRIPTION,
  },
];

for (const page of pages) {
  const appHtml = render(page.pathname);
  let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  html = html
    .replace('<title>James Geller Realty</title>', `<title>${page.title}</title>`)
    .replaceAll('content="James Geller Realty"', `content="${page.title}"`)
    .replaceAll(`content="${HOME_DESCRIPTION}"`, `content="${page.description}"`)
    .replace(
      `<link rel="canonical" href="${SITE_URL}/" />`,
      `<link rel="canonical" href="${page.canonical}" />`,
    )
    .replace(
      `<meta property="og:url" content="${SITE_URL}/" />`,
      `<meta property="og:url" content="${page.canonical}" />`,
    );

  fs.mkdirSync(path.dirname(page.outfile), { recursive: true });
  fs.writeFileSync(page.outfile, html);
  console.log('prerendered', page.pathname, html.length);
}

const llms = llmsText();
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);
fs.writeFileSync(path.join(root, 'public', 'llms.txt'), llms);
console.log('wrote llms.txt');
