import fetchData from '../utils/fetchData';
import baseUrl from '../utils/getBaseUrl';
import onClient from '#lib/utilities/onClient';

import getMediaPageInitialData from '.';

const mockData = { service: 'amharic', status: 200, pageData: {} };

process.env.SIMORGH_BASE_URL = 'https://www.SIMORGH_BASE_URL.com';

const getBaseUrlMockOrigin = 'https://www.getBaseUrl.com';
jest.mock('../utils/getBaseUrl', () => jest.fn());
baseUrl.mockImplementation(() => getBaseUrlMockOrigin);

let onClientMockResponse = true;
jest.mock('#lib/utilities/onClient', () => jest.fn());
onClient.mockImplementation(() => onClientMockResponse);

jest.mock('../utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => mockData);

const defaultParams = {
  service: 'amharic',
  serviceId: 'bbc_amharic_radio',
  mediaId: 'liveradio',
};

describe('getMediaPageInitialData', () => {
  it('returns expected pageData', async () => {
    expect(await getMediaPageInitialData(defaultParams)).toEqual(mockData);
  });

  describe('When not on client', () => {
    beforeEach(() => {
      onClientMockResponse = false;
    });

    it('fetches data from SIMORGH_BASE_URL enviroment variable origin', async () => {
      const response = await getMediaPageInitialData(defaultParams);
      expect(response).toEqual(mockData);

      expect(fetchData).toHaveBeenCalledWith({
        url:
          'https://www.SIMORGH_BASE_URL.com/amharic/bbc_amharic_radio/liveradio.json',
      });
    });
  });
});
