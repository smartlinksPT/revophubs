import fs from 'node:fs';
import path from 'node:path';
import { articlePairs } from './content-routes.mjs';

const root = path.resolve('dist');
const dates = {
  'revenue-system': ['2026-10-04', '2026-10-04'],
  'hubspot-pricing-credits-emea': ['2026-10-04', '2026-10-04'],
  'shadow-agents': ['2026-10-04', '2026-10-04'],
  'agent-operating-contract': ['2026-10-04', '2026-10-04'],
  'semantic-debt': ['2026-10-04', '2026-10-04'],
  'workflow-vs-agent': ['2026-10-04', '2026-10-04']
};

for (const pair of articlePairs) {
  const articleDates = dates[pair.id];
  if (!articleDates) continue;
  const [published, modified] = articleDates;
  for (const relative of [pair.enFile, pair.ptFile]) {
    const file = path.join(root, relative);
    if (!fs.existsSync(file)) throw new Error(`Missing article for date correction: ${relative}`);
    const source = fs.readFileSync(file, 'utf8');
    const updated = source.replace(/"datePublished":"[^"]+","dateModified":"[^"]+"/, `"datePublished":"${published}","dateModified":"${modified}"`);
    if (updated === source) throw new Error(`Article schema dates not found in ${relative}`);
    fs.writeFileSync(file, updated);
  }
}

console.log('Corrected structured-data publication dates for October 2026 articles.');
