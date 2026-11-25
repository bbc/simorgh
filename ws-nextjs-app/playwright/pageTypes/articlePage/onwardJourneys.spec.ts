import { expect, test } from '@playwright/test';
import polskaArticle from '#data/polska/articles/c639526lxlro.json';
import { baseURL, shouldRunForEnv } from '../../utilities/env';

const ARTICLE_PATH = '/pidgin/articles/ce9wk6glg4lo';
const ONWARD_JOURNEYS = ['topStoriesAndFeatures', 'portraitVideo', 'mostRead'];

test.describe('articlePage', () => {
  test.use({ serviceWorkers: 'block' });

  [
    { width: 390, height: 844, topBarVisible: true },
    { width: 1280, height: 800, topBarVisible: false },
  ].forEach(({ width, height, topBarVisible }) => {
    test(`loads treatment Top Stories at viewport width ${width}`, async ({
      page,
    }) => {
      test.skip(!shouldRunForEnv(['local']));
      await page.setViewportSize({ width, height });
      await page.route(`${baseURL}/polska/articles/c639526lxlro`, route =>
        route.continue({
          headers: {
            ...route.request().headers(),
            'mvt-newswb_ws_topbarojs_read_more':
              'experiment;top-bar-top-stories',
          },
        }),
      );
      let releaseResponse!: () => void;
      const responseReady = new Promise<void>(resolve => {
        releaseResponse = resolve;
      });
      let topStoriesRequests = 0;
      await page.route('**/fd/simorgh-bff?*', async route => {
        const journey = new URL(route.request().url()).searchParams.get(
          'onwardJourney',
        );
        if (journey === 'topStoriesAndFeatures') {
          topStoriesRequests += 1;
          await responseReady;
          await route.fulfill({
            json: {
              data: {
                topStories: polskaArticle.data.secondaryData.topStories,
                features: polskaArticle.data.secondaryData.features,
              },
            },
          });
        } else {
          await route.fulfill({ json: { data: null } });
        }
      });
      await page.goto(`${baseURL}/polska/articles/c639526lxlro`, {
        waitUntil: 'domcontentloaded',
      });
      const topBar = page.getByTestId('top-bar-onward-journeys');
      if (topBarVisible) {
        await expect(topBar).toBeVisible();
      } else {
        await expect(topBar).toBeHidden();
        await page
          .getByTestId('onward-journey-skeleton-topStoriesAndFeatures')
          .last()
          .scrollIntoViewIfNeeded();
      }
      await expect.poll(() => topStoriesRequests).toBe(1);
      releaseResponse();
      if (topBarVisible) {
        await expect(topBar.getByRole('listitem').first()).toBeVisible();
        await expect(page.getByTestId('top-stories')).toBeHidden();
      } else {
        await expect(page.getByTestId('top-stories')).toBeVisible();
        await expect(page.getByTestId('features')).toBeVisible();
      }
      expect(topStoriesRequests).toBe(1);
    });
  });

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

    const requestOnwardJourney = async (onwardJourney: string) => {
      if (!onwardJourneyRequests.has(onwardJourney)) {
        await page
          .getByTestId(`onward-journey-skeleton-${onwardJourney}`)
          .first()
          .scrollIntoViewIfNeeded();
      }

      await expect
        .poll(() => onwardJourneyRequests.has(onwardJourney))
        .toBe(true);
    };

    await ONWARD_JOURNEYS.reduce(
      (requestChain, onwardJourney) =>
        requestChain.then(() => requestOnwardJourney(onwardJourney)),
      Promise.resolve(),
    );

    expect(new Set(onwardJourneyRequests.keys())).toEqual(
      new Set(ONWARD_JOURNEYS),
    );
    onwardJourneyRequests.forEach(url => {
      expect(url.searchParams.get('service')).toBe('pidgin');
    });
  });
});
