import fetchMock from 'fetch-mock';

import nodeLogger from '#testHelpers/loggerMock';
import { processMostWatched, getMostWatchedData } from '.';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';
import {
  MOST_WATCHED_CLIENT_REQUEST,
  MOST_WATCHED_FETCH_ERROR,
} from '#lib/logger.const';

describe('processMostWatched', () => {
  it('should return null if data is null', () => {
    const data = processMostWatched({
      data: null,
      isAmp: true,
      numberOfItems: 10,
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
      data: staleData,
      isAmp: true,
      numberOfItems: 10,
      service: 'pidgin',
    });
    expect(processedData).toBe(null);
  });

  it('should return the proper number of items in the right format', () => {
    const { records } = mostWatchedData;
    const expectedData = records.slice(0, 5).map(item => item.promo);

    const data = processMostWatched({
      data: mostWatchedData,
      isAmp: false,
      numberOfItems: 5,
      service: 'pidgin',
    });
    expect(data.length).toBe(5);
    expect(data).toEqual(expectedData);
  });
});

describe('getMostWatchedData', () => {
  it('should fetch mostWatched Data with the right url', async () => {
    fetchMock.mock('/serbian/mostwatched/lat.json', mostWatchedData);
    const data = await getMostWatchedData({
      service: 'serbian',
      variant: 'lat',
    });

    expect(data).toEqual(mostWatchedData);
    expect(nodeLogger.info).toHaveBeenCalledWith(MOST_WATCHED_CLIENT_REQUEST, {
      url: '/serbian/mostwatched/lat.json',
    });
  });

  it('should log errors in fetching most watched data', async () => {
    fetchMock.mock(
      '/pidgin/mostWatched.json',
      Promise.reject(Error('an error')),
    );
    const data = await getMostWatchedData({
      service: 'pidgin',
    });

    expect(data).toBe(null);
    expect(nodeLogger.error).toHaveBeenCalledWith(MOST_WATCHED_FETCH_ERROR, {
      url: '/pidgin/mostwatched.json',
      error:
        'Error: fetch-mock: No fallback response defined for GET to /pidgin/mostwatched.json',
    });
  });
});
