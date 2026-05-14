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
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';
import e2eTests from './tests';
import testsForAllPages from '../../testsForAllPages';
import testsForAllCanonicalPages from '../../testsForAllCanonicalPages';

const tests = [e2eTests, testsForAllPages, testsForAllCanonicalPages];
const testSuites = [
  {
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq', // On Demand Brand,
    service: 'afrique',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/afrique/bbc_afrique_radio/w172y1g3d9108lh', // On Demand Episode
    service: 'afrique',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/programmes/p030vh2y', // On Demand Brand
    service: 'arabic',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/arabic/bbc_arabic_radio/w172y3wn75cm441', // On Demand Episode
    service: 'arabic',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/arabic/podcasts/p02pc9qc', // Podcast Brand
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/arabic/podcasts/p02pc9qc/p09kwwfs', // Podcast Episode
    service: 'arabic',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/dari/bbc_dari_radio/programmes/p0340v0s', // On Demand Brand Dari
    service: 'dari',
    runforEnv: ['test'],
    tests,
  },
  {
    path: '/dari/bbc_dari_radio/w172y2n5p9pfj6x', // On Demand Episode Dari
    service: 'dari',
    runforEnv: ['test'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/programmes/p030s4mh', // On Demand Brand
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hausa/bbc_hausa_radio/w3ct1qzn', // On Demand Episode
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hausa/podcasts/p08mlgcb', // Podcast Brand
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hausa/podcasts/p08mlgcb/p09l0fw6', // Podcast Episode
    service: 'hausa',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hindi/podcasts/p0552909', // Podcast Brand
    service: 'hindi',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/hindi/podcasts/p0552909/p09kjqjm', // Podcast Episode
    service: 'hindi',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/persian/podcasts/p02pc9wf', // Podcast Brand
    service: 'persian',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/persian/podcasts/p02pc9wf/p09knl1v', // Podcast Episode
    service: 'persian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/portuguese/podcasts/p07r3r3t', // Podcast Brand
    service: 'portuguese',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/portuguese/podcasts/p07r3r3t/p09clrrg', // Podcast Episode
    service: 'portuguese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/russian/podcasts/p05607v8/p06x0tn3', // Podcast Episode
    service: 'russian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/russian/podcasts/p05607v8', // Podcast Brand
    service: 'russian',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/urdu/bbc_urdu_radio/programmes/p03413l5', // On Demand Brand
    service: 'urdu',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/urdu/bbc_urdu_radio/w172y03qq2blt8p', // On Demand Episode
    service: 'urdu',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/simp/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/simp/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/simp/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/simp/podcasts/p02pc9xp', // Podcast Brand
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/programmes/p0340tsy', // On Demand Brand
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/trad/bbc_cantonese_radio/w172xwswq9t42v6', // On Demand Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/trad/podcasts/p02pc9xp/p09kpm0x', // Podcast Episode
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/zhongwen/trad/podcasts/p02pc9xp', // Podcast Brand
    service: 'zhongwen',
    runforEnv: ['test', 'live'],
    tests,
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
    tests: [assertPageView],
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

const atiAnalyticsLiteTestSuites = atiAnalyticsTestSuites.map(testSuite => {
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
