import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const partnerOnlyUrl = 'https://offers.hubspot.com/new-pricing-model-partners-2026';

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

let changed = 0;

for (const file of walk(root)) {
  if (!/\.(?:html|md)$/i.test(file)) continue;

  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes(partnerOnlyUrl)) continue;

  let updated = source;

  if (file.endsWith('.html')) {
    // Remove any public evidence/callout block that cites the partner-only URL.
    updated = updated.replace(
      new RegExp(`<div class="source-note">(?:(?!<\\/div>).)*${partnerOnlyUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:(?!<\\/div>).)*<\\/div>\\s*`, 'gs'),
      ''
    );

    // Remove the partner-only source from public reference lists.
    updated = updated.replace(
      new RegExp(`<li><a href="${partnerOnlyUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>.*?<\\/a><\\/li>\\s*`, 'gs'),
      ''
    );
  } else {
    // Remove an Evidence paragraph/block containing the partner-only URL.
    updated = updated.replace(
      new RegExp(`\\*\\*(?:Evidência|Evidence)\\*\\*\\s{2}\\n(?:(?!\\n\\n).)*${partnerOnlyUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:(?!\\n\\n).)*(?:\\n\\n|$)`, 'gs'),
      ''
    );

    // Remove the partner-only bullet from Sources.
    updated = updated
      .split('\n')
      .filter(line => !line.includes(partnerOnlyUrl))
      .join('\n');
  }

  if (updated.includes(partnerOnlyUrl)) {
    throw new Error(`Partner-only HubSpot URL still present in ${path.relative(root, file)}`);
  }

  fs.writeFileSync(file, updated);
  changed += 1;
}

console.log(`Sanitized partner-only references from ${changed} public content files.`);
