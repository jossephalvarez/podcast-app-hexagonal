import { Podcast } from '../entities/Podcast';
import { Episode } from '../entities/Episode';

export interface PodcastRepository {
  getTopPodcasts(): Promise<Podcast[]>;
  getPodcastDetail(id: string): Promise<{ podcast: Podcast; episodes: Episode[] }>;
}
