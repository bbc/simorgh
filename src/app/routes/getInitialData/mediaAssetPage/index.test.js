import baseUrl from '../utils/getBaseUrl';
import fetchData from '../utils/fetchData';
import getMediaAssetPageInitialData from '.';

import convertHeadingsToSubheadings from '#lib/utilities/preprocessor/rules/convertHeadingsToSubheadings';
import addCPSHeadingBlock from '#lib/utilities/preprocessor/rules/addCPSHeadingBlock';

const mockData = { service: 'pidgin', status: 200, pageData: {} };

const mockBaseUrl = 'https://www.SIMORGH_BASE_URL.com';

jest.mock('../utils/getBaseUrl', () => jest.fn());
baseUrl.mockImplementation(() => mockBaseUrl);

jest.mock('../utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => mockData);

convertHeadingsToSubheadings.default = jest.fn();
addCPSHeadingBlock.default = jest.fn();

const preprocessorRules = [convertHeadingsToSubheadings, addCPSHeadingBlock];

const defaultServiceParam = 'pidgin';
const defaultAssetUri = 'tori-49450859';
const defaultAmpParam = '';
let defaultContext;

describe('getMediaAssetPageInitialData', () => {
  beforeEach(() => {
    defaultContext = {
      service: defaultServiceParam,
      assetUri: defaultAssetUri,
      amp: defaultAmpParam,
    };

    jest.clearAllMocks();
  });

  it('should match the url for MAPs', async () => {
    await getMediaAssetPageInitialData(defaultContext);

    expect(fetchData).toBeCalledWith({
      url: `${mockBaseUrl}/pidgin/tori-49450859.json`,
      preprocessorRules,
    });
  });

  it('should return the expected page data', async () => {
    expect(await getMediaAssetPageInitialData({ service: 'pidgin' })).toEqual(
      mockData,
    );
  });

  it('fetches data and returns expected object with variant', async () => {
    await getMediaAssetPageInitialData({
      ...defaultContext,
      variant: 'variant',
    });

    expect(fetchData).toHaveBeenCalledWith({
      url: 'https://www.SIMORGH_BASE_URL.com/pidgin/tori-49450859/variant.json',
      preprocessorRules,
    });
  });

  it('fetches data and returns expected object with variant with leading slash', async () => {
    await getMediaAssetPageInitialData({
      ...defaultContext,
      variant: '/variant',
    });

    expect(fetchData).toHaveBeenCalledWith({
      url: 'https://www.SIMORGH_BASE_URL.com/pidgin/tori-49450859/variant.json',
      preprocessorRules,
    });
  });
});
