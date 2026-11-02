import { expect, test } from '@playwright/test';
import { baseURL, shouldRunForEnv } from '../../utilities/env';

const ARTICLE_PATH = '/pidgin/articles/ce9wk6glg4lo';
const ONWARD_JOURNEYS = ['topStoriesAndFeatures', 'portraitVideo', 'mostRead'];

test.describe('articlePage', () => {
  test('requests article onward journeys near their placeholders', async ({
    page,
  }) => {
    test.skip(
      !shouldRunForEnv(['local']),
      'Article onward journeys are validated against the local Next.js app.',
    );

    const onwardJourneyRequests = new Map<string, URL>();

    page.on('request', request => {
      const url = new URL(request.url());

      if (
        request.method() === 'GET' &&
        url.pathname === '/fd/simorgh-bff' &&
        url.searchParams.get('onwardJourney')
      ) {
        onwardJourneyRequests.set(
          url.searchParams.get('onwardJourney') as string,
          url,
        );
      }
    });

    await page.goto(`${baseURL}${ARTICLE_PATH}`, {
      waitUntil: 'domcontentloaded',
    });

    await Promise.all(
      ONWARD_JOURNEYS.map(async onwardJourney => {
        if (!onwardJourneyRequests.has(onwardJourney)) {
          await page
            .getByTestId(`onward-journey-skeleton-${onwardJourney}`)
            .scrollIntoViewIfNeeded();
        }

        await expect
          .poll(() => onwardJourneyRequests.has(onwardJourney))
          .toBe(true);
      }),
    );

    expect(new Set(onwardJourneyRequests.keys())).toEqual(
      new Set(ONWARD_JOURNEYS),
    );
    onwardJourneyRequests.forEach(url => {
      expect(url.searchParams.get('service')).toBe('pidgin');
    });
  });
});
