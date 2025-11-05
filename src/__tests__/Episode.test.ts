import { Episode } from '../domain/entities/Episode';

describe('Episode Entity', () => {
  it('creates a valid episode', () => {
    const e = new Episode('1', 'Title', '2024-12-01', '10 min', 'Desc', 'url.mp3');
    expect(e.id).toBe('1');
    expect(e.title).toBe('Title');
    expect(e.audioUrl).toBe('url.mp3');
  });
});
