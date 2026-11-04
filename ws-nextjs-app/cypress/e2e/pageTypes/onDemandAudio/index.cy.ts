import { AUDIO_PAGE } from '#app/routes/utils/pageTypes';
import runTestsForPage, {
  TestDataType,
} from '#nextjs/cypress/support/helpers/runTestsForPage';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../specialFeatures/atiAnalytics/assertions/liteSiteSummary';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';
import {
  assertRadioScheduleComponentClick,
  assertRadioScheduleComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/radioSchedule';
import {
  assertPodcastPromoComponentClick,
  assertPodcastPromoComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/podcastPromo';
import {
  assertRecentAudioEpisodesComponentClick,
  assertRecentAudioEpisodesComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/recentAudioEpisodes';
import {
  assertPodcastLinksComponentClick,
  assertPodcastLinksComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/podcastLinks';
import {
  assertPageView,
  assertResonancePageView,
} from '../../specialFeatures/atiAnalytics/assertions';
import chartbeatTests from '../../../support/helpers/chartbeatTests';
import e2eTests from './tests';
import testsForAllPages from '../../testsForAllPages';
import testsForAllCanonicalPages from '../../testsForAllCanonicalPages';

const coreTests = [e2eTests];
const fullTests = [
  e2eTests,
  chartbeatTests,
  testsForAllPages,
  testsForAllCanonicalPages,
];

// Pages are chosen to cover radio/podcast, brand/episode, LTR/RTL,
// script variants and services with toggles both on and off.
const testSuites = [
  {
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq', // Radio Brand, LTR
    service: 'afrique',
    runforEnv: ['test', 'live'],
    tests: fullTests,
  },
  {
    path: '/afrique/bbc_afrique_radio/w172y1g3d9108lh', // Radio Episode, LTR
    service: 'afrique',
    runforEnv: ['test', 'live'],
    tests: coreTests,
  },
  {
    path: '/arabic/bbc_arabic_radio/programmes/p030vh2y', // Radio Brand, RTL
    service: 'arabic',
    runforEnv: ['test', 'live'],
    tests: coreTests,
  },
  {
    path: '/arabic/bbc_arabic_radio/w172y3wn75cm441', // Radio Episode, RTL
    service: 'arabic',
    runforEnv: ['test', 'live'],
    tests: fullTests,
  },
  {
    path: '/arabic/podcasts/p02pc9qc', // Podcast Brand, RTL
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
    tests: fullTests,
  },
  {
    path: '/dari/bbc_dari_radio/programmes/p0340v0s', // Radio Brand, recent audio episodes toggled off
    service: 'dari',
    runforEnv: ['test'],
    tests: coreTests,
  },
  {
    path: '/hausa/podcasts/p08mlgcb', // Podcast Brand, LTR
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests: coreTests,
  },
  {
    path: '/hausa/podcasts/p08mlgcb/p09l0fw6', // Podcast Episode, LTR
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests: fullTests,
  },
  {
    path: '/persian/podcasts/p02pc9wf', // Podcast Brand
    service: 'persian',
    runforEnv: ['local', 'test', 'live'],
    tests: coreTests,
  },
  {
    path: '/portuguese/podcasts/p07r3r3t', // Podcast Brand
    service: 'portuguese',
    runforEnv: ['local', 'test', 'live'],
    tests: coreTests,
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/w172xwswq9t42v6', // Radio Episode, script variant, radio schedule toggled off
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests: fullTests,
  },
] as unknown as TestDataType[];

const atiAnalyticsPodcastComponentTests = [
  assertPageView,
  assertPodcastLinksComponentView,
  assertPodcastLinksComponentClick,
  assertRecentAudioEpisodesComponentView,
  assertRecentAudioEpisodesComponentClick,
];

const atiAnalyticsTestSuites = [
  {
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq',
    runforEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_radio.programmes.p030s6dq.page',
    siteId: 3,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [
      assertPageView,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
      assertRadioScheduleComponentView,
      assertRadioScheduleComponentClick,
    ],
  },
  {
    path: '/arabic/bbc_arabic_radio/w3ct01yb',
    runforEnv: ['local', 'test', 'live'],
    service: 'arabic',
    pageIdentifier: 'arabic.bbc_arabic_radio.w3ct01yb.page',
    siteId: 5,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [assertPageView, assertResonancePageView],
  },
  {
    path: '/gahuza/podcasts/p07yh8hb',
    runforEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.bbc_gahuza_radio.podcasts.programmes.p07yh8hb.page',
    siteId: 40,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [...atiAnalyticsPodcastComponentTests],
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p094vs2n',
    runforEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.bbc_gahuza_radio.podcasts.p094vs2n.page',
    siteId: 40,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [...atiAnalyticsPodcastComponentTests],
  },
  {
    path: '/portuguese/podcasts/p07r3r3t',
    runforEnv: ['local', 'test', 'live'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.bbc_brasil.podcasts.programmes.p07r3r3t.page',
    siteId: 33,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [...atiAnalyticsPodcastComponentTests],
  },
  {
    path: '/portuguese/podcasts/p07r3r3t/p0ldy4p8',
    runforEnv: ['test', 'live'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.bbc_brasil.podcasts.p0ldy4p8.page',
    siteId: 33,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [...atiAnalyticsPodcastComponentTests],
  },
  {
    path: '/ukrainian/podcasts/p09jsy3h',
    runforEnv: ['test', 'live'],
    service: 'ukrainian',
    pageIdentifier:
      'ukrainian.bbc_ukrainian_audio.podcasts.programmes.p09jsy3h.page',
    siteId: 94,
    applicationType: 'responsive',
    contentType: 'player-episode',
    tests: [...atiAnalyticsPodcastComponentTests],
  },
] as unknown as TestDataType[];

const liteTestPaths = [
  '/afrique/bbc_afrique_radio/programmes/p030s6dq',
  '/portuguese/podcasts/p07r3r3t',
  '/portuguese/podcasts/p07r3r3t/p0ldy4p8',
];

const atiAnalyticsLiteTestSuites = atiAnalyticsTestSuites
  .filter(({ path }) => liteTestPaths.includes(path))
  .map(testSuite => {
    const excludedLiteTests = [
      assertPodcastPromoComponentView, // Podcast promo removed from lite article pages
      assertPodcastPromoComponentClick, // Podcast promo removed from lite article pages
    ];

    const liteSiteTests = testSuite.tests.filter(
      test => !excludedLiteTests.includes(test),
    );

    // All lite enabled pages should have the Lite Site Summary component
    liteSiteTests.push(assertLiteSiteSummaryComponentToMainSiteClick);

    return {
      ...testSuite,
      path: getPathWithSuffix({ path: testSuite.path, suffix: '.lite' }),
      applicationType: 'lite',
      siteId: testSuite.siteId,
      tests: [...liteSiteTests],
    };
  });

runTestsForPage({
  pageType: AUDIO_PAGE,
  testSuites,
});

runTestsForPage({
  pageType: AUDIO_PAGE,
  testSuites: atiAnalyticsTestSuites,
  testIsolation: true,
});

runTestsForPage({
  pageType: AUDIO_PAGE,
  testSuites: atiAnalyticsLiteTestSuites,
});
