import KyrgyzHomeFixture from '#data/kyrgyz/homePage/index.json';
import * as fetchPageData from '../../utils/fetchPageData';
import getInitialData from '.';
import { HOME_PAGE } from '../../utils/pageTypes';

process.env.BFF_PATH = 'https://mock-bff-path';

const agent = { cert: 'cert', ca: 'ca', key: 'key' };
jest.mock('../../../../server/utilities/getAgent', () =>
  jest.fn(() => Promise.resolve(agent)),
);

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
      path: '/kyrgyz/tipohome',
      service: 'kyrgyz',
      pageType: 'home',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'http://localhost/kyrgyz/tipohome',
      pageType: HOME_PAGE,
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
      path: '/kyrgyz/tipohome',
      service: 'kyrgyz',
      pageType: 'home',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=cm7682qz7v1t&service=kyrgyz&pageType=home',
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
      path: '/kyrgyz/tipohome',
      service: 'kyrgyz',
      pageType: 'home',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=crg7kj2e52nt&service=kyrgyz&pageType=home',
      agent,
      optHeaders: {
        'ctx-service-env': 'live',
      },
      pageType: HOME_PAGE,
    });
  });
});
