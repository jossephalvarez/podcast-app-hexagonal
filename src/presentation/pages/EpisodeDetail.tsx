import React from 'react';
import { useEpisodeDetail } from '../../application/hooks/useEpisodeDetail';
import { Sidebar } from '../components/Sidebar';
import { ErrorBox } from '../components/ErrorBox';

const EpisodeDetail = () => {
  const { podcast, episode, error } = useEpisodeDetail();

  if (error) return <ErrorBox message={error} />;
  if (!podcast || !episode) return <p>Loading...</p>;

  return (
    <div>
      <Sidebar podcast={podcast} />
      <main>
        <h2>{episode.title}</h2>
        <p>{episode.date}</p>

        <div dangerouslySetInnerHTML={{ __html: episode.description }} />

        {episode.audioUrl && (
          <audio controls>
            <source src={episode.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </main>
    </div>
  );
};
export default EpisodeDetail;
