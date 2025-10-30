export interface PodcastDetailResponse {
  results: PodcastResult[];
}

export interface PodcastResult {
  wrapperType: string;
  kind?: string;
  collectionId: number;
  trackId?: number;
  trackName?: string;
  collectionName?: string;
  artistName?: string;
  releaseDate?: string;
  trackTimeMillis?: number;
  description?: string;
  episodeUrl?: string;
  artworkUrl600?: string;
}
