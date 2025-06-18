import { Agent } from 'undici';
import * as fetchPageData from '#app/routes/utils/fetchPageData';
import { BFF_FETCH_ERROR } from '#lib/logger.const';
import pidginArticleWithLatestMedia from '#data/pidgin/articles/cw0x29n2pvqo.json';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#src/testHelpers/loggerMock';

import getInitialData from '.';

process.env.BFF_PATH = 'https://mock-bff-path';

const agent = {
  connect: { cert: 'cert', ca: 'ca', key: 'key' },
} as unknown as Agent;

const mockGetAgent = () => Promise.resolve(agent);

jest.mock('../../../../server/utilities/getAgent', () => jest.fn(mockGetAgent));

const bffArticleJson = {
  data: {
    article: {
      content: {},
      metadata: {
        allowAdvertising: true,
        consumableAsSFV: true,
        lastPublished: 2041342869000,
      },
      promo: {},
      relatedContent: {},
    },
    secondaryData: {
      topStories: [],
      features: [],
      mostRead: [],
      latestMedia: [],
    },
  },
};

describe('Articles - BFF Fetching', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should request local fixture data when the app env is "local"', async () => {
    process.env.SIMORGH_APP_ENV = 'local';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffArticleJson),
      }),
    );

    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      pageType: ARTICLE_PAGE,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'http://localhost/kyrgyz/articles/c0000000000o',
      pageType: ARTICLE_PAGE,
      timeout: 60000,
    });
  });

  it('should request BFF data when the app env is "test"', async () => {
    process.env.SIMORGH_APP_ENV = 'test';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffArticleJson),
      }),
    );

    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      pageType: ARTICLE_PAGE,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000o&service=kyrgyz&pageType=article&serviceEnv=test',
      agent,
      optHeaders: {
        'ctx-service-env': 'test',
      },
      pageType: ARTICLE_PAGE,
    });
  });

  it('should request BFF data when the app env is "live"', async () => {
    process.env.SIMORGH_APP_ENV = 'live';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffArticleJson),
      }),
    );

    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      pageType: ARTICLE_PAGE,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000o&service=kyrgyz&pageType=article&serviceEnv=live',
      agent,
      optHeaders: {
        'ctx-service-env': 'live',
      },
      pageType: ARTICLE_PAGE,
    });
  });

  it('should request BFF data if "renderer_env=test" is supplied in the path, ignoring the app env', async () => {
    process.env.SIMORGH_APP_ENV = 'local';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffArticleJson),
      }),
    );

    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o?renderer_env=test',
      service: 'kyrgyz',
      pageType: ARTICLE_PAGE,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000o&service=kyrgyz&pageType=article&serviceEnv=test',
      agent,
      optHeaders: {
        'ctx-service-env': 'test',
      },
      pageType: ARTICLE_PAGE,
    });
  });

  it('should request BFF data if "renderer_env=live" is supplied in the path, ignoring the app env', async () => {
    process.env.SIMORGH_APP_ENV = 'local';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffArticleJson),
      }),
    );

    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o?renderer_env=live',
      service: 'kyrgyz',
      pageType: ARTICLE_PAGE,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000o&service=kyrgyz&pageType=article&serviceEnv=live',
      agent,
      optHeaders: {
        'ctx-service-env': 'live',
      },
      pageType: ARTICLE_PAGE,
    });
  });

  it('should log a 404 to node.logger when the article cannot be found', async () => {
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');

    fetchDataSpy.mockRejectedValue({ message: 'Not found', status: 404 });

    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      pageType: ARTICLE_PAGE,
      getAgent: mockGetAgent,
    });

    expect(nodeLogger.error).toHaveBeenCalledWith(BFF_FETCH_ERROR, {
      pathname: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      message: 'Not found',
      status: 404,
    });
  });

  it('should log a 500 to node.logger when the BFF response fails', async () => {
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');

    fetchDataSpy.mockRejectedValue({
      message: 'Internal server error',
      status: 500,
    });

    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      pageType: ARTICLE_PAGE,
      getAgent: mockGetAgent,
    });

    expect(nodeLogger.error).toHaveBeenCalledWith(BFF_FETCH_ERROR, {
      pathname: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      message: 'Internal server error',
      status: 500,
    });
  });

  it('should throw an error if the article metadata is malformed', async () => {
    const malformedBffArticleJson = {
      metadata: {},
      content: {},
      promo: {},
      relatedContent: {},
    };

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(malformedBffArticleJson),
      }),
    );

    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      pageType: ARTICLE_PAGE,
      getAgent: mockGetAgent,
    });

    expect(nodeLogger.error).toHaveBeenCalledWith(BFF_FETCH_ERROR, {
      pathname: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      message: 'Article data is malformed',
      status: 500,
    });
  });

  it('should transform response as expected', async () => {
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');

    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: pidginArticleWithLatestMedia,
      }),
    );

    const { pageData } = (await getInitialData({
      path: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      pageType: 'article',
      getAgent: mockGetAgent,
    })) as { pageData: Record<string, unknown> };

    expect(pageData).toHaveProperty('content');
    expect(pageData).toHaveProperty('metadata');
    expect(pageData).toHaveProperty('promo');
    expect(pageData).toHaveProperty('secondaryColumn');
    expect(pageData.secondaryColumn).toHaveProperty('topStories');
    expect(pageData.secondaryColumn).toHaveProperty('features');
    expect(pageData.secondaryColumn).toHaveProperty('latestMedia');
    expect(pageData).toHaveProperty('mostRead');
  });
});
