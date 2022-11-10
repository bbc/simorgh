/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as fetchPageData from '../../utils/fetchPageData';

import getInitialData from '.';

describe('Articles - BFF Fetching', () => {
  process.env.BFF_PATH = 'https://mock-bff-path';
  const agent = { ca: 'ca', key: 'key' };
  const getAgent = jest.fn(() => agent);

  const bffArticleJson = {
    data: {
      article: {
        content: {},
        metadata: {},
        promo: {},
        relatedContent: {},
      },
      secondaryData: {
        topStories: [],
        features: [],
        mostRead: [],
      },
    },
  };

  it('should request local fixture data when the app env is "local"', async () => {
    process.env.SIMORGH_APP_ENV = 'local';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffArticleJson),
      }),
    );

    // @ts-ignore - Ignore fetchPageData argument types
    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o',
      getAgent,
      service: 'kyrgyz',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'http://localhost/kyrgyz/articles/c0000000000o',
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

    // @ts-ignore - Ignore fetchPageData argument types
    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o',
      getAgent,
      service: 'kyrgyz',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000o&service=kyrgyz&pageType=article',
      agent,
      optHeaders: {
        'ctx-service-env': 'test',
      },
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

    // @ts-ignore - Ignore fetchPageData argument types
    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o',
      getAgent,
      service: 'kyrgyz',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000o&service=kyrgyz&pageType=article',
      agent,
      optHeaders: {
        'ctx-service-env': 'live',
      },
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

    // @ts-ignore - Ignore fetchPageData argument types
    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o?renderer_env=test',
      getAgent,
      service: 'kyrgyz',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000o&service=kyrgyz&pageType=article',
      agent,
      optHeaders: {
        'ctx-service-env': 'test',
      },
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

    // @ts-ignore - Ignore fetchPageData argument types
    await getInitialData({
      path: '/kyrgyz/articles/c0000000000o?renderer_env=live',
      getAgent,
      service: 'kyrgyz',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000o&service=kyrgyz&pageType=article',
      agent,
      optHeaders: {
        'ctx-service-env': 'live',
      },
    });
  });
});
