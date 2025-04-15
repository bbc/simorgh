import { Agent } from 'undici';
import KyrgyzHomeFixture from '#data/kyrgyz/homePage/index.json';
import * as fetchPageData from '#app/routes/utils/fetchPageData';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from '.';

process.env.BFF_PATH = 'https://mock-bff-path';

const agent = {
  connect: { cert: 'cert', ca: 'ca', key: 'key' },
} as unknown as Agent;

const mockGetAgent = jest.fn(() => Promise.resolve(agent));

jest.mock('../../../../server/utilities/getAgent', () => jest.fn(mockGetAgent));

describe('Home Page - BFF Fetching', () => {
  const originalEnvironment = process.env.SIMORGH_APP_ENV;

  afterEach(() => {
    process.env.SIMORGH_APP_ENV = originalEnvironment;
    jest.clearAllMocks();
  });

  it('should request local fixture data when the app env is "local"', async () => {
    process.env.SIMORGH_APP_ENV = 'local';
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');

    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(KyrgyzHomeFixture),
      }),
    );

    await getInitialData({
      path: '/kyrgyz',
      service: 'kyrgyz',
      pageType: 'home',
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'http://localhost/kyrgyz',
      pageType: HOME_PAGE,
      timeout: 60000,
    });
  });

  it('should request BFF data when the app env is "test"', async () => {
    process.env.SIMORGH_APP_ENV = 'test';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(KyrgyzHomeFixture),
      }),
    );

    await getInitialData({
      path: '/kyrgyz',
      service: 'kyrgyz',
      pageType: 'home',
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=cm7682qz7v1t&service=kyrgyz&pageType=home&serviceEnv=test',
      agent,
      optHeaders: {
        'ctx-service-env': 'test',
      },
      pageType: HOME_PAGE,
    });
  });

  it('should request BFF data when the app env is "live"', async () => {
    process.env.SIMORGH_APP_ENV = 'live';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(KyrgyzHomeFixture),
      }),
    );

    await getInitialData({
      path: '/kyrgyz',
      service: 'kyrgyz',
      pageType: 'home',
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=crg7kj2e52nt&service=kyrgyz&pageType=home&serviceEnv=live',
      agent,
      optHeaders: {
        'ctx-service-env': 'live',
      },
      pageType: HOME_PAGE,
    });
  });
});
