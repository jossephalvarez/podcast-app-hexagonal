import { Podcast } from '../entities/Podcast';
import { PodcastRepository } from '../repositories/PodcastRepository';

export class GetTopPodcasts {
  constructor(private readonly repo: PodcastRepository) {}

  async execute(): Promise<Podcast[]> {
    return this.repo.getTopPodcasts();
  }
}
