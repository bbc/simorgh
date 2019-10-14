import fetchData from '../utils/fetchData';
import getCpsAssetInitialData from '.';

const mockData = { service: 'pidgin', status: 200, pageData: {} };

jest.mock('../utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => mockData);

const pathname = `/pidgin/tori-49450859`;

describe('getCpsAssetInitialData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return expected data', async () => {
    const response = await getCpsAssetInitialData(pathname);

    expect(fetchData).toHaveBeenCalledWith({ pathname });

    expect(response).toEqual(mockData);
  });
});
