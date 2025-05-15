import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import * as fetchPageData from '#app/routes/utils/fetchPageData';
import mostReadJson from '#data/pidgin/mostRead/index.json';
import getInitialData from '.';

process.env.BFF_PATH = 'https://mock-bff-path';

const agent = { cert: 'cert', ca: 'ca', key: 'key' };

const mockGetAgent = () => Promise.resolve(agent);

jest.mock('../../../../server/utilities/getAgent', () =>
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
      pageType: MOST_READ_PAGE,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'http://localhost/pidgin/mostread',
      pageType: MOST_READ_PAGE,
      timeout: 60000,
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
      pageType: MOST_READ_PAGE,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead&serviceEnv=test',
      agent,
      optHeaders: {
        'ctx-service-env': 'test',
      },
      pageType: MOST_READ_PAGE,
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
      pageType: MOST_READ_PAGE,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead&serviceEnv=live',
      agent,
      optHeaders: {
        'ctx-service-env': 'live',
      },
      pageType: MOST_READ_PAGE,
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
      pageType: MOST_READ_PAGE,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead&serviceEnv=test',
      agent,
      optHeaders: {
        'ctx-service-env': 'test',
      },
      pageType: MOST_READ_PAGE,
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
      pageType: MOST_READ_PAGE,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=mostRead&service=pidgin&pageType=mostRead&serviceEnv=live',
      agent,
      optHeaders: {
        'ctx-service-env': 'live',
      },
      pageType: MOST_READ_PAGE,
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
      getAgent: mockGetAgent,
    });

    const { pageData } = response;

    expect(pageData).toHaveProperty('generated');
    expect(pageData).toHaveProperty('lastRecordTimeStamp');
    expect(pageData).toHaveProperty('firstRecordTimeStamp');
    expect(pageData).toHaveProperty('items');
    expect(pageData).toHaveProperty('metadata');
    expect(pageData.metadata).toHaveProperty('type');
    expect(pageData.metadata).toHaveProperty('atiAnalytics');
    expect(pageData.metadata.atiAnalytics).toHaveProperty('contentType');
    expect(pageData.metadata.atiAnalytics).toHaveProperty('pageIdentifier');
    expect(pageData.metadata.atiAnalytics).toHaveProperty('timePublished');
    expect(pageData.metadata.atiAnalytics).toHaveProperty('timeUpdated');

    expect(pageData.lastRecordTimeStamp).toEqual('2023-06-19T15:03:00Z');
    expect(pageData.metadata.type).toEqual('mostRead');
    expect(pageData.metadata.atiAnalytics).toStrictEqual({
      contentType: 'list-datadriven',
      pageIdentifier: 'pidgin.popular.read.page',
      timePublished: '2023-06-19T13:03:00Z',
      timeUpdated: '2023-06-19T15:03:00Z',
    });
    expect(pageData.items[0].timestamp).toEqual(1687171616901);
    expect(pageData.items[0].title).toEqual(
      'Teams wey qualify for Afcon 2023 and how things stand for each group',
    );
    expect(pageData.items[0].href).toEqual(
      'https://www.bbc.com/pidgin/articles/cz5kkgv41v0o',
    );
  });
});
