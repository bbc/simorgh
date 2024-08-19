import loggerMock from '#testHelpers/loggerMock';
import { RADIO_SCHEDULE_FETCH_ERROR } from '#lib/logger.const';
import radioScheduleJson from '#data/hausa/bbc_hausa_radio/schedule.json';
import withRadioSchedule from '.';

const pageDataPromise = Promise.resolve({
  json: { foo: 'bar' },
  status: 200,
});

const service = 'hausa';
const path = 'http://localhost/mock-frontpage-path';

describe('withRadioSchedule', () => {
  beforeEach(() => {
    process.env.SIMORGH_BASE_URL = 'http://localhost';
  });

  afterEach(() => {
    jest.resetAllMocks();
    fetch.resetMocks();
  });

  describe('page data and radio schedule promises resolve with data', () => {
    it('should merge radio schedule data into page data', async () => {
      fetch.mockResponse(JSON.stringify(radioScheduleJson));

      const {
        json: { radioScheduleData, foo },
        ...rest
      } = await withRadioSchedule({
        pageDataPromise,
        service,
        path,
      });

      expect(radioScheduleData.length).toBeTruthy();
      expect(foo).toBe('bar');
      expect(rest.status).toBe(200);
    });
  });

  describe('if either page data or radio schedule fetch returns non-ok status code', () => {
    it('should not merge radio schedule data into page data if radio schedule fetch returns non-ok status code', async () => {
      fetch.mockResponse(JSON.stringify({ status: 404 }));

      const {
        json: { radioScheduleData, foo },
        ...rest
      } = await withRadioSchedule({ pageDataPromise, service, path });

      expect(radioScheduleData).toBeUndefined();
      expect(foo).toBe('bar');
      expect(rest.status).toBe(200);
    });

    it('should not merge radio schedule data into page data if page data fetch returns non-ok status code', async () => {
      fetch.mockResponse(JSON.stringify(radioScheduleJson));

      const failedPageDataPromise = Promise.resolve({
        status: 404,
      });

      const { json, status } = await withRadioSchedule({
        pageDataPromise: failedPageDataPromise,
        service,
        path,
      });

      expect(json).toBeUndefined();
      expect(status).toBe(404);
    });

    it('should not merge radio schedule data into page data if both page data and radio schedule return non-ok status code', async () => {
      fetch.mockResponse(JSON.stringify({ status: 404 }));

      const failedPageDataPromise = Promise.resolve({
        status: 404,
      });

      const { json, status } = await withRadioSchedule({
        pageDataPromise: failedPageDataPromise,
        service,
        path,
      });

      expect(json).toBeUndefined();
      expect(status).toBe(404);
    });

    describe('fetch API promises rejected', () => {
      it('should return page data without radio schedules if radio schedule fetch promise is rejected', async () => {
        fetch.mockReject(Error('Server not found'));

        const {
          json: { radioScheduleData, foo },
          ...rest
        } = await withRadioSchedule({
          pageDataPromise,
          service,
          path,
        });

        expect(radioScheduleData).toBeNull();
        expect(foo).toBe('bar');
        expect(rest.status).toBe(200);

        expect(loggerMock.error).toHaveBeenCalledWith(
          RADIO_SCHEDULE_FETCH_ERROR,
          {
            error: 'Error: Server not found',
          },
        );
      });
    });
  });
});
