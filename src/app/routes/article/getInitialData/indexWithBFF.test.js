import articleJson from '#data/pidgin/articles/cwl08rd38l6o.json';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import loggerMock from '#testHelpers/loggerMock';
import { DATA_FETCH_ERROR_SECONDARY_COLUMN } from '#lib/logger.const';
import * as fetchPageData from '../../utils/fetchPageData';

import getInitialData from '.';

jest.mock('../../utils/fetchPageData');

const agent = { ca: 'ca', key: 'key' };
const getAgent = jest.fn(() => agent);

describe('articles - getInitialData', () => {
  beforeEach(() => {
    fetchPageData.default.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: articleJson,
      }),
    );
  });

  afterEach(() => jest.resetAllMocks());

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: '/pidgin/articles/cwl08rd38l6o',
      getAgent,
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
    const { pageData } = await getInitialData({
      path: '/pidgin/articles/cwl08rd38l6o',
      getAgent,
      service: 'pidgin',
      pageType: ARTICLE_PAGE,
    });

    expect(pageData.metadata.id).toEqual(articleJson.data.article.metadata.id);
    expect(pageData.secondaryColumn).toEqual(articleJson.data.secondaryData);
  });

  it('should handle secondary column data fetch errors', async () => {
    const noSecondArticle = { ...articleJson };
    delete noSecondArticle.data.secondaryData;

    fetchPageData.default.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: noSecondArticle,
      }),
    );

    const { pageData } = await getInitialData({
      path: '/pidgin/articles/cwl08rd38l6o',
      getAgent,
      service: 'pidgin',
      pageType: ARTICLE_PAGE,
    });

    // When the secondary column fetch fails, pageData should be as expected
    expect(pageData.metadata.id).toEqual(articleJson.data.article.metadata.id);

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
