import { useEffect, useState, useMemo } from 'react';
import { GetTopPodcasts } from '../../domain/usecases/GetTopPodcasts';
import { Podcast } from '../../domain/entities/Podcast';

const CACHE_KEY = 'top_podcasts';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 horas

export const usePodcasts = (getTopPodcasts: GetTopPodcasts) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setPodcasts(data);
        return;
      }
    }

    getTopPodcasts.execute().then((data) => {
      setPodcasts(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    });
  }, [getTopPodcasts]);

  const filtered = useMemo(() => {
    const text = filter.toLowerCase();
    return podcasts.filter(
      (p) => p.title.toLowerCase().includes(text) || p.author.toLowerCase().includes(text)
    );
  }, [filter, podcasts]);

  return { podcasts: filtered, filter, setFilter };
};
