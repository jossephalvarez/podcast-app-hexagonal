import { PodcastRepository } from '../repositories/PodcastRepository';
import { Podcast } from '../entities/Podcast';
import { Episode } from '../entities/Episode';

export class GetPodcastDetail {
  constructor(private repo: PodcastRepository) {}

  async execute(podcastId: string): Promise<{ podcast: Podcast; episodes: Episode[] }> {
    return this.repo.getPodcastDetail(podcastId);
  }
}
