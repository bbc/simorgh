import baseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import getMediaAssetPageInitialData from '.';
import addHeadingToSTY from '../../../lib/utilities/preprocessor/rules/addHeadingToSTY';
import addTimestampToSTY from '../../../lib/utilities/preprocessor/rules/addTimestampToSTY';
import addAttributesToSTYTextBlocks from '../../../lib/utilities/preprocessor/rules/addAttributesToSTYTextBlocks';
import listCandy from '../../../lib/utilities/preprocessor/rules/listCandy';

const mockData = { service: 'pidgin', status: 200, pageData: {} };

const mockBaseUrl = 'https://www.SIMORGH_BASE_URL.com';

jest.mock('../utils/getBaseUrl', () => jest.fn());
baseUrl.mockImplementation(() => mockBaseUrl);

jest.mock('../utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => mockData);

describe('getMediaAssetPageInitialData', () => {
  it('should match the url for MAPs', async () => {
    await getMediaAssetPageInitialData({
      service: 'pidgin',
      assetUri: 'tori-49450859',
    });

    expect(fetchData).toBeCalledWith({
      url: `${mockBaseUrl}/pidgin/tori-49450859.json`,
      preprocessorRules: [
        addTimestampToSTY,
        addHeadingToSTY,
        addAttributesToSTYTextBlocks,
        listCandy,
      ],
    });
  });
  it('should return the expected page data', async () => {
    expect(await getMediaAssetPageInitialData({ service: 'pidgin' })).toEqual(
      mockData,
    );
  });
});
