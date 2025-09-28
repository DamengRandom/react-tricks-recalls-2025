import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// Hydrate the server-rendered content
const container = document.getElementById('root');

if (container) {
  hydrateRoot(
    container,
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  console.log('🎉 Client-side hydration completed!');
} else {
  console.error('❌ Root container not found!');
}