import { useParams } from 'react-router-dom';
import { useFetchWithCache } from './useFetchWithCache';
import { GetPodcastDetail } from '../../domain/usecases/GetTopPodcastDetail';
import { PodcastApiRepository } from '../../infraestructure/repositories/PodcastApiRepository';

const repo = new PodcastApiRepository();
const getPodcastDetail = new GetPodcastDetail(repo);

export const useEpisodeDetail = () => {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();
  const { data, error } = useFetchWithCache(`podcast_${podcastId}`, () =>
    getPodcastDetail.execute(podcastId!)
  );

  const episode = data?.episodes.find((ep) => ep.id === episodeId);
  const podcast = data?.podcast;

  return { podcast, episode, error };
};
