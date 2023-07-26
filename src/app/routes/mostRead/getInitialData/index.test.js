import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import * as fetchPageData from '../../utils/fetchPageData';
import mostReadJson from '../../../../../data/pidgin/mostRead/index.json';
import getInitialData from '.';

process.env.BFF_PATH = 'https://mock-bff-path';

const agent = { cert: 'cert', ca: 'ca', key: 'key' };
jest.mock('#server/utilities/getAgent', () =>
  jest.fn(() => Promise.resolve(agent)),
);

const bffMostReadPageJson = {
  data: {
    generated: '',
    lastRecordTimeStamp: '',
    firstRecordTimeStamp: '',
    items: [],
  },
};

describe('MostReadPage - BFF Fetching', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should request local fixture data when the app env is "local"', async () => {
    process.env.SIMORGH_APP_ENV = 'local';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffMostReadPageJson),
      }),
    );

    await getInitialData({
      path: '/pidgin/popular/read',
      service: 'pidgin',
      pageType: 'mostRead',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'http://localhost/pidgin/mostread',
    });
  });

  it('should request BFF data when the app env is "test"', async () => {
    process.env.SIMORGH_APP_ENV = 'test';

    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffMostReadPageJson),
      }),
    );

    await getInitialData({
      path: '/pidgin/popular/read',
      service: 'pidgin',
      pageType: 'mostRead',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead',
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
        json: JSON.stringify(bffMostReadPageJson),
      }),
    );

    await getInitialData({
      path: '/pidgin/popular/read',
      service: 'pidgin',
      pageType: 'mostRead',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead',
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
        json: JSON.stringify(bffMostReadPageJson),
      }),
    );

    await getInitialData({
      path: '/pidgin/popular/read?renderer_env=test',
      service: 'pidgin',
      pageType: 'mostRead',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead',
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
        json: JSON.stringify(bffMostReadPageJson),
      }),
    );

    await getInitialData({
      path: '/pidgin/popular/read?renderer_env=live',
      service: 'pidgin',
      pageType: 'mostRead',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead',
      agent,
      optHeaders: {
        'ctx-service-env': 'live',
      },
    });
  });

  it('should return essential data for a page to render', async () => {
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: mostReadJson,
      }),
    );

    const response = await getInitialData({
      path: '/pidgin/popular/read',
      service: 'pidgin',
      pageType: MOST_READ_PAGE,
    });

    const { pageData } = response;

    expect(pageData.lastRecordTimeStamp).toEqual('2023-06-19T15:03:00Z');
    expect(pageData.metadata.type).toEqual('mostRead');
    expect(pageData.items[0].timestamp).toEqual(1687171616901);
    expect(pageData.items[0].title).toEqual(
      'Teams wey qualify for Afcon 2023 and how things stand for each group',
    );
    expect(pageData.items[0].href).toEqual(
      'https://www.bbc.com/pidgin/articles/cz5kkgv41v0o',
    );
  });
});
