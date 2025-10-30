import { useEffect, useState } from 'react';
import { useLoading } from './useLoading';

export function useFetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 24 * 60 * 60 * 1000
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const cached = localStorage.getItem(key);
    setLoading(true);

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ttl) {
        setData(data);
        setLoading(false);
        return;
      }
    }

    fetcher()
      .then((result) => {
        setData(result);
        localStorage.setItem(key, JSON.stringify({ data: result, timestamp: Date.now() }));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [key]);

  return { data, error };
}
