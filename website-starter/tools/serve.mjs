// Local preview of the built site:  node tools/serve.mjs [port]   then open http://localhost:4500
// Run `node build.mjs` first (and again after every change).
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)), 'site');
const port = Number(process.argv[2]) || 4500;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.txt': 'text/plain', '.xml': 'application/xml' };

createServer((req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, p);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!file.startsWith(root) || !existsSync(file)) {
    res.writeHead(404, { 'content-type': types['.html'] });
    return res.end(existsSync(join(root, '404.html')) ? readFileSync(join(root, '404.html')) : 'Not found');
  }
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`Preview on http://localhost:${port}  (serving site/)`));
