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

  if (loading) return <div className="loading">Loading...</div>;
  return <h1>{data}</h1>;
};

const About = () => (
  <div>
    <h1>About Page</h1>
    <p>This page was server-side rendered with esbuild!</p>
    <p>Check the page source to see the pre-rendered HTML content.</p>
  </div>
);

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;