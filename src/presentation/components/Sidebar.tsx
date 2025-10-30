import React from 'react';
import { Podcast } from '../../domain/entities/Podcast';
import { Link } from 'react-router-dom';

interface SidebarProps {
  podcast: Podcast;
}

export const Sidebar: React.FC<SidebarProps> = ({ podcast }) => {
  return (
    <aside className="sidebar">
      <Link to={`/podcast/${podcast.id}`}>
        <img src={podcast.image} alt={podcast.title} />
      </Link>
      <h3>{podcast.title}</h3>
      <p>
        <em>{podcast.author}</em>
      </p>
      <p>{podcast.description}</p>
    </aside>
  );
};
