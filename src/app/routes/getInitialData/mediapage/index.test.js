import fetchData from '../utils/fetchData';

import getMediaPageInitialData from '.';

const mockData = { service: 'amharic', status: 200, pageData: {} };

const mockBaseUrl = 'http://localhost:7080';

jest.mock('../utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => mockData);

describe('getMediaPageInitialData', () => {
  it('remaps bbc_oromo_radio', async () => {
    await getMediaPageInitialData({
      service: 'afaanoromo',
      serviceId: 'bbc_oromo_radio',
      mediaId: 'liveradio',
    });
    expect(fetchData).toBeCalledWith({
      url: `${mockBaseUrl}/afaanoromo/bbc_afaanoromo_radio/liveradio.json`,
    });
  });

  it('returns expected pageData', async () => {
    expect(await getMediaPageInitialData({ service: 'amharic' })).toEqual(
      mockData,
    );
  });
});
