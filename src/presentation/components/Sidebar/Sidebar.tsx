import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProps } from '../../types/sidebar.types';

export const Sidebar: React.FC<SidebarProps> = ({ podcast }) => {
  return (
    <aside className="sidebar">
      <Link to={`/podcast/${podcast.id}`}>
        <img className="sidebar_img" src={podcast.image} alt={podcast.title} />
      </Link>
      <h3 className="sidebar__title">{podcast.title}</h3>
      <p className="sidebar__author">{podcast.author}</p>
      <p className="sidebar__description">{podcast.description}</p>
    </aside>
  );
};
