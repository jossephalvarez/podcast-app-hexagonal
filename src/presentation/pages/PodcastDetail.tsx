import React from 'react';
import { usePodcastDetail } from '../../application/hooks/usePodcastDetail';
import { Sidebar } from '../components/Sidebar';

export const PodcastDetail = () => {
  const { data, loading, error } = usePodcastDetail();

  if (loading) return <p>Loading podcast details...</p>;
  if (error) return <p>Error: {error}</p>;
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
                <td>{ep.title}</td>
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
