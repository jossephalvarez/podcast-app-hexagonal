import { PodcastRepository } from '../../domain/repositories/PodcastRepository';
import { Podcast } from '../../domain/entities/Podcast';
import { fetchJSON, urls } from '../api/itunesApi';
import { FeedResponse } from '../../domain/types/FeedResponse';
import { Episode } from '../../domain/entities/Episode';
import { PodcastDetailResponse } from '../../domain/types/PodcastDetailResponse';
import { AllOriginsResponse } from '../../domain/types/AllOriginsResponse';

export class PodcastApiRepository implements PodcastRepository {
  async getPodcastDetail(id: string): Promise<{ podcast: Podcast; episodes: Episode[] }> {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
    )}`;

    const data = await fetchJSON<AllOriginsResponse>(url);

    const parsed: PodcastDetailResponse = JSON.parse(data.contents);

    const [podcastData, ...episodeData] = parsed.results;

    const podcast = new Podcast(
      String(podcastData.collectionId ?? podcastData.trackId ?? ''),
      podcastData.collectionName ?? podcastData.trackName ?? 'Unknown title',
      podcastData.artistName ?? 'Unknown author',
      podcastData.description ?? '',
      podcastData.artworkUrl600 ?? ''
    );

    const episodes: Episode[] = episodeData.map((e) => {
      const minutes =
        e.trackTimeMillis != null ? `${Math.round(e.trackTimeMillis / 60000)} min` : '-';
      return new Episode(
        e.trackId?.toString() ?? '',
        e.trackName ?? '',
        e.releaseDate?.slice(0, 10) ?? '',
        minutes,
        e.description ?? '',
        e.episodeUrl ?? ''
      );
    });

    return { podcast, episodes };
  }

  async getTopPodcasts(): Promise<Podcast[]> {
    const data = await fetchJSON<FeedResponse>(urls.top100);
    return data.feed.entry.map(
      (e) =>
        new Podcast(
          e.id.attributes['im:id'],
          e['im:name'].label,
          e['im:artist'].label,
          e.summary?.label ?? '',
          e['im:image'].at(-1)?.label ?? ''
        )
    );
  }
}
