import { data as pidginArticleData } from '#data/pidgin/articles/cw0x29n2pvqo.json';
import { data as mundoLiveData } from '#data/mundo/live/cemn2qq3x8vt.json';
import { extractArticleData, extractLiveData } from '.';

describe('extractArticleData', () => {
  beforeEach(() => {
    delete process.env.SIMORGH_ICHEF_BASE_URL;
  });

  it('should return correct data object for an article', () => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.bbci.co.uk';

    const result = extractArticleData({
      // @ts-expect-error - fixture data
      pageData: pidginArticleData,
      service: 'pidgin',
    });

    expect(result).toEqual({
      backgroundImage:
        'https://ichef.bbci.co.uk/news/1024/branded_pidgin/1a8b/live/c4ce3eb0-98a5-11ed-86bf-4b2f5da2cf01.jpg',
      isInTopStories: false,
      isInMostRead: false,
    });
  });

  it('should return isInTopStories=true when article is in top stories', () => {
    const result = extractArticleData({
      pageData: {
        // @ts-expect-error - fixture data
        article: pidginArticleData.article,
        secondaryData: {
          // @ts-expect-error - mocking data
          topStories: [{ id: 'urn:bbc:pidgin:cw0x29n2pvqo' }],
        },
      },
      service: 'pidgin',
    });

    expect(result.isInTopStories).toBe(true);
  });

  it('should return isInMostRead=true when article is in most read', () => {
    const result = extractArticleData({
      pageData: {
        // @ts-expect-error - fixture data
        article: pidginArticleData.article,
        secondaryData: {
          topStories: [],
          // @ts-expect-error - mocking data
          mostRead: { items: [{ id: 'urn:bbc:pidgin:cw0x29n2pvqo' }] },
        },
      },
      service: 'pidgin',
    });

    expect(result.isInMostRead).toBe(true);
  });
});

describe('extractLiveData', () => {
  beforeEach(() => {
    delete process.env.SIMORGH_ICHEF_BASE_URL;
  });

  it('should return correct data object for a live page', () => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.bbci.co.uk';

    const result = extractLiveData({
      pageData: mundoLiveData,
      service: 'mundo',
    });

    expect(result).toEqual({
      backgroundImage:
        'https://ichef.bbci.co.uk/news/1024/branded_mundo/e93e/test/cf378ef0-82cf-11ee-a4f7-81d33ca36b1f.jpg',
      isLive: false,
    });
  });

  it('should return isLive=true when pageData.isLive is true', () => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.bbci.co.uk';

    const result = extractLiveData({
      pageData: { ...mundoLiveData, isLive: true },
      service: 'mundo',
    });

    expect(result).toEqual({
      backgroundImage:
        'https://ichef.bbci.co.uk/news/1024/branded_mundo/e93e/test/cf378ef0-82cf-11ee-a4f7-81d33ca36b1f.jpg',
      isLive: true,
    });
  });
});
