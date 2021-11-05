import fetchMock from 'fetch-mock';
import articleJson from '#data/pidgin/articles/cwl08rd38l6o.json';
import secondaryColumnJson from '#data/pidgin/secondaryColumn/index.json';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import loggerMock from '#testHelpers/loggerMock';
import { DATA_FETCH_ERROR_SECONDARY_COLUMN } from '#lib/logger.const';

import getInitialData from '.';

describe('articles - getInitialData', () => {
  afterEach(() => fetchMock.reset());

  it('should return essential data for a page to render', async () => {
    fetchMock.mock(
      'http://localhost/pidgin/articles/mock-article-path.json',
      articleJson,
    );
    const { pageData } = await getInitialData({
      path: '/pidgin/articles/mock-article-path',
      service: 'pidgin',
      pageType: ARTICLE_PAGE,
    });

    expect(pageData.metadata.id).toEqual('urn:bbc:ares::article:cwl08rd38l6o');
    expect(pageData.promo.headlines.seoHeadline).toEqual(
      'This is the SEO headline of this test article',
    );
    expect(pageData.metadata.passport.language).toEqual('pcm');
    expect(pageData.content.model.blocks.length).toBeTruthy();
  });

  it('should merge in secondary column data when available', async () => {
    fetchMock.mock(
      'http://localhost/pidgin/articles/mock-article-path.json',
      articleJson,
    );
    fetchMock.mock(
      'http://localhost/pidgin/sty-secondary-column.json',
      secondaryColumnJson,
    );

    const { pageData } = await getInitialData({
      path: '/pidgin/articles/mock-article-path',
      service: 'pidgin',
      pageType: ARTICLE_PAGE,
    });

    expect(pageData.metadata.id).toEqual(articleJson.metadata.id);
    expect(pageData.secondaryColumn).toEqual(secondaryColumnJson);
  });

  it('should handle secondary column data fetch errors', async () => {
    fetchMock.mock(
      'http://localhost/pidgin/articles/mock-article-path.json',
      articleJson,
    );
    fetchMock.mock('http://localhost/pidgin/sty-secondary-column.json', 500);

    const { pageData } = await getInitialData({
      path: '/pidgin/articles/mock-article-path',
      service: 'pidgin',
      pageType: ARTICLE_PAGE,
    });

    // When the secondary column fetch fails, pageData should be as expected
    expect(pageData.metadata.id).toEqual(articleJson.metadata.id);

    // But we set secondaryColumn to null, and log an error
    expect(pageData.secondaryColumn).toBe(null);
    expect(loggerMock.error).toHaveBeenCalledWith(
      DATA_FETCH_ERROR_SECONDARY_COLUMN,
      expect.objectContaining({
        service: 'pidgin',
      }),
    );
  });
});
