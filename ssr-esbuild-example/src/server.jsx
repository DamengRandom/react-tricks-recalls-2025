import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 8549;

// Serve static files
app.use('/static', express.static(path.resolve(__dirname, 'static')));

// SSR Route Handler
app.get('*', async (req, res) => {
  try {
    // 1. Render React app to string
    const appHtml = renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    );

    // 2. Read HTML template
    const indexFile = path.resolve(__dirname, 'index.html');
    const template = fs.readFileSync(indexFile, 'utf8');

    // 3. Inject rendered app into template
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // 4. Send complete HTML
    res.send(html);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SSR Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${path.resolve(__dirname, 'static')}`);
  console.log(`📄 Using HTML template: ${path.resolve(__dirname, 'index.html')}`);
});