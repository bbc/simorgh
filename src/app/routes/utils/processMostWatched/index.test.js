import nodeLogger from '#testHelpers/loggerMock';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';
import {
  MOST_WATCHED_PROCESS_ERROR,
  MOST_WATCHED_STALE_DATA,
} from '#lib/logger.const';
import processMostWatched from '.';

const toggles = {
  mostPopularMedia: { enabled: true, value: '5' },
};

describe('processMostWatched', () => {
  it('should return null if data is null', () => {
    const data = processMostWatched({
      data: null,
      path: 'some-path',
      toggles,
      service: 'pidgin',
    });
    expect(data).toBe(null);
  });

  it('should return null if data is stale', () => {
    const staleData = {
      lastRecordTimeStamp: '2019-11-06T16:28:00Z',
      generated: '2019-11-06T17:05:17.981Z',
      records: ['some records'],
    };
    const processedData = processMostWatched({
      data: { mostWatched: staleData },
      path: 'some-path',
      toggles,
      service: 'pidgin',
    });
    expect(processedData.mostWatched).toBe(null);
    expect(nodeLogger.warn).toHaveBeenCalledWith(MOST_WATCHED_STALE_DATA, {
      message: 'lastRecordTimeStamp is greater than 60min',
      service: 'pidgin',
      path: 'some-path',
      generated: '2019-11-06T17:05:17.981Z',
      lastRecordTimeStamp: '2019-11-06T16:28:00Z',
      isAmp: undefined,
    });
  });

  it('should return the proper number of items in the right format', () => {
    const { records } = mostWatchedData;
    const expectedData = {
      mostWatched: records.slice(0, 5).map(item => item.promo),
    };

    const data = processMostWatched({
      data: { mostWatched: mostWatchedData },
      path: 'some-path',
      toggles,
      service: 'pidgin',
    });
    expect(data.mostWatched.length).toBe(5);
    expect(data).toEqual(expectedData);
  });

  it('should log a message when the toggle is invalid', () => {
    const data = processMostWatched({
      data: { mostWatched: mostWatchedData },
      path: 'some-path',
      toggles: { invalidToggle: true },
      service: 'pidgin',
    });
    expect(data.mostWatched).toBe(null);
    expect(nodeLogger.warn).toHaveBeenCalledWith(MOST_WATCHED_PROCESS_ERROR, {
      message: "Cannot read properties of undefined (reading 'enabled')",
      service: 'pidgin',
      path: 'some-path',
    });
  });

  it('should log a message when the toggle value is not a number', () => {
    const data = processMostWatched({
      data: { mostWatched: mostWatchedData },
      path: 'some-path',
      toggles: {
        mostPopularMedia: { enabled: true, value: '{numberOfItems: 5}' },
      },
      service: 'pidgin',
    });
    expect(data.mostWatched).toBe(null);
    expect(nodeLogger.warn).toHaveBeenCalledWith(MOST_WATCHED_PROCESS_ERROR, {
      message: 'Invalid number of items',
      service: 'pidgin',
      path: 'some-path',
    });
  });
});
