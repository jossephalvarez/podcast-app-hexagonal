import { PodcastRepository } from '../../domain/repositories/PodcastRepository';
import { Podcast } from '../../domain/entities/Podcast';
import { fetchJSON, urls } from '../api/itunesApi';

interface FeedResponse {
  feed: {
    entry: {
      id: { attributes: { 'im:id': string } };
      'im:name': { label: string };
      'im:artist': { label: string };
      'im:image': { label: string }[];
    }[];
  };
}

export class PodcastApiRepository implements PodcastRepository {
  async getTopPodcasts(): Promise<Podcast[]> {
    const data = await fetchJSON<FeedResponse>(urls.top100);
    return data.feed.entry.map(
      (e) =>
        new Podcast(
          e.id.attributes['im:id'],
          e['im:name'].label,
          e['im:artist'].label,
          e['im:image'].at(-1)?.label ?? ''
        )
    );
  }
}
