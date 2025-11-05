import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchWithCache } from '../application/hooks/useFetchWithCache';
import { LoadingProvider } from '../application/context/LoadingContext';

jest.mock('idb-keyval', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

import { get, set } from 'idb-keyval';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LoadingProvider>{children}</LoadingProvider>
);

describe('useFetchWithCache (IndexedDB version)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('fetches and caches data on first call', async () => {
    const mockFetcher = jest.fn(async () => ['podcast1', 'podcast2']);
    (get as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useFetchWithCache('key1', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(['podcast1', 'podcast2']));
    expect(mockFetcher).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith(
      'key1',
      expect.objectContaining({ data: ['podcast1', 'podcast2'] })
    );
  });

  it('returns cached data if within TTL and refreshes in background', async () => {
    const mockFetcher = jest.fn(async () => ['freshData']);
    const now = Date.now();

    (get as jest.Mock).mockResolvedValueOnce({ data: ['cachedData'], timestamp: now });

    const { result } = renderHook(() => useFetchWithCache('key2', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(['cachedData']));
    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });

  it('refetches if cache expired', async () => {
    const mockFetcher = jest.fn(async () => ['newData']);
    const expired = Date.now() - 25 * 60 * 60 * 1000; // 25h ago

    (get as jest.Mock).mockResolvedValueOnce({ data: ['oldData'], timestamp: expired });

    const { result } = renderHook(() => useFetchWithCache('key3', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(['newData']));
    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });

  it('handles fetch errors gracefully and loads cached data as fallback', async () => {
    const mockFetcher = jest.fn(async () => {
      throw new Error('Network failed');
    });

    (get as jest.Mock)
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({ data: ['cachedBackup'] });

    const { result } = renderHook(() => useFetchWithCache('key4', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.data).toEqual(['cachedBackup']));
    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });

  it('sets error if no cached data and fetch fails', async () => {
    const mockFetcher = jest.fn(async () => {
      throw new Error('Server Down');
    });
    (get as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useFetchWithCache('key5', mockFetcher), { wrapper });

    await waitFor(() => expect(result.current.error).toBe('Server Down'));
  });
  it('refreshes background cache after returning cached data', async () => {
    const oldTimestamp = Date.now();
    const mockFetcher = jest.fn(async () => ['updatedData']);
    (get as jest.Mock).mockResolvedValueOnce({ data: ['oldCache'], timestamp: oldTimestamp });

    renderHook(() => useFetchWithCache('key6', mockFetcher), { wrapper });

    await waitFor(() => {
      expect(set).toHaveBeenCalledWith('key6', expect.objectContaining({ data: ['updatedData'] }));
    });

    expect(mockFetcher).toHaveBeenCalledTimes(1);
  });
});
