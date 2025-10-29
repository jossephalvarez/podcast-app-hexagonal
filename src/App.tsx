import React from 'react';
import { Podcast } from './domain/entities/Podcast';
import { usePodcasts } from './application/hooks/usePodcasts';

export function App() {
  const { podcasts, loading, error } = usePodcasts();

  if (loading) return <p>Loading podcasts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🎧 Top 100 Podcasts</h1>
      <ul>
        {podcasts.map((p: Podcast) => (
          <li key={p.id}>
            {p.title} — {p.author}
          </li>
        ))}
      </ul>
    </main>
  );
}
