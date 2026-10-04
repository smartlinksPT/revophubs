import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const image = '/assets/hubspot-pricing-emea-2026-10-04.webp';

const pages = [
  {
    html: 'pt/articles/hubspot-pricing-credits-emea.html',
    md: 'pt/markdown/articles/hubspot-pricing-credits-emea.md',
    htmlMarker: '<h2 id="credits">',
    mdMarker: '## 5.000, 10.000 e 15.000 créditos incluídos',
    figure: `<figure class="article-evidence"><a href="${image}" aria-label="Abrir screenshot da página de pricing da HubSpot"><img src="${image}" alt="Screenshot da página de pricing da HubSpot na EMEA mostrando os planos Free, Starter, Professional e Enterprise e 5.000, 10.000 e 15.000 HubSpot Credits incluídos por mês." width="800" height="500" loading="lazy" decoding="async"></a><figcaption><strong>Fonte: HubSpot.</strong> Captura da página de pricing EMEA realizada em 04/10/2026. O URL da HubSpot e a data/hora da captura aparecem no próprio screenshot.</figcaption></figure>\n\n`,
    markdown: `![Screenshot da página de pricing da HubSpot na EMEA mostrando os planos e os créditos mensais incluídos.](${image})\n\n*Fonte: HubSpot. Captura da página de pricing EMEA realizada em 04/10/2026. O URL da HubSpot e a data/hora da captura aparecem no próprio screenshot.*\n\n`
  },
  {
    html: 'articles/hubspot-pricing-credits-emea.html',
    md: 'markdown/articles/hubspot-pricing-credits-emea.md',
    htmlMarker: '<h2 id="credits">',
    mdMarker: '## 5,000, 10,000 and 15,000 included credits',
    figure: `<figure class="article-evidence"><a href="${image}" aria-label="Open screenshot of HubSpot's pricing page"><img src="${image}" alt="Screenshot of HubSpot's EMEA pricing page showing Free, Starter, Professional and Enterprise and the included 5,000, 10,000 and 15,000 monthly HubSpot Credits." width="800" height="500" loading="lazy" decoding="async"></a><figcaption><strong>Source: HubSpot.</strong> Captured from the EMEA pricing page on 4 October 2026. The HubSpot URL and capture date/time are visible in the screenshot itself.</figcaption></figure>\n\n`,
    markdown: `![Screenshot of HubSpot's EMEA pricing page showing the plans and included monthly credits.](${image})\n\n*Source: HubSpot. Captured from the EMEA pricing page on 4 October 2026. The HubSpot URL and capture date/time are visible in the screenshot itself.*\n\n`
  }
];

function insertOnce(relative, marker, block) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) throw new Error(`Missing ${relative}`);
  let text = fs.readFileSync(file, 'utf8');
  if (text.includes(image)) return;
  if (!text.includes(marker)) throw new Error(`Marker not found in ${relative}: ${marker}`);
  text = text.replace(marker, block + marker);
  fs.writeFileSync(file, text);
}

for (const page of pages) {
  insertOnce(page.html, page.htmlMarker, page.figure);
  insertOnce(page.md, page.mdMarker, page.markdown);
}

const cssFile = path.join(root, 'content.css');
let css = fs.readFileSync(cssFile, 'utf8');
if (!css.includes('.article-evidence{')) {
  css += `\n.article-evidence{margin:2rem 0 2.25rem}.article-evidence a{display:block}.article-evidence img{display:block;width:100%;height:auto;border:1px solid #DADDE2;border-radius:12px;background:#fff}.article-evidence figcaption{margin-top:.65rem;font-size:.82rem;line-height:1.5;color:#626872}\n`;
  fs.writeFileSync(cssFile, css);
}

console.log('Added dated HubSpot pricing screenshot evidence to PT and EN article versions.');
