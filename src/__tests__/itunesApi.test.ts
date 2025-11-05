import { fetchJSON } from '../infraestructure/api/itunesApi';

describe('fetchJSON', () => {
  it('returns parsed JSON on ok response', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ test: true }) })
    ) as any;

    const res = await fetchJSON('mock-url');
    expect(res).toEqual({ test: true });
  });

  it('throws error if response not ok', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 500 })) as any;

    await expect(fetchJSON('mock-url')).rejects.toThrow('HTTP 500');
  });
});
