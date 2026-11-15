// Kleine statische server om de site lokaal te bekijken: node serve.mjs [poort]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve('.');
const port = Number(process.argv[2]) || 4400;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2',
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = join(root, normalize(path).replace(/^(\.\.[/\\])+/, ''));
    if (!file.startsWith(root)) { res.writeHead(403).end('Verboden'); return; }
    try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch {}
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(body);
  } catch {
    // val terug op de 404-pagina van de site waar die er is
    for (const page of ['a-holiher/404.html', '404.html']) {
      try {
        const body = await readFile(join(root, page));
        res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
        res.end(body);
        return;
      } catch {}
    }
    res.writeHead(404).end('Niet gevonden');
  }
}).listen(port, '0.0.0.0', () => console.log(`serving ${root} op http://localhost:${port}/`));
