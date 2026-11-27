import * as fetchPageData from '#app/routes/utils/fetchPageData';
import * as fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import getPageData from './getPageData';

const agent = { cert: 'cert', ca: 'ca', key: 'key' };

jest.mock('#utilities/getAgent', () => jest.fn(() => Promise.resolve(agent)));
jest.mock('#app/routes/utils/fetchPageData');
jest.mock('#app/lib/utilities/fetchToggles');
jest.mock('#app/routes/utils/fetchDataFromBFF', () => {
  const originalModule = jest.requireActual(
    '#app/routes/utils/fetchDataFromBFF',
  );
  return {
    __esModule: true,
    ...originalModule,
  };
});

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

  describe('BBC URL rewriting', () => {
    const originalAppEnv = process.env.SIMORGH_APP_ENV;
    const articleUrl = 'https://www.bbc.com/mundo/articles/c0000000000o';

    const getPageDataWithLink = (rendererEnv?: string) => {
      jest.spyOn(fetchPageData, 'default').mockResolvedValue({
        status: 200,
        json: { data: { link: articleUrl } },
      });

      return getPageData({
        id: 'c0000000000o',
        service: 'mundo',
        variant: undefined,
        rendererEnv,
        resolvedUrl: '/mundo/articles/c0000000000o',
        pageType: 'article',
      });
    };

    afterEach(() => {
      if (originalAppEnv === undefined) {
        delete process.env.SIMORGH_APP_ENV;
      } else {
        process.env.SIMORGH_APP_ENV = originalAppEnv;
      }
    });

    it.each(['local', 'test'])(
      'rewrites URLs to the base URL when SIMORGH_APP_ENV is %s',
      async appEnv => {
        process.env.SIMORGH_APP_ENV = appEnv;

        const { data } = await getPageDataWithLink();

        expect(data.pageData).toEqual({
          link: 'http://localhost:7081/mundo/articles/c0000000000o?renderer_env=test',
        });
      },
    );

    it('preserves a live renderer_env on rewritten URLs', async () => {
      process.env.SIMORGH_APP_ENV = 'local';

      const { data } = await getPageDataWithLink('live');

      expect(data.pageData).toEqual({
        link: 'http://localhost:7081/mundo/articles/c0000000000o?renderer_env=live',
      });
    });

    it.each(['live', undefined])(
      'does not rewrite URLs when SIMORGH_APP_ENV is %s',
      async appEnv => {
        if (appEnv) {
          process.env.SIMORGH_APP_ENV = appEnv;
        } else {
          delete process.env.SIMORGH_APP_ENV;
        }

        const { data } = await getPageDataWithLink();

        expect(data.pageData).toEqual({ link: articleUrl });
      },
    );
  });
});
