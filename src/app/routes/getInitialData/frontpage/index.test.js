import fetchData from '../utils/fetchData';
import filterUnknownContentTypes from '#lib/utilities/preprocessor/rules/filterContentType';
import filterEmptyGroupItems from '#lib/utilities/preprocessor/rules/filterEmptyGroupItems';
import applySquashTopstories from '#lib/utilities/preprocessor/rules/topstories';
import addIdsToItems from '#lib/utilities/preprocessor/rules/addIdsToItems';
import filterGroupsWithoutStraplines from '#lib/utilities/preprocessor/rules/filterGroupsWithoutStraplines';

const preprocessorRules = [
  filterUnknownContentTypes,
  filterEmptyGroupItems,
  addIdsToItems,
  applySquashTopstories,
  filterGroupsWithoutStraplines,
];

const fetchDataMockResponse = {
  pageData: 'foo',
  status: 123,
};
jest.mock('../utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => fetchDataMockResponse);

const getFrontpageInitialData = require('.').default;

describe('getFrontpageInitialData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data and returns expected object', async () => {
    const pathname = '/news';
    const response = await getFrontpageInitialData(pathname);

    expect(fetchData).toHaveBeenCalledWith({
      pathname,
      preprocessorRules,
    });

    expect(response).toEqual({
      pageData: 'foo',
      status: 123,
    });
  });
});
