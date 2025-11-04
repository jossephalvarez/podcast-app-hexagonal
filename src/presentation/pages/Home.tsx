import React from 'react';
import { usePodcasts } from '../../application/hooks/usePodcasts';
import { PodcastCard } from '../components/PodcastCard';
import { ErrorBox } from '../components/ErrorBox';

export const Home = () => {
  const { podcasts, filter, setFilter, error } = usePodcasts();

  if (error) return <ErrorBox message={error} />;

  return (
    <main className="home">
      <div className="filter-bar">
        <span className="counter">{podcasts.length}</span>
        <label htmlFor="filter" className="sr-only">
          Filter podcasts
        </label>
        <input
          id="filter"
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
export default Home;
