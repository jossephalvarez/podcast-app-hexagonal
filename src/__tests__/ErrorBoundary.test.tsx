import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../presentation/components/ErrorBoundary';

describe('ErrorBoundary', () => {
  const ProblemChild = () => {
    throw new Error('Error!');
  };

  it('renders fallback UI when a child throws an error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Error!/i)).toBeInTheDocument();

    spy.mockRestore();
  });

  it('renders children normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Normal Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/normal content/i)).toBeInTheDocument();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });
});
