import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { PodcastDetail } from '../pages/PodcastDetail';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
    </Routes>
  );
};
