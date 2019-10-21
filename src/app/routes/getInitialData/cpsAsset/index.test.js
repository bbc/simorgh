import fetchData from '../utils/fetchData';
import getCpsAssetInitialData from '.';
import convertToOptimoBlocks from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks';

const mockData = { service: 'pidgin', status: 200, pageData: {} };

jest.mock('../utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => mockData);

const pathname = `/pidgin/tori-49450859`;

const preprocessorRules = [convertToOptimoBlocks];

describe('getCpsAssetInitialData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the url for MAPs', async () => {
    await getCpsAssetInitialData(defaultContext);

    expect(fetchData).toBeCalledWith({
      url: `${mockBaseUrl}/pidgin/tori-49450859.json`,
      preprocessorRules,
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
      preprocessorRules,
    });
  });
  
  it('should fetch and return expected data', async () => {
    const response = await getCpsAssetInitialData(pathname);

    expect(fetchData).toHaveBeenCalledWith({ pathname });

    expect(fetchData).toHaveBeenCalledWith({
      url: 'https://www.SIMORGH_BASE_URL.com/pidgin/tori-49450859/variant.json',
      preprocessorRules,
    });
    expect(response).toEqual(mockData);
  });
});
