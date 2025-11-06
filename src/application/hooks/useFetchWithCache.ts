import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';
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
    let isMounted = true;
    const controller = new AbortController();

    const loadData = async () => {
      setLoading(true);

      try {
        const cached = await get<{ data: T; timestamp: number }>(key);
        const now = Date.now();

        if (cached && now - cached.timestamp < ttl) {
          setData(cached.data);
          setLoading(false);
          fetcher()
            .then((fresh) => set(key, { data: fresh, timestamp: Date.now() }))
            .catch(() => {});
          return;
        }

        const fresh = await fetcher();
        if (isMounted) {
          setData(fresh);
          await set(key, { data: fresh, timestamp: now });
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
      } catch (err: never) {
        const cached = await get<{ data: T }>(key);
        if (cached?.data) {
          setData(cached.data);
        } else {
          setError(err.message || 'Error fetching data');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [key]);

  return { data, error };
}
