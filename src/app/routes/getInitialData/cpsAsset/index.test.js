import baseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import getCpsAssetInitialData from '.';

const mockData = { service: 'pidgin', status: 200, pageData: {} };

const mockBaseUrl = 'https://www.SIMORGH_BASE_URL.com';

jest.mock('../utils/getBaseUrl', () => jest.fn());
baseUrl.mockImplementation(() => mockBaseUrl);

jest.mock('../utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => mockData);

const defaultServiceParam = 'pidgin';
const defaultAssetUri = 'tori-49450859';
const defaultAmpParam = '';
let defaultContext;

describe('getCpsAssetInitialData', () => {
  beforeEach(() => {
    defaultContext = {
      service: defaultServiceParam,
      assetUri: defaultAssetUri,
      amp: defaultAmpParam,
    };

    jest.clearAllMocks();
  });

  it('should match the url for MAPs', async () => {
    await getCpsAssetInitialData(defaultContext);

    expect(fetchData).toBeCalledWith({
      url: `${mockBaseUrl}/pidgin/tori-49450859.json`,
    });
  });

  it('should return the expected page data', async () => {
    expect(await getCpsAssetInitialData({ service: 'pidgin' })).toEqual(
      mockData,
    );
  });

  it('fetches data and returns expected object with variant', async () => {
    await getCpsAssetInitialData({
      ...defaultContext,
      variant: 'variant',
    });

    expect(fetchData).toHaveBeenCalledWith({
      url: 'https://www.SIMORGH_BASE_URL.com/pidgin/tori-49450859/variant.json',
    });
  });

  it('fetches data and returns expected object with variant with leading slash', async () => {
    await getCpsAssetInitialData({
      ...defaultContext,
      variant: '/variant',
    });

    expect(fetchData).toHaveBeenCalledWith({
      url: 'https://www.SIMORGH_BASE_URL.com/pidgin/tori-49450859/variant.json',
    });
  });
});
