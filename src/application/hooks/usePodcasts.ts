import { useEffect, useState } from 'react';
import { Podcast } from '../../domain/entities/Podcast';
import { PodcastApiRepository } from '../../infraestructure/repositories/PodcastApiRepository';
import { GetTopPodcasts } from '../../domain/usecases/GetTopPodcasts';

export function usePodcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const repo = new PodcastApiRepository();
    const useCase = new GetTopPodcasts(repo);

    (async () => {
      try {
        const data = await useCase.execute();
        setPodcasts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { podcasts, loading, error };
}
