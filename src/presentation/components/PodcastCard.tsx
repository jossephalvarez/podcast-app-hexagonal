import React from 'react';
import { Podcast } from '../../domain/entities/Podcast';
import { Link } from 'react-router-dom';

export const PodcastCard: React.FC<{ podcast: Podcast }> = ({ podcast }) => (
  <Link to={`/podcast/${podcast.id}`} className="podcast-card">
    <img src={podcast.image} alt={podcast.title} />
    <div className="podcast-info">
      <h3>{podcast.title}</h3>
      <p>Author: {podcast.author}</p>
    </div>
  </Link>
);
