import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import e2eTests from './tests';
import testsForAllPages from '../testsForAllPages';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';
import { setUserIDCookie } from '../../specialFeatures/atiAnalytics/helpers';
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';
import {
  assertPodcastLinksComponentClick,
  assertPodcastLinksComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/podcastLinks';
import {
  assertRecentAudioEpisodesComponentClick,
  assertRecentAudioEpisodesComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/recentAudioEpisodes';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../specialFeatures/atiAnalytics/assertions/liteSiteSummary';
import {
  assertPodcastPromoComponentClick,
  assertPodcastPromoComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/podcastPromo';
import {
  assertRadioScheduleComponentClick,
  assertRadioScheduleComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/radioSchedule';

const pageType = 'onDemandAudio';

const tests = [e2eTests, testsForAllPages, testsForAllCanonicalPages];
const testSuites = [
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/programmes/w13xttnw', // On Demand Brand
    service: 'afaanoromoo',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/w3ct1wd4', // On Demand Episode
    service: 'afaanoromoo',
    runforEnv: ['live'],
    tests,
  },
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
    path: '/amharic/bbc_amharic_radio/programmes/w13xttnt', // On Demand Brand,
    service: 'amharic',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/amharic/bbc_amharic_radio/w3ct1lqy', // On Demand Episode
    service: 'amharic',
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
    path: '/bengali/bbc_bangla_radio/programmes/p030vjwg', // On Demand Brand
    service: 'bengali',
    runforEnv: ['live'],
    tests,
  },
  {
    path: '/bengali/bbc_bangla_radio/w172xwdq2b07ywv', // On Demand Episode
    service: 'bengali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_radio/programmes/p0340rnm', // On Demand Brand
    service: 'burmese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/bbc_burmese_radio/w3ct1m6n', // On Demand Episode
    service: 'burmese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/podcasts/p02pc9lh', // Podcast brand
    service: 'burmese',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/burmese/podcasts/p02pc9lh/p09kzply', // Podcast Episode
    service: 'burmese',
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
    service: 'persian',
    runforEnv: ['test'],
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/programmes/p0340x2m', // On Demand Brand
    service: 'gahuza',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/gahuza/bbc_gahuza_radio/w3ct1v5v', // On Demand Episode
    service: 'gahuza',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb', // Podcast Brand
    service: 'gahuza',
    runforEnv: ['local', 'test', 'live'],
    tests,
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p09km4t4', // Podcast Episode
    service: 'gahuza',
    runforEnv: ['test', 'live'],
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
    path: '/indonesia/bbc_indonesian_radio/programmes/w13xtt0s', // On Demand Brand
    service: 'indonesia',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/indonesia/bbc_indonesian_radio/w172xybnvm6718v', // On Demand Episode
    service: 'indonesia',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/indonesia/podcasts/p02pc9v6', // Podcast Brand
    service: 'indonesia',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/indonesia/podcasts/p02pc9v6/p09l1mhb', // Podcast Episode
    service: 'indonesia',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/programmes/w13xttll', // On Demand Brand
    service: 'korean',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/korean/bbc_korean_radio/w3ct1vk5', // On Demand Episode
    service: 'korean',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_radio/programmes/p0340xth', // On Demand Brand
    service: 'kyrgyz',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/kyrgyz/bbc_kyrgyz_radio/w3ct1vw9', // On Demand Episode
    service: 'kyrgyz',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/marathi/podcasts/p09431p4', // Podcast Brand
    service: 'marathi',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/marathi/podcasts/p09431p4/p0f1vp21', // Podcast Episode
    service: 'marathi',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/programmes/p0340xzt', // On Demand Brand
    service: 'nepali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/nepali/bbc_nepali_radio/w172xzcfvptk838', // On Demand Episode
    service: 'nepali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/nepali/podcasts/p02pc9w3/p09j0dm5', // Podcast Episode
    service: 'nepali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/nepali/podcasts/p02pc9w3', // Podcast Brand
    service: 'nepali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/programmes/p0340yr4', // On Demand Brand
    service: 'pashto',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/pashto/bbc_pashto_radio/w3ct26m6', // On Demand Episode
    service: 'pashto',
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
    path: '/somali/bbc_somali_radio/programmes/p034117j', // On Demand Brand
    service: 'somali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/somali/bbc_somali_radio/w172xzzpp131z23', // On Demand Episode
    service: 'somali',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/programmes/p03411mj', // On Demand Brand
    service: 'swahili',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/swahili/bbc_swahili_radio/w3ct1y1s', // On Demand Episode
    service: 'swahili',
    runforEnv: ['live', 'test'],
    tests,
  },
  {
    path: '/tamil/bbc_tamil_radio/programmes/p03412jh', // On Demand Brand
    service: 'tamil',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/tamil/bbc_tamil_radio/w172y03bbzbnwc0', // On Demand Episode
    service: 'tamil',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/programmes/w13xttny', // On Demand Brand
    service: 'tigrinya',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/tigrinya/bbc_tigrinya_radio/w3ct1xhz', // On Demand Episode
    service: 'tigrinya',
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
    path: '/uzbek/bbc_uzbek_radio/programmes/p03414fb', // On Demand Brand
    service: 'uzbek',
    runforEnv: ['test', 'live'],
    tests,
  },
  {
    path: '/uzbek/bbc_uzbek_radio/w172y044spy82mn', // On Demand Episode
    service: 'uzbek',
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
];

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
];

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
  pageType,
  testSuites,
});

runTestsForPage({
  pageType,
  testSuites: atiAnalyticsTestSuites,
  beforeAll: [setUserIDCookie],
  testIsolation: true,
});

runTestsForPage({
  pageType,
  testSuites: atiAnalyticsLiteTestSuites,
  beforeAll: [setUserIDCookie],
});
