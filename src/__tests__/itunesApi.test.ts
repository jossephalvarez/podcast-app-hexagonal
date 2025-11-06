import { fetchJSON } from '../infraestructure/api/itunesApi';

describe('fetchJSON', () => {
  it('returns parsed JSON on ok response', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({ test: true }),
    } as Response;

    global.fetch = jest.fn(async () => mockResponse) as unknown as typeof fetch;

    const res = await fetchJSON('mock-url');
    expect(res).toEqual({ test: true });
  });

  it('throws error if response not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
    } as Response;

    global.fetch = jest.fn(async () => mockResponse) as unknown as typeof fetch;

    await expect(fetchJSON('mock-url')).rejects.toThrow('HTTP 500');
  });
});
