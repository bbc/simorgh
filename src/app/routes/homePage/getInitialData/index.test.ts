import { Agent } from 'https';
import KyrgyzHomeFixture from '#data/kyrgyz/homePage/index.json';
import * as fetchPageData from '../../utils/fetchPageData';

import getInitialData from '.';

process.env.BFF_PATH = 'https://mock-bff-path';

const agent = { cert: 'cert', ca: 'ca', key: 'key' };
const getAgent = jest.fn(() => Promise.resolve(agent as unknown as Agent));

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
      getAgent,
      service: 'kyrgyz',
      pageType: 'home',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'http://localhost/kyrgyz/tipohome',
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
      getAgent,
      service: 'kyrgyz',
      pageType: 'home',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=cm7682qz7v1t&service=kyrgyz&pageType=home',
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
        json: JSON.stringify(KyrgyzHomeFixture),
      }),
    );

    await getInitialData({
      path: '/kyrgyz/tipohome',
      getAgent,
      service: 'kyrgyz',
      pageType: 'home',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=crg7kj2e52nt&service=kyrgyz&pageType=home',
      agent,
      optHeaders: {
        'ctx-service-env': 'live',
      },
    });
  });
});
