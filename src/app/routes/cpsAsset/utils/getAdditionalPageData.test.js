import getAdditionalPageData from './getAdditionalPageData';
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';
import styJson from '#data/mundo/cpsAssets/23263889.json';
import mostReadJson from '#data/mundo/mostRead/index.json';

describe('getAdditionalPageData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return no aditional data for a MAP asset', async () => {
    const additionalPageData = await getAdditionalPageData(mapJson, 'pidgin');

    expect(additionalPageData).toBe(null);
  });

  it('should return additonal data for an STY asset', async () => {
    jest.spyOn(global, 'fetch').mockResponse(JSON.stringify(mostReadJson));
    const additionalPageData = await getAdditionalPageData(styJson, 'mundo');

    const expectedOutput = {
      mostRead: mostReadJson,
    };

    expect(additionalPageData).toEqual(expectedOutput);
  });

  it('should return an empty object when a data fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockResponse(JSON.stringify({}));
    const additionalPageData = await getAdditionalPageData(styJson, 'mundo');

    expect(additionalPageData).toEqual({});
  });
});
