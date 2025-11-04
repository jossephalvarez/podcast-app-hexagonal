import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';

const Home = lazy(() => import('../pages/Home'));
const PodcastDetail = lazy(() => import('../pages/PodcastDetail'));
const EpisodeDetail = lazy(() => import('../pages/EpisodeDetail'));

export const AppRouter = () => (
  <Suspense fallback={<div style={{ padding: '1rem' }}>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
      <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);
