import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProps } from '../types/sidebar.types';

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
