import fetchMock from 'fetch-mock';
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

  describe('pageData and radioSchedule promises resolves with data', () => {
    it('should merge radioScheduleData into pageData', async () => {
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

  describe('if either pageData or radioSchedule promise fails', () => {
    it('should not merge radioScheduleData into pageData if radio schedule promise fails', async () => {
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
    });

    it('should not merge radioScheduleData into pageData if pageData promise fails', async () => {
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

    it('should not merge radioScheduleData into pageData if both pageData and radioSchedule promise fails', async () => {
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
    });
  });
});
