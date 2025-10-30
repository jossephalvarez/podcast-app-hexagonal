import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './presentation/router/Router';

export function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h1>🎧 Podcast App</h1>
      </header>

      <main style={{ padding: '2rem' }}>
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}
