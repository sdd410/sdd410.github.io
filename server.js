const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  let filePath = path.join(__dirname, safePath);

  // Folders behave like GitHub Pages: /apps/stick/ serves its index.html,
  // and /apps/stick (no slash) redirects to /apps/stick/.
  try {
    if (fs.statSync(filePath).isDirectory()) {
      if (!urlPath.endsWith('/')) {
        res.writeHead(301, { Location: urlPath + '/' });
        res.end();
        return;
      }
      filePath = path.join(filePath, 'index.html');
    }
  } catch (_) {
    // Missing path: readFile below answers 404.
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Content-Length': data.length
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  Sidharth Sreekumar - Portfolio Live`);
  console.log(`  Running at: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
