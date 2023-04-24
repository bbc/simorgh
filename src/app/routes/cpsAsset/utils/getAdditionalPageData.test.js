// test helpers
import fetchMock from 'fetch-mock';

// components to test

// mock data
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';
import cspJson from '#data/news/cpsAssets/business-55345826.json';
import styJson from '#data/pidgin/cpsAssets/world-23252817.json';
import cspMostReadJson from '#data/news/mostRead/index.json';
import mostWatchedJson from '#data/pidgin/mostWatched/index.json';
import cspSecondaryColumnJson from '#data/news/secondaryColumn/index.json';
import getAdditionalPageData from './getAdditionalPageData';

fetchMock.config.overwriteRoutes = false; // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration allows us to mock the same endpoint multiple times

jest.mock('./hasRecommendations', () => jest.fn());
jest.mock('#server/utilities/getAgent/index');

describe('getAdditionalPageData', () => {
  it('should return additional data with most watched for a MAP asset', async () => {
    fetchMock.mock('http://localhost/pidgin/mostwatched.json', mostWatchedJson);
    const additionalPageData = await getAdditionalPageData({
      pageData: mapJson,
      service: 'pidgin',
      env: 'local',
    });

    const expectedOutput = {
      mostWatched: mostWatchedJson,
    };
    expect(additionalPageData).toEqual(expectedOutput);
  });

  it('should return additonal data for an STY', async () => {
    fetchMock.mock('http://localhost/pidgin/mostread.json', { foo: 'bar' });
    fetchMock.mock('http://localhost/pidgin/sty-secondary-column.json', {
      foo: 'bar',
    });

    const additionalPageData = await getAdditionalPageData({
      pageData: styJson,
      service: 'pidgin',
    });

    const expectedOutput = {
      mostRead: { foo: 'bar' },
      secondaryColumn: { foo: 'bar' },
    };

    expect(additionalPageData).toEqual(expectedOutput);
  });

  it('should return additional data for a CSP asset', async () => {
    fetchMock.mock('http://localhost/news/mostread.json', cspMostReadJson);
    fetchMock.mock(
      'http://localhost/news/sty-secondary-column.json',
      cspSecondaryColumnJson,
    );
    const additionalPageData = await getAdditionalPageData({
      pageData: cspJson,
      service: 'news',
      env: 'local',
    });

    const expectedOutput = {
      mostRead: cspMostReadJson,
      secondaryColumn: cspSecondaryColumnJson,
    };
    expect(additionalPageData).toEqual(expectedOutput);
  });
});
