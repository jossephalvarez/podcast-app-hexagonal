import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../presentation/router/Router';
import { LoadingProvider } from '../application/context/LoadingContext';
import { Header } from '../presentation/components/Header';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        feed: {
          entry: [
            {
              id: { attributes: { 'im:id': '1' } },
              'im:name': { label: 'Podcast 1' },
              'im:artist': { label: 'Author 1' },
              summary: { label: 'Summary' },
              'im:image': [{ label: 'img1' }, { label: 'img2' }, { label: 'img3' }],
            },
          ],
        },
      }),
  })
) as jest.Mock;

describe('E2E Flow', () => {
  it('renders Home and navigates to PodcastDetail', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <LoadingProvider>
          <Header />
          <AppRouter />
        </LoadingProvider>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/podcast 1/i)).toBeInTheDocument());

    fireEvent.click(screen.getByText(/podcast 1/i));

    expect(screen.getByText(/podcast app/i)).toBeInTheDocument();
  });
});
