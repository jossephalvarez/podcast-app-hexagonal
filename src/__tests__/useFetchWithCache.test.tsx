import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
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

  it('fetches data and caches it on first call', async () => {
    const mockFetcher = jest.fn(async () => ['podcast1', 'podcast2']);

    const { result } = renderHook(() => useFetchWithCache('key1', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.data).not.toBeNull());
    expect(result.current.data).toEqual(['podcast1', 'podcast2']);
    expect(mockFetcher).toHaveBeenCalledTimes(1);

    const cached = JSON.parse(localStorage.getItem('key1') || '{}');
    expect(cached.data).toEqual(['podcast1', 'podcast2']);
  });

  it('reuses cached data when within TTL', async () => {
    const mockFetcher = jest.fn(async () => ['fromFetch']);
    const now = Date.now();

    localStorage.setItem('key2', JSON.stringify({ data: ['fromCache'], timestamp: now }));

    const { result } = renderHook(() => useFetchWithCache('key2', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(['fromCache']));
    expect(mockFetcher).not.toHaveBeenCalled();
  });

  it('refetches when cache is expired', async () => {
    const mockFetcher = jest.fn(async () => ['newData']);
    const oldTimestamp = Date.now() - 25 * 60 * 60 * 1000; // 25h ago

    localStorage.setItem('key3', JSON.stringify({ data: ['oldData'], timestamp: oldTimestamp }));

    const { result } = renderHook(() => useFetchWithCache('key3', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(['newData']));
    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });

  it('handles fetch errors and sets error message', async () => {
    const mockFetcher = jest.fn(async () => {
      throw new Error('Network failed');
    });

    const { result } = renderHook(() => useFetchWithCache('key4', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.error).toBe('Network failed'));
    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });
});
