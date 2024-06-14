import * as fetchPageData from '#app/routes/utils/fetchPageData';
import * as getToggles from '#app/lib/utilities/getToggles';
import getPageData from './getPageData';

const agent = { cert: 'cert', ca: 'ca', key: 'key' };
jest.mock('#server/utilities/getAgent', () =>
  jest.fn(() => Promise.resolve(agent)),
);

describe('getPageData', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('UGC Page Data', () => {
    it('Returns page data and status 200 for a valid page', async () => {
      const fetchDataResponse = { title: 'UGC Form Title!' };

      const toggleResponse = {
        toggles: { testToggle: { enabled: true } },
      };

      jest.spyOn(fetchPageData, 'default').mockResolvedValue({
        status: 200,
        json: { data: fetchDataResponse },
      });

      jest.spyOn(getToggles, 'default').mockResolvedValue(toggleResponse);

      const { data: actualData, toggles: actualToggles } = await getPageData({
        id: 'u50853489',
        service: 'mundo',
        variant: undefined,
        rendererEnv: undefined,
        resolvedUrl: '/mundo/send/u50853489',
        pageType: 'ugcForm',
      });

      expect(actualData).toStrictEqual({
        pageData: fetchDataResponse,
        status: 200,
      });
      expect(actualToggles).toStrictEqual(toggleResponse);
    });

    it('Returns page data and status 404 for an invalid page', async () => {
      const errorMessage = 'Something went wrong!';
      const toggleResponse = {
        toggles: { testToggle: { enabled: true } },
      };

      jest.spyOn(fetchPageData, 'default').mockRejectedValue({
        message: errorMessage,
        status: 404,
      });

      jest.spyOn(getToggles, 'default').mockResolvedValue(toggleResponse);

      const { data: actualData, toggles: actualToggles } = await getPageData({
        id: 'u50853489',
        service: 'mundo',
        variant: undefined,
        rendererEnv: undefined,
        resolvedUrl: '/mundo/send/u50853489',
        pageType: 'ugcForm',
      });

      expect(actualData).toStrictEqual({
        error: errorMessage,
        status: 404,
      });

      expect(actualToggles).toStrictEqual(toggleResponse);
    });
  });
});
