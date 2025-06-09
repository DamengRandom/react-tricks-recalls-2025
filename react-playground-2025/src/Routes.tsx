import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import UseEffect from './components/UseEffect';
import Settings from './pages/Settings';
import QA from './pages/QA';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/qa" element={<QA />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/use-effect" element={<UseEffect />} />
    </Routes>
  );
}

export default AppRoutes;
