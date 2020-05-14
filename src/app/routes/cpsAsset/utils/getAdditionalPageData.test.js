// test helpers
import fetchMock from 'fetch-mock';

// components to test
import getAdditionalPageData from './getAdditionalPageData';

// mock data
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';
import styJson from '#data/mundo/cpsAssets/23263889.json';
import mostReadJson from '#data/mundo/mostRead/index.json';
import secondaryColumnJson from '#data/mundo/secondaryColumn/index.json';

fetchMock.config.overwriteRoutes = false; // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration allows us to mock the same endpoint multiple times

describe('getAdditionalPageData', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should return no additional data for a MAP asset', async () => {
    const additionalPageData = await getAdditionalPageData(mapJson, 'pidgin');

    expect(additionalPageData).toBe(null);
  });

  it('should return additonal data for an STY asset', async () => {
    fetchMock.mock('http://localhost/mundo/mostread.json', mostReadJson);
    fetchMock.mock(
      'http://localhost/mundo/sty-secondary-column.json',
      secondaryColumnJson,
    );
    const additionalPageData = await getAdditionalPageData(styJson, 'mundo');

    const expectedOutput = {
      mostRead: mostReadJson,
      secondaryColumn: secondaryColumnJson,
    };

    expect(additionalPageData).toEqual(expectedOutput);
  });

  it('should return an empty object when a data fetch fails', async () => {
    fetchMock.mock('http://localhost/mundo/mostread.json', 404);
    fetchMock.mock('http://localhost/mundo/sty-secondary-column.json', 404);
    const additionalPageData = await getAdditionalPageData(styJson, 'mundo');

    expect(additionalPageData).toEqual({});
  });
});
