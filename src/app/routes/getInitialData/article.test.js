import baseUrl from './utils/getBaseUrl';
import onClient from '../../helpers/onClient';
import fetchData from './utils/fetchData';

process.env.SIMORGH_BASE_URL = 'https://www.SIMORGH_BASE_URL.com';

const getBaseUrlMockOrigin = 'https://www.getBaseUrl.com';
jest.mock('./utils/getBaseUrl', () => jest.fn());
baseUrl.mockImplementation(() => getBaseUrlMockOrigin);

let onClientMockResponse = true;
jest.mock('../../helpers/onClient', () => jest.fn());
onClient.mockImplementation(() => onClientMockResponse);

const fetchDataMockResponse = {
  pageData: 'foo',
  status: 123,
};
jest.mock('./utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => fetchDataMockResponse);

const getArticleInitialData = require('./article').default;

const defaultIdParam = 'c0000000001o';
const defaultServiceParam = 'news';
let defaultContext;

describe('getArticleInitialData', () => {
  beforeEach(() => {
    defaultContext = {
      id: defaultIdParam,
      service: defaultServiceParam,
    };

    jest.clearAllMocks();
  });

  it('fetches data and returns expected object', async () => {
    const response = await getArticleInitialData(defaultContext);

    expect(fetchData).toHaveBeenCalledWith({
      url: 'https://www.getBaseUrl.com/news/articles/c0000000001o.json',
    });

    expect(response).toEqual({
      pageData: 'foo',
      status: 123,
    });
  });

  describe('When not on client', () => {
    beforeEach(() => {
      onClientMockResponse = false;
    });

    it('fetches data from SIMORGH_BASE_URL enviroment variable origin', async () => {
      const response = await getArticleInitialData(defaultContext);

      expect(fetchData).toHaveBeenCalledWith({
        url: 'https://www.SIMORGH_BASE_URL.com/news/articles/c0000000001o.json',
      });

      expect(response).toEqual({
        pageData: 'foo',
        status: 123,
      });
    });
  });
});
