import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './presentation/router/Router';
import { Header } from './presentation/components/Header';
import { LoadingProvider } from './application/context/LoadingContext';
import { ErrorBoundary } from './presentation/components/ErrorBoundary';

export function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <ErrorBoundary>
          <Header />
          <AppRouter />
        </ErrorBoundary>
      </LoadingProvider>
    </BrowserRouter>
  );
}
