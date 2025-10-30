import { useState, useMemo } from 'react';
import { useFetchWithCache } from './useFetchWithCache';
import { GetTopPodcasts } from '../../domain/usecases/GetTopPodcasts';
import { Podcast } from '../../domain/entities/Podcast';
import { PodcastApiRepository } from '../../infraestructure/repositories/PodcastApiRepository';

const repo = new PodcastApiRepository();
const getTopPodcasts = new GetTopPodcasts(repo);

export const usePodcasts = () => {
  const [filter, setFilter] = useState('');
  const { data, error } = useFetchWithCache<Podcast[]>('top_podcasts', () =>
    getTopPodcasts.execute()
  );

  const podcasts = data ?? [];

  const filtered = useMemo(() => {
    const query = filter.toLowerCase();
    return podcasts.filter(
      (p) => p.title.toLowerCase().includes(query) || p.author.toLowerCase().includes(query)
    );
  }, [filter, podcasts]);

  return { podcasts: filtered, filter, setFilter, error };
};
