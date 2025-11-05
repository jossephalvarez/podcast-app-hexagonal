import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { useFetchWithCache } from '../application/hooks/useFetchWithCache';
import { LoadingProvider } from '../application/context/LoadingContext';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LoadingProvider>{children}</LoadingProvider>
);

describe('useFetchWithCache', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('fetches and caches data on first call', async () => {
    const mockFetcher = jest.fn(async () => ['podcast1', 'podcast2']);

    const { result } = renderHook(() => useFetchWithCache('key1', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(['podcast1', 'podcast2']));
    expect(mockFetcher).toHaveBeenCalledTimes(1);

    const cached = JSON.parse(localStorage.getItem('key1') || '{}');
    expect(cached.data).toEqual(['podcast1', 'podcast2']);
  });

  it('returns cached data if within TTL and refreshes in background', async () => {
    const mockFetcher = jest.fn(async () => ['freshData']);
    const now = Date.now();
    localStorage.setItem('key2', JSON.stringify({ data: ['cachedData'], timestamp: now }));

    const { result } = renderHook(() => useFetchWithCache('key2', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(['cachedData']));
    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });

  it('refetches if cache expired', async () => {
    const mockFetcher = jest.fn(async () => ['newData']);
    const expired = Date.now() - 25 * 60 * 60 * 1000; // 25h ago

    localStorage.setItem('key3', JSON.stringify({ data: ['oldData'], timestamp: expired }));

    const { result } = renderHook(() => useFetchWithCache('key3', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(['newData']));
    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });

  it('handles fetch errors gracefully', async () => {
    const mockFetcher = jest.fn(async () => {
      throw new Error('Network failed');
    });

    const { result } = renderHook(() => useFetchWithCache('key4', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.error).toBe('Network failed'));
    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });

  it('aborts previous request when key changes', async () => {
    const abortSpy = jest.fn();
    const mockFetcher = jest.fn(
      async (signal?: AbortSignal) =>
        new Promise((_resolve, _reject) => {
          signal?.addEventListener('abort', abortSpy);
        })
    );

    const { rerender } = renderHook(({ key }) => useFetchWithCache(key, mockFetcher), {
      wrapper,
      initialProps: { key: 'first' },
    });

    rerender({ key: 'second' });

    await waitFor(() => expect(abortSpy).toHaveBeenCalled());
  });

  it('ignores AbortError without setting error', async () => {
    const abortError = { name: 'AbortError', message: 'Aborted' };
    const mockFetcher = jest.fn(async () => {
      throw abortError;
    });

    const { result } = renderHook(() => useFetchWithCache('key5', mockFetcher), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });
    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });
  it('refreshes background cache after returning cached data', async () => {
    const oldTimestamp = Date.now();
    const mockFetcher = jest.fn(async () => ['updatedData']);
    localStorage.setItem('key6', JSON.stringify({ data: ['oldCache'], timestamp: oldTimestamp }));

    renderHook(() => useFetchWithCache('key6', mockFetcher), { wrapper });

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('key6') || '{}');
      expect(stored.data).toEqual(['updatedData']);
    });

    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });
});
