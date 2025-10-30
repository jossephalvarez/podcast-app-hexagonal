import React from 'react';
import { usePodcasts } from '../../application/hooks/usePodcasts';
import { PodcastCard } from '../components/PodcastCard';

export const Home = () => {
  const { podcasts, filter, setFilter, loading, error } = usePodcasts();

  if (loading) return <p>Loading podcasts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="home">
      <div className="filter-bar">
        <span className="counter">{podcasts.length}</span>
        <input
          type="text"
          placeholder="Filter podcasts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="podcast-grid">
        {podcasts.map((p) => (
          <PodcastCard key={p.id} podcast={p} />
        ))}
      </div>
    </main>
  );
};
