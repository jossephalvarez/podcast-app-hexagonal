const PROXY = 'https://api.allorigins.win/raw?url=';

export const urls = {
  top100: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
};

export async function fetchJSON<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch {
    const proxied = await fetch(PROXY + encodeURIComponent(url));
    if (!proxied.ok) throw new Error(`HTTP ${proxied.status}`);
    return proxied.json();
  }
}
