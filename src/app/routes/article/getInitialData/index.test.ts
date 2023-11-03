import { Agent } from 'https';
import * as getOnwardsPageData from '../utils/getOnwardsData';
import * as fetchPageData from '../../utils/fetchPageData';
import nodeLogger from '../../../../testHelpers/loggerMock';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import getInitialData from '.';
import pidginArticleWithLatestMedia from '../../../../../data/pidgin/articles/cw0x29n2pvqo.json';
import { ARTICLE_PAGE } from '../../utils/pageTypes';

process.env.BFF_PATH = 'https://mock-bff-path';

const agent = { cert: 'cert', ca: 'ca', key: 'key' };

jest.mock('../../../../server/utilities/getAgent', () =>
  jest.fn(() => Promise.resolve(agent as unknown as Agent)),
);

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
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'http://localhost/kyrgyz/articles/c0000000000o',
      pageType: ARTICLE_PAGE,
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

  it('should request WSOJ data.', async () => {
    process.env.SIMORGH_APP_ENV = 'live';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    const getOnwardsPageDataSpy = jest.spyOn(getOnwardsPageData, 'default');

    fetchDataSpy.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json: bffArticleJson,
      }),
    );

    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o.amp?renderer_env=live',
      service: 'kyrgyz',
      pageType: ARTICLE_PAGE,
    });

    expect(getOnwardsPageDataSpy).toBeCalledWith({
      pathname: '/kyrgyz/articles/c0000000000o.amp?renderer_env=live',
      service: 'kyrgyz',
      isAdvertising: true,
      isArticleSfv: true,
      agent,
      variant: undefined,
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

  it('should request BFF data if "renderer_env=caf" is supplied in the path for CPS asset, ignoring the app env only if its set to "local"', async () => {
    process.env.SIMORGH_APP_ENV = 'local';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffArticleJson),
      }),
    );

    await getInitialData({
      path: '/mundo/noticias-internacional-64382459?renderer_env=caf',
      service: 'mundo',
      pageType: 'cpsAsset',
      isCaf: true,
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
    });

    expect(nodeLogger.error).toHaveBeenCalledWith(BFF_FETCH_ERROR, {
      pathname: '/kyrgyz/articles/c0000000000o',
      service: 'kyrgyz',
      message: 'Internal server error',
      status: 500,
    });
  });

  it('should throw an error if the article ID is malformed', async () => {
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffArticleJson),
      }),
    );

    await getInitialData({
      path: '/kyrgyz/articles/somethingelse',
      service: 'kyrgyz',
      pageType: ARTICLE_PAGE,
    });

    expect(nodeLogger.error).toHaveBeenCalledWith(BFF_FETCH_ERROR, {
      pathname: '/kyrgyz/articles/somethingelse',
      service: 'kyrgyz',
      message: 'Article ID is invalid',
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
    })) as { pageData: Record<string, unknown> };

    expect(pageData).toHaveProperty('content');
    expect(pageData).toHaveProperty('metadata');
    expect(pageData).toHaveProperty('promo');
    expect(pageData).toHaveProperty('secondaryColumn');
    expect(pageData.secondaryColumn).toHaveProperty('topStories');
    expect(pageData.secondaryColumn).toHaveProperty('features');
    expect(pageData.secondaryColumn).toHaveProperty('latestMedia');
    expect(pageData).toHaveProperty('mostRead');
    expect(pageData).toHaveProperty('mostWatched');
  });
});
