import { useParams } from 'react-router-dom';
import { useFetchWithCache } from './useFetchWithCache';
import { PodcastApiRepository } from '../../infraestructure/repositories/PodcastApiRepository';
import { GetPodcastDetail } from '../../domain/usecases/GetTopPodcastDetail';

const repo = new PodcastApiRepository();
const getPodcastDetail = new GetPodcastDetail(repo);

export const usePodcastDetail = () => {
  const { podcastId } = useParams<{ podcastId: string }>();

  const { data, loading, error } = useFetchWithCache(
    `podcast_${podcastId}`,
    () => getPodcastDetail.execute(podcastId!),
    24 * 60 * 60 * 1000 // TTL 24h
  );

  return { data, loading, error };
};
