import fetchData from '../utils/fetchData';
import getMediaAssetPageInitialData from '.';

const mockBaseUrl = 'http://localhost:7080';

jest.mock('../utils/fetchData', () => jest.fn());

describe('getMediaAssetPageInitialData', () => {
  it('should match the url for MAPs', async () => {
    await getMediaAssetPageInitialData({
      service: 'pidgin',
      mediaId: 'tori-49450859',
    });

    expect(fetchData).toBeCalledWith({
      url: `${mockBaseUrl}/pidgin/tori-49450859`,
    });
  });
});
