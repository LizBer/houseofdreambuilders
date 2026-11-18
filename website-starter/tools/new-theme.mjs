// Start a new look:  node tools/new-theme.mjs <name> "<Label>" [route]
//   route is a note about how the design was made: awwwards | hallmark | inspiration | custom
// It copies the "warm" theme so there is a working starting point, then you (or Claude) restyle it.
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const [name, label, route = 'custom'] = process.argv.slice(2);
if (!name || !/^[a-z0-9-]+$/.test(name)) { console.error('Usage: node tools/new-theme.mjs <name-in-lowercase> "<Label>" [awwwards|hallmark|inspiration|custom]'); process.exit(2); }
const dest = join(root, 'themes', name);
if (existsSync(dest)) { console.error(`themes/${name} already exists.`); process.exit(2); }

cpSync(join(root, 'themes/warm'), dest, { recursive: true });
const meta = JSON.parse(readFileSync(join(dest, 'theme.json'), 'utf8'));
Object.assign(meta, { label: label || name, route, description: '' });
writeFileSync(join(dest, 'theme.json'), JSON.stringify(meta, null, 2) + '\n');
console.log(`Created themes/${name}/ (a copy of "warm").\n\nNext:\n  1. Restyle themes/${name}/theme.css (see docs/themes.md for the class names and the rules)\n  2. Fill in "description" in themes/${name}/theme.json\n  3. node build.mjs --theme ${name}     (or --all to compare every look side by side)`);
