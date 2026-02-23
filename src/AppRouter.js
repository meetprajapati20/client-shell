import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const loadSafeModule = (importPromise) => {
  return lazy(() => importPromise.catch(() => ({
    default: () => <div style={{padding: '2rem'}}>🚫 Module Not Available Locally</div>
  })));
};


const Module1 = loadSafeModule(import('./modules/client-module1/src/index.js'));
const Module2 = loadSafeModule(import('./modules/client-module2/src/index.js'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home (Shell)</Link>
        <Link to="/module1" style={{ marginRight: '1rem' }}>Module 1</Link>
        <Link to="/module2">Module 2 (Missing)</Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<h1>Zetta Dashboard</h1>} />
          <Route path="/module1/*" element={<Module1 />} />
          <Route path="/module2/*" element={<Module2 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}