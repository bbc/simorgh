import routes from './index';

const MOCK_PATH = 'mock-path';

routes
  .filter(route => route.pageType !== 'error')
  .forEach(({ getInitialData, pageType }) => {
    it(`${pageType} - should handle Ares 404`, async () => {
      global.fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

      const actual = await getInitialData({ path: MOCK_PATH, pageType });
      const expected = {
        error: 'data_response_404',
        status: 404,
      };

      expect(actual).toEqual(expected);
    });

    it(`${pageType} - should handle Ares 202`, async () => {
      global.fetch.mockResponseOnce(JSON.stringify({}), { status: 202 });

      const actual = await getInitialData({ path: MOCK_PATH, pageType });

      expect(actual.status).toEqual(502);
      expect(actual.error).toMatch(
        'Unexpected upstream response (HTTP status code 202) when requesting',
      );
    });

    it(`${pageType} - should handle Ares 500`, async () => {
      global.fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

      const actual = await getInitialData({ path: MOCK_PATH, pageType });

      expect(actual.status).toEqual(502);
      expect(actual.error).toMatch(
        'Unexpected upstream response (HTTP status code 500) when requesting',
      );
    });

    it(`${pageType} - should handle Ares returning unexpected data`, async () => {
      global.fetch.mockResponseOnce('dataIsNotAsExpected');

      const actual = await getInitialData({ path: MOCK_PATH, pageType });

      expect(actual.status).toEqual(502);
      expect(actual.error).toEqual(
        'invalid json response body at  reason: Unexpected token d in JSON at position 0',
      );
    });
  });
