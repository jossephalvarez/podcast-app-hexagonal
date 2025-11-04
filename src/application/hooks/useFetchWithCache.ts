import { useEffect, useRef, useState } from 'react';
import { useLoading } from './useLoading';

export function useFetchWithCache<T>(
  key: string,
  fetcher: (signal?: AbortSignal) => Promise<T>,
  ttl = 24 * 60 * 60 * 1000
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const aborter = new AbortController();
    abortRef.current = aborter;

    setLoading(true);
    const cached = localStorage.getItem(key);

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ttl) {
        setData(data);
        setLoading(false);
        fetcher(aborter.signal)
          .then((fresh) =>
            localStorage.setItem(key, JSON.stringify({ data: fresh, timestamp: Date.now() }))
          )
          .catch(() => {});
        return () => aborter.abort();
      }
    }

    fetcher(aborter.signal)
      .then((result) => {
        setData(result);
        localStorage.setItem(key, JSON.stringify({ data: result, timestamp: Date.now() }));
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => aborter.abort();
  }, [key]);

  return { data, error };
}
