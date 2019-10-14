import fetchData from '../utils/fetchData';
import applyTimestampRules from '#lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/blockPositioning';

const getArticleInitialData = require('.').default;

const preprocessorRules = [
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
];

const fetchDataMockResponse = {
  pageData: 'foo',
  status: 123,
};
jest.mock('../utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => fetchDataMockResponse);

const pathname = `/news/articles/c0000000001o`;

describe('getArticleInitialData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data and returns expected object', async () => {
    const response = await getArticleInitialData(pathname);

    expect(fetchData).toHaveBeenCalledWith({ pathname, preprocessorRules });

    expect(response).toEqual({
      pageData: 'foo',
      status: 123,
    });
  });
});
