import fetchMock from 'fetch-mock';
import frontPageJsonSerbian from '#data/serbian/frontpage/lat.json';
import radioScheduleJson from '#data/hausa/bbc_hausa_radio/schedule.json';
import { CPS_ASSET as pageType } from '../../utils/pageTypes';
import * as fetchPageData from '../../utils/fetchPageData';
import nodeLogger from '../../../../testHelpers/loggerMock';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import getInitialData from '.';

jest.mock('../../utils/getConfig', () => jest.fn());
process.env.BFF_PATH = 'https://mock-bff-path';

const agent = { cert: 'cert', ca: 'ca', key: 'key' };
jest.mock('#server/utilities/getAgent', () =>
  jest.fn(() => Promise.resolve(agent)),
);

const bffFrontPageJson = {
  data: {
    article: {
      content: {},
      metadata: {},
      promo: {},
      relatedContent: {},
    },
    secondaryData: {
      topStories: null,
      features: null,
      mostRead: null,
      mostWatched: null,
    },
  },
};

const fetchDataSpy = jest.spyOn(fetchPageData, 'default');

describe('Front Page - Get Initial Data', () => {
  beforeEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.restore();
  });

  it('should request local fixture data when the app env is local', async () => {
    process.env.SIMORGH_APP_ENV = 'local';

    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(bffFrontPageJson),
      }),
    );

    await getInitialData({
      path: '/serbian/lat',
      service: 'serbian',
      variant: 'lat',
      pageType,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'http://localhost/serbian/lat',
      pageType,
      timeout: 60000,
    });
  });

  it.each(['test', 'live'])(
    'should request BFF data when the app env is %s',
    async environment => {
      process.env.SIMORGH_APP_ENV = environment;

      fetchDataSpy.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: JSON.stringify(bffFrontPageJson),
        }),
      );

      await getInitialData({
        path: '/serbian/lat',
        service: 'serbian',
        variant: 'lat',
        pageType,
      });

      expect(fetchDataSpy).toHaveBeenCalledWith({
        path: `https://mock-bff-path/?id=%2Fserbian%2Flat%2Ffront_page&service=serbian&pageType=cpsAsset&variant=lat&serviceEnv=${environment}`,
        agent,
        optHeaders: {
          'ctx-service-env': environment,
        },
        pageType,
      });
    },
  );

  it.each(['test', 'live'])(
    'should request BFF data if renderer_env=%s is supplied in the path, ignoring the app env',
    async environment => {
      process.env.SIMORGH_APP_ENV = 'local';

      fetchDataSpy.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: JSON.stringify(bffFrontPageJson),
        }),
      );

      await getInitialData({
        path: `/serbian/lat?renderer_env=${environment}`,
        service: 'serbian',
        variant: 'lat',
        pageType,
      });

      expect(fetchDataSpy).toHaveBeenCalledWith({
        path: `https://mock-bff-path/?id=%2Fserbian%2Flat%2Ffront_page&service=serbian&pageType=cpsAsset&variant=lat&serviceEnv=${environment}`,
        agent,
        optHeaders: {
          'ctx-service-env': environment,
        },
        pageType,
      });
    },
  );

  it('should log a 404 to node.logger when the asset cannot be found', async () => {
    fetchDataSpy.mockRejectedValue({ message: 'Not found', status: 404 });

    await getInitialData({
      path: '/serbian/lat',
      service: 'serbian',
      variant: 'lat',
      pageType,
    });

    expect(nodeLogger.error).toHaveBeenCalledWith(BFF_FETCH_ERROR, {
      pathname: '/serbian/lat',
      service: 'serbian',
      message: 'Not found',
      status: 404,
    });
  });

  it('should log a 500 to node.logger when the BFF response fails', async () => {
    fetchDataSpy.mockRejectedValue({
      message: 'Internal server error',
      status: 500,
    });

    await getInitialData({
      path: '/serbian/lat',
      service: 'serbian',
      variant: 'lat',
      pageType,
    });

    expect(nodeLogger.error).toHaveBeenCalledWith(BFF_FETCH_ERROR, {
      pathname: '/serbian/lat',
      service: 'serbian',
      message: 'Internal server error',
      status: 500,
    });
  });

  it('should throw an error if the front page data is malformed', async () => {
    const malformedBffFrontPageJson = {
      metadata: {},
      content: {},
      promo: {},
      relatedContent: {},
    };

    fetchDataSpy.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: JSON.stringify(malformedBffFrontPageJson),
      }),
    );

    await getInitialData({
      path: '/serbian/lat',
      service: 'serbian',
      variant: 'lat',
      pageType,
    });

    expect(nodeLogger.error).toHaveBeenCalledWith(BFF_FETCH_ERROR, {
      pathname: '/serbian/lat',
      service: 'serbian',
      message: 'Front page data is malformed',
      status: 500,
    });
  });

  describe('with Radio Schedule', () => {
    it('should return data for a page without radio schedule', async () => {
      fetchDataSpy.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: frontPageJsonSerbian,
        }),
      );

      const { pageData } = await getInitialData({
        path: '/serbian/lat',
        service: 'serbian',
        variant: 'lat',
        pageType,
      });

      expect(pageData.metadata.language).toEqual('sr-Latn');
      expect(pageData.metadata.summary).toEqual(
        'BBC na srpskom nudi ekskluzivan sadržaj - analitičko, istraživačko i nepristrasno izveštavanje u tekstovima i video prilozima prilagođenim i društvenim mrežama.',
      );
      expect(pageData.promo.name).toEqual('Početna strana');
      expect(pageData.content.groups.length).toBeTruthy();

      expect(pageData.radioScheduleData).toBeUndefined();
    });

    it('should return data to render a front page with radio schedules', async () => {
      fetchDataSpy.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: frontPageJsonSerbian,
        }),
      );
      fetchMock.mock(
        '/serbian/bbc_serbian_radio/schedule.json',
        radioScheduleJson,
      );

      const { pageData } = await getInitialData({
        path: '/serbian/lat',
        service: 'serbian',
        variant: 'lat',
        pageType,
        toggles: {
          frontPageRadioSchedule: {
            enabled: true,
            value: 'Features',
          },
        },
      });

      expect(pageData.content.groups.length).toBeTruthy();
      expect(pageData.radioScheduleData.length).toBe(4);
    });

    it('should return data for service with radio schedules, but toggle is disabled', async () => {
      fetchDataSpy.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: frontPageJsonSerbian,
        }),
      );

      const { pageData } = await getInitialData({
        path: '/serbian/lat',
        service: 'serbian',
        variant: 'lat',
        pageType,
        toggles: {
          frontPageRadioSchedule: {
            enabled: false,
          },
        },
      });

      expect(pageData.content.groups.length).toBeTruthy();
      expect(pageData.radioScheduleData).toBeUndefined();
    });

    it('should return page data for misconfigured service without radio schedules, but with radio schedules on front page', async () => {
      fetchDataSpy.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: frontPageJsonSerbian,
        }),
      );
      fetchMock.mock('/serbian/bbc_serbian_radio/schedule.json', null);

      const { pageData } = await getInitialData({
        path: '/serbian/lat',
        service: 'serbian',
        variant: 'lat',
        pageType,
        toggles: {
          frontPageRadioSchedule: {
            enabled: true,
          },
        },
      });

      expect(pageData.content.groups.length).toBeTruthy();
      expect(pageData.radioScheduleData).toBeNull();
    });
  });
});
