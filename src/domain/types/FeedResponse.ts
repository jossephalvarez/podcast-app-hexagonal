export interface FeedEntry {
  id: { attributes: { 'im:id': string } };
  'im:name': { label: string };
  'im:artist': { label: string };
  'im:image': { label: string }[];
  summary?: { label: string };
}

export interface FeedResponse {
  feed: { entry: FeedEntry[] };
}
