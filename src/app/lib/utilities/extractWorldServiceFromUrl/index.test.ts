import extractServiceFromUrl from '.';

describe('extractServiceFromUrl', () => {
  it('should return correct service for WS service URLs', () => {
    const testCases = [
      { url: 'http://localhost:7081/ws/languages', expected: 'ws' },
      {
        url: 'http://localhost:7080/pidgin/topics/c404v061z85t',
        expected: 'pidgin',
      },
      {
        url: 'http://localhost:7080/pidgin/popular/read',
        expected: 'pidgin',
      },
      { url: 'http://localhost:7080/pidgin', expected: 'pidgin' },
      { url: 'https://www.test.bbc.com/ws/languages', expected: 'ws' },
      { url: 'https://www.test.bbc.com/mundo', expected: 'mundo' },
      { url: 'https://www.bbc.com/ws/languages', expected: 'ws' },
      { url: 'https://www.bbc.com/mundo', expected: 'mundo' },
      { url: 'https://www.bbc.com/mundo.lite', expected: 'mundo' },
      { url: 'https://www.bbc.com/serbian/lat', expected: 'serbian' },
      { url: 'https://www.bbc.com/zhongwen/simp', expected: 'zhongwen' },
      {
        url: 'https://www.bbc.com/mundo/articles/cx2qdvwy882o.lite',
        expected: 'mundo',
      },
      {
        url: 'https://www.bbc.com/mundo/articles/cx2qdvwy882o.amp',
        expected: 'mundo',
      },
    ];

    testCases.forEach(({ url, expected }) => {
      expect(extractServiceFromUrl(url)).toBe(expected);
    });
  });

  it('should return null for non-WS services', () => {
    expect(extractServiceFromUrl('https://www.bbc.com/news')).toBeNull();
    expect(extractServiceFromUrl('https://www.bbc.com/sport')).toBeNull();
  });
});
