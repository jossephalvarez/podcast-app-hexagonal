import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './presentation/router/Router';
import { LoadingProvider } from './application/context/LoadingContext';
import { Header } from './presentation/components/Header';

export function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <Header />
        <AppRouter />
      </LoadingProvider>
    </BrowserRouter>
  );
}
