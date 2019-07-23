import baseUrl from '../utils/getBaseUrl';
import onClient from '../../../lib/utilities/onClient';
import fetchData from '../utils/fetchData';
import filterUnknownCpsTypes from '../../../lib/utilities/preprocessor/rules/cpstypes';
import filterEmptyGroupItems from '../../../lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '../../../lib/utilities/preprocessor/rules/topstories';

const preprocessorRules = [
  filterUnknownCpsTypes,
  filterEmptyGroupItems,
  applySquashTopstories,
];

process.env.SIMORGH_BASE_URL = 'https://www.SIMORGH_BASE_URL.com';

const getBaseUrlMockOrigin = 'https://www.getBaseUrl.com';
jest.mock('../utils/getBaseUrl', () => jest.fn());
baseUrl.mockImplementation(() => getBaseUrlMockOrigin);

let onClientMockResponse = true;
jest.mock('../../../lib/utilities/onClient', () => jest.fn());
onClient.mockImplementation(() => onClientMockResponse);

const fetchDataMockResponse = {
  pageData: 'foo',
  status: 123,
};
jest.mock('../utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => fetchDataMockResponse);

const getFrontpageInitialData = require('.').default;

const defaultServiceParam = 'news';
const defaultAmpParam = '';
let defaultContext;

describe('getFrontpageInitialData', () => {
  beforeEach(() => {
    defaultContext = {
      service: defaultServiceParam,
      amp: defaultAmpParam,
    };

    jest.clearAllMocks();
  });

  it('fetches data and returns expected object', async () => {
    const response = await getFrontpageInitialData(defaultContext);

    expect(fetchData).toHaveBeenCalledWith({
      url: 'https://www.getBaseUrl.com/news.json',
      preprocessorRules,
    });

    expect(response).toEqual({
      pageData: 'foo',
      status: 123,
    });
  });

  describe('When on amp', () => {
    beforeEach(() => {
      defaultContext.amp = true;
    });

    it('returns isAmp as true', async () => {
      const response = await getFrontpageInitialData(defaultContext);

      expect(fetchData).toHaveBeenCalledWith({
        url: 'https://www.getBaseUrl.com/news.json',
        preprocessorRules,
      });

      expect(response).toEqual({
        pageData: 'foo',
        status: 123,
      });
    });
  });

  describe('When not on client', () => {
    beforeEach(() => {
      onClientMockResponse = false;
    });

    it('fetches data from SIMORGH_BASE_URL enviroment variable origin', async () => {
      const response = await getFrontpageInitialData(defaultContext);

      expect(fetchData).toHaveBeenCalledWith({
        url: 'https://www.SIMORGH_BASE_URL.com/news.json',
        preprocessorRules,
      });

      expect(response).toEqual({
        pageData: 'foo',
        status: 123,
      });
    });
  });
});
