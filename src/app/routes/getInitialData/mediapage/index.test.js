import baseUrl from '../utils/getBaseUrl';
import onClient from '../../../lib/utilities/onClient';
import fetchData from '../utils/fetchData';

import getMediaPageInitialData from '.';

const mockData = { service: 'amharic', status: 200, pageData: {} };

process.env.SIMORGH_BASE_URL = 'https://www.SIMORGH_BASE_URL.com';

const getBaseUrlMockOrigin = 'https://www.getBaseUrl.com';
jest.mock('../utils/getBaseUrl', () => jest.fn());
baseUrl.mockImplementation(() => getBaseUrlMockOrigin);

const onClientMockResponse = true;
jest.mock('../../../lib/utilities/onClient', () => jest.fn());
onClient.mockImplementation(() => onClientMockResponse);

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
      url: `${getBaseUrlMockOrigin}/afaanoromo/bbc_afaanoromo_radio/liveradio.json`,
    });
  });

  it('returns expected pageData', async () => {
    expect(await getMediaPageInitialData({ service: 'amharic' })).toEqual(
      mockData,
    );
  });
});
