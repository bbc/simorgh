import fetchData from '../utils/fetchData';
import getMediaAssetPageInitialData from '.';

const mockData = { service: 'pidgin', status: 200, pageData: {} };
const mockBaseUrl = 'http://localhost:7080';

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
    });
  });
  it('should return the expected page data', async () => {
    expect(await getMediaAssetPageInitialData({ service: 'pidgin' })).toEqual(
      mockData,
    );
  });
});
