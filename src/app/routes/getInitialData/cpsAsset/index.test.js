import fetchData from '../utils/fetchData';
import getCpsAssetInitialData from '.';
import convertToOptimoBlocks from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks';
import addHeadlineBlock from '#lib/utilities/preprocessor/rules/cpsAssetPage/addHeadlineBlock';
import applyTimestampRules from '#lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/blockPositioning';

const preprocessorRules = [
  convertToOptimoBlocks,
  addHeadlineBlock,
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
];

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

    expect(fetchData).toHaveBeenCalledWith({ pathname, preprocessorRules });

    expect(response).toEqual(mockData);
  });
});
