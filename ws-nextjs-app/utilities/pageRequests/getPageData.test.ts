import * as fetchPageData from '#app/routes/utils/fetchPageData';
import * as fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
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

      jest.spyOn(fetchPageData, 'default').mockResolvedValue({
        status: 200,
        json: { data: fetchDataResponse },
      });

      const { data: actualData } = await getPageData({
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
    });

    it('Cleans malicious query parameters', async () => {
      const fetchDataResponse = { title: 'UGC Form Title!' };

      jest.spyOn(fetchPageData, 'default').mockResolvedValue({
        status: 200,
        json: { data: fetchDataResponse },
      });

      const fetchDataFromBFFSpy = jest.spyOn(fetchDataFromBFF, 'default');

      await getPageData({
        id: 'u50853489',
        service: 'mundo',
        variant: undefined,
        rendererEnv: 'live&evilParam=evil',
        resolvedUrl: '/mundo/send/u50853489',
        pageType: 'ugcForm',
      });

      expect(fetchDataFromBFFSpy.mock.calls[0][0].pathname).toEqual(
        'u50853489?renderer_env=live',
      );
    });

    it('Returns page data and status 404 for an invalid page', async () => {
      const errorMessage = 'Something went wrong!';

      jest.spyOn(fetchPageData, 'default').mockRejectedValue({
        message: errorMessage,
        status: 404,
      });

      const { data: actualData } = await getPageData({
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
    });
  });
});
