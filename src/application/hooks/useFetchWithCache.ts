import { useEffect, useState } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export function useFetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 24 * 60 * 60 * 1000 // 24h
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, timestamp }: CacheEntry<T> = JSON.parse(cached);
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

  return { data, loading, error };
}
