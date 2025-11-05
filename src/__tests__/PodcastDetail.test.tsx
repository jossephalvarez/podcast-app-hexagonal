import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as hook from '../application/hooks/usePodcastDetail';
import PodcastDetail from '../presentation/pages/PodcastDetail';

jest.mock('../application/hooks/usePodcastDetail');

describe('PodcastDetail Page', () => {
  it('renders podcast and episodes correctly', async () => {
    jest.spyOn(hook, 'usePodcastDetail').mockReturnValue({
      data: {
        podcast: {
          id: '1',
          title: 'Test',
          author: 'Tester',
          description: 'Podcast description',
          image: 'image.png',
        },
        episodes: [
          {
            id: 'e1',
            title: 'Ep1',
            date: '2024-12-01',
            duration: '10 min',
            description: 'desc',
            audioUrl: 'url.mp3',
          },
        ],
      },
      error: null,
    });

    render(
      <MemoryRouter>
        <PodcastDetail />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole('heading', { name: /Test/i })).toBeInTheDocument());

    expect(screen.getByText(/Ep1/i)).toBeInTheDocument();
    expect(screen.getByText(/10 min/i)).toBeInTheDocument();
  });

  it('renders error message if hook returns error', () => {
    jest.spyOn(hook, 'usePodcastDetail').mockReturnValue({
      data: null,
      error: 'Something went wrong',
    });

    render(
      <MemoryRouter>
        <PodcastDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('renders HTML description safely', () => {
    jest.spyOn(hook, 'usePodcastDetail').mockReturnValue({
      data: {
        podcast: {
          id: '1',
          title: 'HTML Podcast',
          author: 'Author',
          description: '<p>Hello <b>World</b></p>',
          image: '',
        },
        episodes: [],
      },
      error: null,
    });

    render(
      <MemoryRouter>
        <PodcastDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Hello/)).toBeInTheDocument();
    expect(screen.getByText(/World/)).toBeInTheDocument();
  });
});
