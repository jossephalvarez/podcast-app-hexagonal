import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../presentation/router/Router';
import { LoadingProvider } from '../application/context/LoadingContext';
import { Header } from '../presentation/components/Header';
import { ErrorBoundary } from '../presentation/components/ErrorBoundary';

jest.mock('idb-keyval', () => ({
  get: jest.fn(() => Promise.resolve(null)),
  set: jest.fn(() => Promise.resolve()),
}));

beforeEach(() => {
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
});

describe('E2E Flow', () => {
  it('renders Home and navigates to PodcastDetail', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <LoadingProvider>
          <ErrorBoundary>
            <Header />
            <AppRouter />
          </ErrorBoundary>
        </LoadingProvider>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/podcast 1/i)).toBeInTheDocument());
  });
});
