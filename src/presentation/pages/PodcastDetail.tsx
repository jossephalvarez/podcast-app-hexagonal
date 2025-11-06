import React from 'react';
import { usePodcastDetail } from '../../application/hooks/usePodcastDetail';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { ErrorBox } from '../components/ErrorBox';

const PodcastDetail = () => {
  const { podcastId } = useParams<{ podcastId: string }>();

  const { data, error } = usePodcastDetail();

  if (error) return <ErrorBox message={error} />;
  if (!data) return null;

  const { podcast, episodes } = data;

  return (
    <div className="podcast-detail">
      <Sidebar podcast={podcast} />
      <section className="episodes">
        <h2>Episodes: {episodes.length}</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((ep) => (
              <tr key={ep.id}>
                <td>
                  <Link to={`/podcast/${podcastId}/episode/${ep.id}`}>{ep.title}</Link>
                </td>
                <td>{ep.date}</td>
                <td>{ep.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
export default PodcastDetail;
