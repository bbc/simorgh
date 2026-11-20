import rewriteBbcUrls from './index';

const LOCAL_BASE_URL = 'http://localhost:7081';
const TEST_BASE_URL = 'https://www.test.bbc.com';

const articleUrl = 'https://www.bbc.com/pidgin/articles/c0000000000o';

describe('rewriteBbcUrls', () => {
  it('should point BBC service URLs at the local base URL', () => {
    const result = rewriteBbcUrls({
      data: { url: articleUrl },
      baseUrl: LOCAL_BASE_URL,
    });

    expect(result).toEqual({
      url: 'http://localhost:7081/pidgin/articles/c0000000000o?renderer_env=test',
    });
  });

  it('should point BBC service URLs at the test base URL', () => {
    const result = rewriteBbcUrls({
      data: { url: articleUrl },
      baseUrl: TEST_BASE_URL,
    });

    expect(result).toEqual({
      url: 'https://www.test.bbc.com/pidgin/articles/c0000000000o?renderer_env=test',
    });
  });

  it('should ignore a trailing slash on the base URL', () => {
    const result = rewriteBbcUrls({
      data: { url: articleUrl },
      baseUrl: `${LOCAL_BASE_URL}/`,
    });

    expect(result).toEqual({
      url: 'http://localhost:7081/pidgin/articles/c0000000000o?renderer_env=test',
    });
  });

  it.each([
    ['no renderer_env', undefined, 'test'],
    ['null renderer_env', null, 'test'],
    ['test renderer_env', 'test', 'test'],
    ['live renderer_env', 'live', 'live'],
    ['invalid renderer_env', 'local', 'test'],
  ])('should handle %s', (_, rendererEnv, expected) => {
    const result = rewriteBbcUrls({
      data: { url: articleUrl },
      baseUrl: LOCAL_BASE_URL,
      rendererEnv,
    });

    expect(result).toEqual({
      url: `http://localhost:7081/pidgin/articles/c0000000000o?renderer_env=${expected}`,
    });
  });

  it('should override an existing renderer_env on a link', () => {
    const result = rewriteBbcUrls({
      data: { url: `${articleUrl}?renderer_env=live` },
      baseUrl: LOCAL_BASE_URL,
      rendererEnv: 'test',
    });

    expect(result).toEqual({
      url: 'http://localhost:7081/pidgin/articles/c0000000000o?renderer_env=test',
    });
  });

  it('should keep existing query params and the hash', () => {
    const result = rewriteBbcUrls({
      data: { url: `${articleUrl}?foo=bar#comments` },
      baseUrl: LOCAL_BASE_URL,
    });

    expect(result).toEqual({
      url: 'http://localhost:7081/pidgin/articles/c0000000000o?foo=bar&renderer_env=test#comments',
    });
  });

  it.each([
    'bbc.com',
    'www.bbc.co.uk',
    'bbc.co.uk',
    'www.bbcrussian.com',
    'bbcrussian.com',
  ])('should rewrite URLs on %s', host => {
    const result = rewriteBbcUrls({
      data: { url: `https://${host}/pidgin/articles/c0000000000o` },
      baseUrl: LOCAL_BASE_URL,
    });

    expect(result).toEqual({
      url: 'http://localhost:7081/pidgin/articles/c0000000000o?renderer_env=test',
    });
  });

  it.each([
    ['an image host', 'https://ichef.bbci.co.uk/ace/ws/640/image.jpg'],
    ['a non-BBC host', 'https://example.com/pidgin/articles/c0000000000o'],
    ['a non World Service path', 'https://www.bbc.com/fakeservice/uk-12345678'],
    ['a relative path', '/pidgin/articles/c0000000000o'],
    ['plain text', 'Some headline text'],
  ])('should leave %s unchanged', (_, value) => {
    const result = rewriteBbcUrls({
      data: { value },
      baseUrl: LOCAL_BASE_URL,
    });

    expect(result).toEqual({ value });
  });

  it('should rewrite URLs in nested objects and arrays', () => {
    const result = rewriteBbcUrls({
      data: {
        curations: [
          {
            summaries: [
              { link: articleUrl, title: 'Headline' },
              { link: 'https://www.bbc.com/mundo/articles/c1111111111o' },
            ],
          },
        ],
      },
      baseUrl: LOCAL_BASE_URL,
    });

    expect(result).toEqual({
      curations: [
        {
          summaries: [
            {
              link: 'http://localhost:7081/pidgin/articles/c0000000000o?renderer_env=test',
              title: 'Headline',
            },
            {
              link: 'http://localhost:7081/mundo/articles/c1111111111o?renderer_env=test',
            },
          ],
        },
      ],
    });
  });

  it('should keep non-string values as they are', () => {
    const result = rewriteBbcUrls({
      data: { count: 3, isLive: false, empty: null },
      baseUrl: LOCAL_BASE_URL,
    });

    expect(result).toEqual({ count: 3, isLive: false, empty: null });
  });

  it('should not rewrite URLs inside metadata', () => {
    const metadata = { locators: { canonicalLink: articleUrl } };

    const result = rewriteBbcUrls({
      data: { metadata, url: articleUrl },
      baseUrl: LOCAL_BASE_URL,
    });

    expect(result).toEqual({
      metadata,
      url: 'http://localhost:7081/pidgin/articles/c0000000000o?renderer_env=test',
    });
  });

  it('should not add a metadata key when the data has none', () => {
    const result = rewriteBbcUrls({
      data: { url: articleUrl },
      baseUrl: LOCAL_BASE_URL,
    });

    expect(result).not.toHaveProperty('metadata');
  });
});
