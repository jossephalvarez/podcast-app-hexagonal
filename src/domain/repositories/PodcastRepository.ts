import { Podcast } from '../entities/Podcast';

export interface PodcastRepository {
  getTopPodcasts(): Promise<Podcast[]>;
}
