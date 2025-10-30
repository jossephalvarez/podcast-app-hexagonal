import React from 'react';
import { usePodcasts } from '../../application/hooks/usePodcasts';
import { GetTopPodcasts } from '../../domain/usecases/GetTopPodcasts';
import { PodcastCard } from '../components/PodcastCard';
import { PodcastApiRepository } from '../../infraestructure/repositories/PodcastApiRepository';

const repo = new PodcastApiRepository();
const getTopPodcasts = new GetTopPodcasts(repo);

export const Home: React.FC = () => {
  const { podcasts, filter, setFilter } = usePodcasts(getTopPodcasts);

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
