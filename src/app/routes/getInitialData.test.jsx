import {
  ERROR_PAGE,
  TOPIC_PAGE,
  ARTICLE_PAGE,
  HOME_PAGE,
  FRONT_PAGE,
  MOST_READ_PAGE,
} from '#app/routes/utils/pageTypes';
import routes from './index';

const MOCK_PATH = 'mock-path';

const toggles = {
  liveRadioSchedule: { enabled: true },
};

const pageTypesToSkip = [
  ERROR_PAGE,
  TOPIC_PAGE,
  ARTICLE_PAGE,
  HOME_PAGE,
  FRONT_PAGE,
  MOST_READ_PAGE,
];

describe('getInitialData', () => {
  afterEach(() => {
    jest.resetAllMocks();
    fetch.resetMocks();
  });

  routes
    .filter(route => !pageTypesToSkip.includes(route.pageType))
    .forEach(({ getInitialData, pageType }) => {
      it(`${pageType} - should handle Ares 404`, async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

        const actual = await getInitialData({
          path: MOCK_PATH,
          pageType,
          toggles,
        });
        const expected = {
          error: 'data_response_404',
          status: 404,
        };

        expect(actual).toEqual(expected);
      });

      it(`${pageType} - should handle Ares 202`, async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 202 });

        const actual = await getInitialData({
          path: MOCK_PATH,
          pageType,
          toggles,
        });

        expect(actual.status).toEqual(502);
        expect(actual.error).toMatch(
          'Unexpected upstream response (HTTP status code 202) when requesting',
        );
      });

      it(`${pageType} - should handle Ares 500`, async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

        const actual = await getInitialData({
          path: MOCK_PATH,
          pageType,
          toggles,
        });

        expect(actual.status).toEqual(502);
        expect(actual.error).toMatch(
          'Unexpected upstream response (HTTP status code 500) when requesting',
        );
      });

      it(`${pageType} - should handle Ares returning unexpected data`, async () => {
        fetch.mockResponseOnce('dataIsNotAsExpected');

        const actual = await getInitialData({
          path: MOCK_PATH,
          pageType,
          toggles,
        });

        expect(actual.status).toEqual(502);
        expect(actual.error).toEqual(
          'invalid json response body at  reason: Unexpected token d in JSON at position 0',
        );
      });
    });
});
