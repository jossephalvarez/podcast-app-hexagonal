import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '../presentation/components/Sidebar/Sidebar';
import { BrowserRouter } from 'react-router-dom';

describe('Sidebar Component', () => {
  it('renders podcast info', () => {
    const mockPodcast = {
      id: '1',
      title: 'Title',
      author: 'author',
      description: 'Desc',
      image: 'img.png',
    };
    render(
      <BrowserRouter>
        <Sidebar podcast={mockPodcast} />
      </BrowserRouter>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('author')).toBeInTheDocument();
  });
});
