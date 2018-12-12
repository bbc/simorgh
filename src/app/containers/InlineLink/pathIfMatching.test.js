import pathIfMatching from './pathIfMatching';

describe('pathIfMatching', () => {
  it('should return news if url matches path', () => {
    const value = pathIfMatching('/:service(news)', 'https://www.bbc.com/news');
    expect(value).toEqual('/news');
  });

  it('should return path if url matches news article amp pathRegex', () => {
    const value = pathIfMatching(
      '/:service(news|persian)/articles/:id(c[a-zA-Z0-9]{10}o):amp(.amp)?',
      'https://www.bbc.com/news/articles/c9rpqy7pmypo.amp',
    );
    expect(value).toEqual('/news/articles/c9rpqy7pmypo.amp');
  });

  it('should return null if url does not match pathRegex', () => {
    const value = pathIfMatching(
      '/:service(news)',
      'https://www.bbc.com/weather',
    );
    expect(value).toEqual(null);
  });

  it("should return null if url doesn't match article pathRegex", () => {
    const value = pathIfMatching(
      '/:service(news|persian)/articles/:id(c[a-zA-Z0-9]{10}o):amp(.amp)?',
      'https://www.bbc.com/news',
    );
    expect(value).toEqual(null);
  });
});
