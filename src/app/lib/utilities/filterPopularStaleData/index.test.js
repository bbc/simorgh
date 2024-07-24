import nodeLogger from '#testHelpers/loggerMock';
import { MOST_READ_STALE_DATA } from '#lib/logger.const';
import filterPopularStaleData from '.';
import isLive from '../isLive';

jest.mock('../isLive', () => jest.fn().mockImplementation(() => false));

describe('filterPopularStaleData', () => {
  it('should log MOST_READ_STALE_DATA when lastRecordTimestamp is greater than 60min on live environment', () => {
    isLive.mockImplementationOnce(() => true);

    const staleData = {
      lastRecordTimeStamp: '2019-11-06T16:28:00Z',
      generated: '2019-11-06T17:05:17.981Z',
      records: ['some records'],
    };
    const filteredData = filterPopularStaleData({
      data: staleData,
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

  describe('non-live environment is always fresh', () => {
    const originalAppEnv = process.env.SIMORGH_APP_ENV;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      process.env.SIMORGH_APP_ENV = originalAppEnv;
    });

    it.each(['local', 'test'])(
      'should make stale data fresh if environment is %s',
      ({ environment }) => {
        process.env.SIMORGH_APP_ENV = environment;
        const staleData = {
          lastRecordTimeStamp: '2019-11-06T16:28:00Z',
          generated: '2019-11-06T17:05:17.981Z',
          records: ['some records'],
        };
        const filteredData = filterPopularStaleData({
          data: staleData,
          service: 'pidgin',
          isAmp: true,
        });
        expect(nodeLogger.warn).toHaveBeenCalledTimes(0);
        expect(filteredData).toEqual(staleData);
      },
    );
  });
});
