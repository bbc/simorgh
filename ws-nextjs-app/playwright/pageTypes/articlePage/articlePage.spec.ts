import { expect, test } from '@playwright/test';
import { baseURL, shouldRunForEnv } from '../../utilities/env';

const ARTICLE_PATH = '/pidgin/articles/ce9wk6glg4lo';
const ONWARD_JOURNEYS = [
  'topStoriesAndFeatures',
  'mostRead',
  'portraitVideo',
  'videoCuration',
];

test.describe('articlePage', () => {
  test('requests article onward journeys after canonical page hydration', async ({
    page,
  }) => {
    test.skip(
      !shouldRunForEnv(['local']),
      'Article onward journeys are validated against the local Next.js app.',
    );

    const onwardJourneyRequests = ONWARD_JOURNEYS.map(onwardJourney =>
      page.waitForRequest(request => {
        const url = new URL(request.url());

        return (
          request.method() === 'GET' &&
          url.pathname === '/fd/simorgh-bff' &&
          url.searchParams.get('onwardJourney') === onwardJourney
        );
      }),
    );

    await page.goto(`${baseURL}${ARTICLE_PATH}`, {
      waitUntil: 'domcontentloaded',
    });

    const requests = await Promise.all(onwardJourneyRequests);

    requests.forEach(request => {
      const url = new URL(request.url());

      expect(url.searchParams.get('service')).toBe('pidgin');
    });
  });
});
