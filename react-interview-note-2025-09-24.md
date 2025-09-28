# React Interview Note 2025-09-24

## Some random quick questions & answers

### create DOM element outside of body: using `createPortal`

```tsx
{createPortal(<div>DOM inside</div>)}
```

### How to pass data from child to parent? (Lite code example)

```tsx
// From parent component:
export default function ParentComponent() {
  const haneleDataFromChild = (data) => {
    setDataFromChild(data);
  }

  return (
    <div>
      <ChildComponent sendDataToParent={haneleDataFromChild} />
    </div>
  )
}

// From child component:
export default function ChildComponent(props) {
  return (
    <button onClick={() => props.sendDataToParent('data from child')}>Send data to parent</button>
  )
}
```

### Code splitting - lazy loading (Lite code example)

- load component on demand, performance enhancement

```tsx
const LazyLoadModal = lazy(() => import('./path/Modal'));

<Suspense fallback={<div>loading...</div>}>
  <LazyLoadModal />
</Suspense>
```

### What is the better way to add a global store to your React app?

- Key note: Common React state managemnt tools: Redux (large scale) + Zustand (small & medium scale)

For Redux: better using `redux-toolkit` (easy for setup and start journey) ~

### React SSR implemnetation (Lite code example)

```tsx
// ============= SERVER SIDE (server.js) =============
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 8549;

// Serve static files
app.use('/static', express.static(path.resolve(__dirname, 'build/static')));

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
    const indexFile = path.resolve(__dirname, 'build/index.html');
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
  console.log(`SSR Server running on http://localhost:${PORT}`);
});

// ============= CLIENT SIDE (client.js) =============
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Hydrate the server-rendered content
const container = document.getElementById('root');
hydrateRoot(
  container,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// ============= SHARED APP COMPONENT (App.tsx) =============
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Sample components
const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData('Welcome to SSR Home!');
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading...</div>;
  return <h1>{data}</h1>;
};

const About = () => (
  <div>
    <h1>About Page</h1>
    <p>This page was server-side rendered!</p>
  </div>
);

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;

// Please check out ssr-esbuld-example for some details check (especially for the esbuild part 🙌 ~)
```

### Render props In React

#### What?

`Render props`: a technique for sharing code between React components using a prop whose value is a function.

- Lite Code example

```tsx
// Parent component
<ChildComponent render={(data) => <div>{data}</div>} />

// Child component
export default function ChildComponent(props) {
  return props.render('data from child');
}
```