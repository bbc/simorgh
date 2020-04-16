import fetchMock from 'fetch-mock';
import loggerMock from '#testHelpers/loggerMock'; // Must be imported before fetchPageData
import { DATA_NOT_FOUND, DATA_FETCH_ERROR } from '#lib/logger.const';
import radioScheduleJson from '#data/hausa/bbc_hausa_radio/schedule.json';
import withRadioSchedule from '.';

const pageDataPromise = Promise.resolve({
  json: { foo: 'bar' },
  status: 200,
});

describe('withRadioSchedule', () => {
  beforeEach(() => {
    process.env.SIMORGH_BASE_URL = 'http://localhost';
    fetchMock.restore();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('page data and radio schedule promises resolve with data', () => {
    it('should merge radio schedule data into page data', async () => {
      fetchMock.mock(
        'http://localhost/hausa/bbc_hausa_radio/schedule.json',
        radioScheduleJson,
      );

      const {
        json: { radioScheduleData, foo },
        ...rest
      } = await withRadioSchedule(
        pageDataPromise,
        'hausa',
        'http://localhost/mock-frontpage-path',
      );

      expect(radioScheduleData.length).toBeTruthy();
      expect(foo).toBe('bar');
      expect(rest.status).toBe(200);
    });
  });

  describe('if either page data or radio schedule fetch returns non-ok status code', () => {
    it('should not merge radio schedule data into page data if radio schedule fetch returns non-ok status code', async () => {
      fetchMock.mock(
        'http://localhost/hausa/bbc_hausa_radio/schedule.json',
        404,
      );

      const {
        json: { radioScheduleData, foo },
        ...rest
      } = await withRadioSchedule(
        pageDataPromise,
        'hausa',
        'http://localhost/mock-frontpage-path',
      );

      expect(radioScheduleData).toBeNull();
      expect(foo).toBe('bar');
      expect(rest.status).toBe(200);

      expect(loggerMock.error).toBeCalledWith(DATA_NOT_FOUND, {
        status: 404,
        url: 'http://localhost/hausa/bbc_hausa_radio/schedule.json',
      });
    });

    it('should not merge radio schedule data into page data if page data fetch returns non-ok status code', async () => {
      fetchMock.mock(
        'http://localhost/hausa/bbc_hausa_radio/schedule.json',
        radioScheduleJson,
      );

      const failedPageDataPromise = Promise.resolve({
        status: 404,
      });

      const { json, status } = await withRadioSchedule(
        failedPageDataPromise,
        'hausa',
        'http://localhost/mock-frontpage-path',
      );

      expect(json).toBeUndefined();
      expect(status).toBe(404);
    });

    it('should not merge radio schedule data into page data if both page data and radio schedule return non-ok status code', async () => {
      fetchMock.mock(
        'http://localhost/hausa/bbc_hausa_radio/schedule.json',
        404,
      );

      const failedPageDataPromise = Promise.resolve({
        status: 404,
      });

      const { json, status } = await withRadioSchedule(
        failedPageDataPromise,
        'hausa',
        'http://localhost/mock-frontpage-path',
      );

      expect(json).toBeUndefined();
      expect(status).toBe(404);

      expect(loggerMock.error).toBeCalledWith(DATA_NOT_FOUND, {
        status: 404,
        url: 'http://localhost/hausa/bbc_hausa_radio/schedule.json',
      });
    });

    describe('fetch API promises rejected', () => {
      it('should return page data without radio schedules if radio schedule fetch promise is rejected', async () => {
        fetchMock.mock('http://localhost/hausa/bbc_hausa_radio/schedule.json', {
          throws: 'Server not found',
        });

        const {
          json: { radioScheduleData, foo },
          ...rest
        } = await withRadioSchedule(
          pageDataPromise,
          'hausa',
          'http://localhost/mock-frontpage-path',
        );

        expect(radioScheduleData).toBeNull();
        expect(foo).toBe('bar');
        expect(rest.status).toBe(200);

        expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
          error: 'Server not found',
        });
      });
    });
  });
});
