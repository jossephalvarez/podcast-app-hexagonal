import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from '../presentation/pages/Home';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from '../application/context/LoadingContext';

import * as usePodcastsHook from '../application/hooks/usePodcasts';

jest.mock('../application/hooks/usePodcasts');

describe('Home Page', () => {
  it('renders list of podcasts and filter input', () => {
    (usePodcastsHook.usePodcasts as jest.Mock).mockReturnValue({
      podcasts: [
        { id: '1', title: 'Title 1', author: 'Author 1', description: '', image: '' },
        { id: '2', title: 'Title 2', author: 'Author 2', description: '', image: '' },
      ],
      filter: '',
      setFilter: jest.fn(),
      error: null,
    });

    render(
      <BrowserRouter>
        <LoadingProvider>
          <Home />
        </LoadingProvider>
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/filter podcasts/i)).toBeInTheDocument();
    expect(screen.getByText(/Title 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Title 2/i)).toBeInTheDocument();
  });

  it('calls setFilter when typing in input', () => {
    const setFilterMock = jest.fn();
    (usePodcastsHook.usePodcasts as jest.Mock).mockReturnValue({
      podcasts: [
        { id: '1', title: 'Title 1', author: 'Author 1', description: '', image: '' },
        { id: '2', title: 'Title 2', author: 'Author 2', description: '', image: '' },
      ],
      filter: '',
      setFilter: setFilterMock,
      error: null,
    });

    render(
      <BrowserRouter>
        <LoadingProvider>
          <Home />
        </LoadingProvider>
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/filter podcasts/i);
    fireEvent.change(input, { target: { value: 'Title 1' } });

    expect(setFilterMock).toHaveBeenCalledWith('Title 1');
  });
});
