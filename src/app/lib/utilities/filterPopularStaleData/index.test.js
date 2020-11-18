import nodeLogger from '#testHelpers/loggerMock';
import filterPopularStaleData from '.';
import {
  MOST_READ_STALE_DATA,
  MOST_WATCHED_STALE_DATA,
} from '#lib/logger.const';

describe('filterPopularStaleData', () => {
  it('should log MOST_READ_STALE_DATA when lastRecordTimestamp is greater than 60min', () => {
    const staleData = {
      lastRecordTimeStamp: '2019-11-06T16:28:00Z',
      generated: '2019-11-06T17:05:17.981Z',
      records: ['some records'],
    };
    const filteredData = filterPopularStaleData({
      data: staleData,
      popularType: 'mostRead',
      service: 'pidgin',
      isAmp: true,
    });
    expect(nodeLogger.warn).toHaveBeenCalledWith(MOST_READ_STALE_DATA, {
      lastRecordTimeStamp: '2019-11-06T16:28:00Z',
      message: 'lastRecordTimeStamp is greater than 60min',
      generated: '2019-11-06T17:05:17.981Z',
      service: 'pidgin',
      isAmp: true,
    });
    expect(filteredData).toBe(null);
  });

  it('should log MOST_WATCHED_STALE_DATA when lastRecordTimestamp is greater than 60min', () => {
    const staleData = {
      lastRecordTimeStamp: '2019-11-06T16:28:00Z',
      generated: '2019-11-06T17:05:17.981Z',
      records: ['some records'],
    };
    const filteredData = filterPopularStaleData({
      data: staleData,
      popularType: 'mostWatched',
      service: 'pidgin',
      isAmp: true,
    });
    expect(nodeLogger.warn).toHaveBeenCalledWith(MOST_WATCHED_STALE_DATA, {
      lastRecordTimeStamp: '2019-11-06T16:28:00Z',
      message: 'lastRecordTimeStamp is greater than 60min',
      generated: '2019-11-06T17:05:17.981Z',
      service: 'pidgin',
      isAmp: true,
    });
    expect(filteredData).toBe(null);
  });

  describe('test environment always fresh', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      delete process.env.SIMORGH_APP_ENV;
    });

    it('should make stale data fresh if environment is test', () => {
      process.env.SIMORGH_APP_ENV = 'test';
      const staleData = {
        lastRecordTimeStamp: '2019-11-06T16:28:00Z',
        generated: '2019-11-06T17:05:17.981Z',
        records: ['some records'],
      };
      const filteredData = filterPopularStaleData({
        data: staleData,
        popularType: 'mostWatched',
        service: 'pidgin',
        isAmp: true,
      });
      expect(nodeLogger.warn).toHaveBeenCalledTimes(0);
      expect(filteredData).toEqual(staleData);
    });
  });
});
