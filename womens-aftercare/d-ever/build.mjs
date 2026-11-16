// Bouwt index.html uit content.json met hetzelfde sjabloon dat de pagina
// later in de browser gebruikt. Eén bron, dus geen verschil tussen de twee.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
const hier = dirname(new URL(import.meta.url).pathname);
const code = readFileSync(join(hier, 'template.js'), 'utf8');
new Function(code).call(globalThis);
const d = JSON.parse(readFileSync(join(hier, 'content.json'), 'utf8'));
writeFileSync(join(hier, 'index.html'), globalThis.HOLI.render(d));
console.log('index.html geschreven,', globalThis.HOLI.render(d).length, 'tekens');
