import fetchData from '../utils/fetchData';
import getRadioPageInitialData from '.';
import addIdsToBlocks from './addIdsToBlocks';

jest.mock('./addIdsToBlocks');
jest.mock('../utils/fetchData');

const mockData = { service: 'amharic', status: 200, pageData: {} };

addIdsToBlocks.mockImplementation(() => jest.fn());
fetchData.mockImplementation(() => mockData);

const pathname = '/amharic/bbc_amharic_radio/liveradio';
const preprocessorRules = [addIdsToBlocks];

describe('getRadioPageInitialData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns expected pageData', async () => {
    expect(await getRadioPageInitialData(pathname)).toEqual(mockData);

    expect(fetchData).toHaveBeenCalledWith({
      pathname,
      preprocessorRules,
    });
  });
});
