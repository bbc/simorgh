import fetchData from '../utils/fetchData';
import baseUrl from '../utils/getBaseUrl';
import onClient from '../../../lib/utilities/onClient';
import getMediaPageInitialData from '.';
import addIdsToBlocks from './addIdsToBlocks';

jest.mock('./addIdsToBlocks');
jest.mock('../utils/getBaseUrl');
jest.mock('../../../lib/utilities/onClient');
jest.mock('../utils/fetchData');

const mockData = { service: 'amharic', status: 200, pageData: {} };
const onClientMockResponse = false;
const getBaseUrlMockOrigin = 'https://www.getBaseUrl.com';

process.env.SIMORGH_BASE_URL = 'https://www.SIMORGH_BASE_URL.com';

addIdsToBlocks.mockImplementation(() => jest.fn());
baseUrl.mockImplementation(() => getBaseUrlMockOrigin);
onClient.mockImplementation(() => onClientMockResponse);
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
    it('fetches data from SIMORGH_BASE_URL enviroment variable origin', async () => {
      const response = await getMediaPageInitialData(defaultParams);
      expect(response).toEqual(mockData);

      expect(fetchData).toHaveBeenCalledWith({
        url:
          'https://www.SIMORGH_BASE_URL.com/amharic/bbc_amharic_radio/liveradio.json',
        preprocessorRules: [addIdsToBlocks],
      });
    });
  });
});
