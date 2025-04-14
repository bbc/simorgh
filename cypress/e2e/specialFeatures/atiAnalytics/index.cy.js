import { liteEnabledServices } from '#app/components/LiteSiteCta/liteSiteConfig';
import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { assertPageView } from './assertions';
import {
  assertBillboardComponentClick,
  assertBillboardComponentView,
} from './assertions/billboard';
import {
  assertFeaturesAnalysisComponentClick,
  assertFeaturesAnalysisComponentView,
} from './assertions/featuresAnalysis';
import {
  assertLatestMediaComponentClick,
  assertLatestMediaComponentView,
} from './assertions/latestMedia';
import { assertLiteSiteCTAComponentClick } from './assertions/liteSiteCta';
import {
  assertCanonicalToLiteSiteCTAComponentClick,
  assertCanonicalToLiteSiteCTAComponentView,
} from './assertions/canonicalLiteSiteCta';
import {
  assertMessageBannerComponentClick,
  assertMessageBannerComponentView,
} from './assertions/messageBanner';
import {
  assertMostReadComponentClick,
  assertMostReadComponentView,
} from './assertions/mostRead';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from './assertions/navigation';
import {
  assertPodcastLinksComponentClick,
  assertPodcastLinksComponentView,
} from './assertions/podcastLinks';
import {
  assertPodcastPromoComponentClick,
  assertPodcastPromoComponentView,
} from './assertions/podcastPromo';
import {
  assertRadioScheduleComponentClick,
  assertRadioScheduleComponentView,
} from './assertions/radioSchedule';
import {
  assertRecentAudioEpisodesComponentClick,
  assertRecentAudioEpisodesComponentView,
} from './assertions/recentAudioEpisodes';
import {
  assertRecommendationsComponentClick,
  assertRecommendationsComponentView,
} from './assertions/recommendations';
import {
  assertRelatedContentComponentClick,
  assertRelatedContentComponentView,
} from './assertions/relatedContent';
import {
  assertRelatedTopicsComponentClick,
  assertRelatedTopicsComponentView,
} from './assertions/relatedTopics';
import {
  assertScrollablePromoComponentClick,
  assertScrollablePromoComponentView,
} from './assertions/scrollablePromo';
import {
  assertTopStoriesComponentClick,
  assertTopStoriesComponentView,
} from './assertions/topStories';

const canonicalTestSuites = [
  {
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq',
    runforEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_radio.programmes.p030s6dq.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
      assertRadioScheduleComponentView,
      assertRadioScheduleComponentClick,
    ],
  },
  {
    path: '/afrique/bbc_afrique_tv/tv_programmes/w13xttmz',
    runforEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_tv.tv_programmes.w13xttmz.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/afrique/bbc_afrique_tv/tv/w3ct05mp',
    runforEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_tv.tv.w3ct05mp.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/gahuza',
    runforEnv: ['local', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.page',
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertDropdownNavigationComponentView,
      assertDropdownNavigationComponentClick,
      assertMessageBannerComponentView,
      assertMessageBannerComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/gahuza/articles/c5y51yxeg53o',
    runforEnv: ['local'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.articles.c5y51yxeg53o.page',
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertFeaturesAnalysisComponentView,
      assertFeaturesAnalysisComponentClick,
      assertPodcastPromoComponentView,
      assertPodcastPromoComponentClick,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
      assertCanonicalToLiteSiteCTAComponentView,
      assertCanonicalToLiteSiteCTAComponentClick,
    ],
  },
  {
    path: '/gahuza/popular/read',
    runforEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.popular.read.page',
    applicationType: 'responsive',
    contentType: 'list-datadriven',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/gahuza/podcasts/p07yh8hb',
    runforEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.bbc_gahuza_radio.podcasts.programmes.p07yh8hb.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertPodcastLinksComponentView,
      assertPodcastLinksComponentClick,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
    ],
  },
  {
    path: '/gahuza/podcasts/p07yh8hb/p094vs2n',
    runforEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.bbc_gahuza_radio.podcasts.p094vs2n.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertPodcastLinksComponentView,
      assertPodcastLinksComponentClick,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
    ],
  },
  {
    path: '/hindi/articles/c9w59wnx27ro',
    runforEnv: ['live'],
    service: 'hindi',
    pageIdentifier: 'hindi.articles.c9w59wnx27ro.page',
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertFeaturesAnalysisComponentView,
      assertFeaturesAnalysisComponentClick,
      assertRecommendationsComponentView,
      assertRecommendationsComponentClick,
      assertPodcastPromoComponentView,
      assertPodcastPromoComponentClick,
      assertScrollablePromoComponentView,
      assertScrollablePromoComponentClick,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/hausa/bbc_hausa_radio/liveradio',
    runforEnv: ['local', 'live'],
    service: 'hausa',
    pageIdentifier: 'hausa.bbc_hausa_radio.liveradio.page',
    applicationType: 'responsive',
    contentType: 'player-live',
    useReverb: true,
    tests: [
      assertPageView,
      assertRadioScheduleComponentView,
      assertRadioScheduleComponentClick,
    ],
  },
  {
    path: '/hausa/articles/cw43vy8zdjvo',
    runforEnv: ['local', 'live'],
    service: 'hausa',
    pageIdentifier: 'hausa.articles.cw43vy8zdjvo.page',
    applicationType: 'responsive',
    contentType: 'article-sfv',
    useReverb: true,
    tests: [
      assertPageView,
      assertLatestMediaComponentView,
      assertLatestMediaComponentClick,
    ],
  },
  {
    path: '/indonesia',
    runforEnv: ['local', 'live'],
    service: 'indonesia',
    pageIdentifier: 'indonesia.page',
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertDropdownNavigationComponentView,
      assertDropdownNavigationComponentClick,
    ],
  },
  {
    path: '/kyrgyz',
    runforEnv: ['local', 'test', 'live'],
    service: 'kyrgyz',
    pageIdentifier: 'kyrgyz.page',
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertMessageBannerComponentView,
      assertMessageBannerComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/marathi/topics/c1wmk63rjkvt',
    runforEnv: ['live'],
    service: 'marathi',
    pageIdentifier: 'marathi.topics.c1wmk63rjkvt.page',
    applicationType: 'responsive',
    contentType: 'index-category',
    useReverb: true,
    componentTrackingContentType: 'topic-page',
    tests: [assertPageView],
  },
  {
    path: '/nepali',
    runforEnv: ['test'],
    service: 'nepali',
    pageIdentifier: 'nepali.page',
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertBillboardComponentView,
      assertBillboardComponentClick,
    ],
  },
  {
    path: '/pashto',
    runforEnv: ['local', 'live'],
    service: 'pashto',
    pageIdentifier: 'pashto.page',
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertRadioScheduleComponentView,
      assertRadioScheduleComponentClick,
    ],
  },
  {
    path: '/persian/topics/crezq2dg9zwt',
    runforEnv: ['local', 'test'],
    service: 'persian',
    pageIdentifier: 'persian.topics.crezq2dg9zwt.page',
    applicationType: 'responsive',
    contentType: 'index-category',
    componentTrackingContentType: 'topic-page',
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertDropdownNavigationComponentView,
      assertDropdownNavigationComponentClick,
    ],
  },
  {
    path: '/pidgin',
    runforEnv: ['local', 'live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.page',
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertDropdownNavigationComponentView,
      assertDropdownNavigationComponentClick,
      assertMessageBannerComponentView,
      assertMessageBannerComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/pidgin',
    runforEnv: ['test'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.page',
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertBillboardComponentView,
      assertBillboardComponentClick,
    ],
  },
  {
    path: '/pidgin/articles/cyv3zm4y428o',
    runforEnv: ['live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.articles.cyv3zm4y428o.page',
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertFeaturesAnalysisComponentView,
      assertFeaturesAnalysisComponentClick,
      assertScrollablePromoComponentClick,
      assertScrollablePromoComponentView,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/pidgin/articles/cw0x29n2pvqo',
    runforEnv: ['local', 'live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.articles.cw0x29n2pvqo.page',
    applicationType: 'responsive',
    contentType: 'article-sfv',
    useReverb: true,
    tests: [
      assertPageView,
      assertLatestMediaComponentClick,
      assertLatestMediaComponentView,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
    ],
  },
  {
    path: '/pidgin/popular/read',
    runforEnv: ['local', 'test', 'live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.popular.read.page',
    applicationType: 'responsive',
    contentType: 'list-datadriven',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/portuguese/podcasts/p07r3r3t',
    runforEnv: ['local', 'test', 'live'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.bbc_brasil.podcasts.programmes.p07r3r3t.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertPodcastLinksComponentView,
      assertPodcastLinksComponentClick,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
    ],
  },
  {
    path: '/serbian/lat',
    runforEnv: ['local', 'test', 'live'],
    service: 'serbian',
    pageIdentifier: 'serbianlat.page',
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/swahili',
    runforEnv: ['local'],
    service: 'swahili',
    pageIdentifier: 'swahili.page',
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertRadioScheduleComponentView,
      assertRadioScheduleComponentClick,
    ],
  },
  {
    path: '/tamil/bbc_tamil_tv/tv_programmes/w13xttmy',
    runforEnv: ['local', 'test', 'live'],
    service: 'tamil',
    pageIdentifier: 'tamil.bbc_tamil_tv.tv_programmes.w13xttmy.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/ukrainian/podcasts/p09jsy3h',
    runforEnv: ['test', 'live'],
    service: 'ukrainian',
    pageIdentifier:
      'ukrainian.bbc_ukrainian_audio.podcasts.programmes.p09jsy3h.page',
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [
      assertPageView,
      assertPodcastLinksComponentView,
      assertPodcastLinksComponentClick,
      assertRecentAudioEpisodesComponentView,
      assertRecentAudioEpisodesComponentClick,
    ],
  },
  {
    path: '/uzbek/cyr',
    runforEnv: ['test', 'live'],
    service: 'uzbek',
    pageIdentifier: 'uzbekcyr.page',
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertMessageBannerComponentView,
      assertMessageBannerComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
];

const supportsAmp = ({ contentType }) =>
  !['index-home', 'player-live', 'player-episode', 'index-category'].includes(
    contentType,
  );

const ampTestSuites = canonicalTestSuites.filter(supportsAmp).map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.amp`,
    useReverb: false,
    applicationType: 'amp',
    tests: [assertPageView],
  };
});

// Most Read pages do not currently support .lite
const supportsLite = ({ contentType, service }) =>
  liteEnabledServices.includes(service) && contentType !== 'list-datadriven';

const liteTestSuites = canonicalTestSuites
  .filter(supportsLite)
  .map(testSuite => {
    const liteSiteTests = [assertPageView];

    switch (testSuite.contentType) {
      case 'article':
        liteSiteTests.push(assertLiteSiteCTAComponentClick);
        liteSiteTests.push(assertRelatedTopicsComponentView);
        break;
      case 'index-home':
        liteSiteTests.push(assertMostReadComponentClick);
        break;
      default:
        break;
    }

    return {
      ...testSuite,
      path: `${testSuite.path}.lite`,
      applicationType: 'lite',
      useReverb: false,
      tests: [...liteSiteTests],
    };
  });

runTestsForPage({
  testSuites: [...canonicalTestSuites, ...ampTestSuites, ...liteTestSuites],
  testIsolation: true,
});
