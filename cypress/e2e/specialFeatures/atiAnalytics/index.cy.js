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
import { assertLiteSiteSummaryComponentToMainSiteClick } from './assertions/liteSiteSummary';
import {
  assertArticleLiteSiteLinkComponentClick,
  assertArticleLiteSiteLinkComponentView,
} from './assertions/articleLiteSiteLink';
import {
  assertMessageBannerComponentClick,
  assertMessageBannerComponentView,
} from './assertions/messageBanner';
import { assertPortraitVideoCarouselComponentView } from './assertions/portraitVideoCarousel';
import { assertPortraitVideoModalComponentView } from './assertions/portraitVideoModal';
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
  assertSocialEmbedComponentClick,
  assertSocialEmbedComponentView,
} from './assertions/socialEmbed';
import {
  assertTopStoriesComponentClick,
  assertTopStoriesComponentView,
} from './assertions/topStories';
import { setUserIDCookie } from './helpers';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';

const canonicalTestSuites = [
  {
    path: '/afrique',
    runforEnv: ['local', 'test'],
    service: 'afrique',
    pageIdentifier: 'afrique.page',
    siteId: 3,
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
    path: '/afrique/bbc_afrique_radio/programmes/p030s6dq',
    runforEnv: ['local', 'test', 'live'],
    service: 'afrique',
    pageIdentifier: 'afrique.bbc_afrique_radio.programmes.p030s6dq.page',
    siteId: 3,
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
    siteId: 3,
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
    siteId: 3,
    applicationType: 'responsive',
    contentType: 'player-episode',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/dari',
    runforEnv: ['local'],
    service: 'dari',
    pageIdentifier: 'dari.page',
    siteId: 142,
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
    ],
  },
  {
    path: '/dari',
    runforEnv: ['test'],
    service: 'dari',
    pageIdentifier: 'dari.page',
    siteId: 142,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
      assertDropdownNavigationComponentView,
      assertDropdownNavigationComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/gahuza/articles/c5y51yxeg53o',
    runforEnv: ['local'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.articles.c5y51yxeg53o.page',
    siteId: 40,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertArticleLiteSiteLinkComponentView,
      assertArticleLiteSiteLinkComponentClick,
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
    ],
  },
  {
    path: '/gahuza/popular/read',
    runforEnv: ['local', 'test', 'live'],
    service: 'gahuza',
    pageIdentifier: 'gahuza.popular.read.page',
    siteId: 40,
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
    siteId: 40,
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
    siteId: 40,
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
    path: '/hausa/bbc_hausa_radio/liveradio',
    runforEnv: ['local', 'live'],
    service: 'hausa',
    pageIdentifier: 'hausa.bbc_hausa_radio.liveradio.page',
    siteId: 51,
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
    siteId: 51,
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
    path: '/hindi/articles/c9w59wnx27ro',
    runforEnv: ['local', 'live'],
    service: 'hindi',
    pageIdentifier: 'hindi.articles.c9w59wnx27ro.page',
    siteId: 52,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertFeaturesAnalysisComponentView,
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
    path: '/kyrgyz',
    runforEnv: ['local', 'live'],
    service: 'kyrgyz',
    pageIdentifier: 'kyrgyz.page',
    siteId: 58,
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
    path: '/magyarul',
    runforEnv: ['local', 'test'],
    service: 'magyarul',
    pageIdentifier: 'magyarul.page',
    siteId: 30,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/marathi/topics/c1wmk63rjkvt',
    runforEnv: ['local', 'live'],
    service: 'marathi',
    pageIdentifier: 'marathi.topics.c1wmk63rjkvt.page',
    siteId: 59,
    applicationType: 'responsive',
    contentType: 'index-category',
    useReverb: true,
    componentTrackingContentType: 'topic-page',
    tests: [assertPageView],
  },
  {
    path: '/pashto',
    runforEnv: ['local', 'live'],
    service: 'pashto',
    pageIdentifier: 'pashto.page',
    siteId: 68,
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
    path: '/persian/afghanistan',
    runforEnv: ['local', 'live'],
    service: 'persian',
    pageIdentifier: 'persian.topics.crezq2dg9zwt.page',
    siteId: 69,
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
      assertMessageBannerComponentView,
      assertMessageBannerComponentClick,
    ],
  },
  {
    path: '/pidgin/articles/ce9wk6glg4lo',
    runforEnv: ['local', 'live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.articles.ce9wk6glg4lo.page',
    siteId: 70,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [
      assertPageView,
      assertTopStoriesComponentView,
      assertTopStoriesComponentClick,
      assertFeaturesAnalysisComponentView,
      assertSocialEmbedComponentView,
      assertSocialEmbedComponentClick,
      assertRelatedTopicsComponentView,
      assertRelatedTopicsComponentClick,
      assertRelatedContentComponentView,
      assertRelatedContentComponentClick,
      assertMostReadComponentView,
      assertMostReadComponentClick,
    ],
  },
  {
    path: '/pidgin/articles/cyv3zm4y428o',
    runforEnv: ['live'],
    service: 'pidgin',
    pageIdentifier: 'pidgin.articles.cyv3zm4y428o.page',
    siteId: 70,
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
    siteId: 70,
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
    path: '/polska',
    runforEnv: ['local'],
    service: 'polska',
    pageIdentifier: 'polska.page',
    siteId: 135,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertMessageBannerComponentView,
      assertMessageBannerComponentClick,
    ],
  },
  {
    path: '/polska/articles/c639526lxlro',
    runforEnv: ['local'],
    service: 'polska',
    pageIdentifier: 'polska.articles.c639526lxlro.page',
    siteId: 135,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [assertPageView],
  },
  {
    path: '/portuguese',
    runforEnv: ['local'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.page',
    siteId: 33,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [
      assertPageView,
      assertPortraitVideoCarouselComponentView,
      assertPortraitVideoModalComponentView,
    ],
  },
  {
    path: '/portuguese/podcasts/p07r3r3t',
    runforEnv: ['local', 'test', 'live'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.bbc_brasil.podcasts.programmes.p07r3r3t.page',
    siteId: 33,
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
    siteId: 81,
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
    path: '/ukrainian/podcasts/p09jsy3h',
    runforEnv: ['test', 'live'],
    service: 'ukrainian',
    pageIdentifier:
      'ukrainian.bbc_ukrainian_audio.podcasts.programmes.p09jsy3h.page',
    siteId: 94,
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
    siteId: 96,
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

const ampTestSuites = canonicalTestSuites
  .filter(supportsAmp)
  .map(testSuite => {
    return {
      ...testSuite,
      path: getPathWithSuffix({ path: testSuite.path, suffix: '.amp' }),
      useReverb: true,
      applicationType: 'amp',
      tests: [assertPageView],
    };
  })
  .concat([
    {
      path: 'news/articles/c0g992jmmkko.amp',
      runforEnv: ['local', 'test'],
      service: 'news',
      pageIdentifier: 'news.articles.c0g992jmmkko.page',
      siteId: 64,
      applicationType: 'amp',
      contentType: 'article',
      useReverb: true,
      tests: [assertPageView],
    },
    {
      path: '/news/articles/c9djwv3q6w9o.amp',
      runforEnv: ['live'],
      service: 'news',
      pageIdentifier: 'news.articles.c9djwv3q6w9o.page',
      siteId: 64,
      applicationType: 'amp',
      contentType: 'article',
      useReverb: true,
      tests: [assertPageView],
    },
  ]);

const supportsLite = ({ path }) => !path.startsWith('/persian/afghanistan');

const liteTestSuites = canonicalTestSuites
  .filter(supportsLite)
  .map(testSuite => {
    const excludedLiteTests = [
      assertPodcastPromoComponentView, // Podcast promo removed from lite article pages
      assertPodcastPromoComponentClick, // Podcast promo removed from lite article pages
      assertDropdownNavigationComponentView, // Dropdown navigation removed from all pages, as it requires JS
      assertDropdownNavigationComponentClick, // Dropdown navigation removed from all pages, as it requires JS
      assertSocialEmbedComponentView, // Social embeds removed from lite article pages
      assertSocialEmbedComponentClick, // Social embeds removed from lite article pages
      assertArticleLiteSiteLinkComponentView, // Lite Site Link only displayed on canonical article pages
      assertArticleLiteSiteLinkComponentClick, // Lite Site Link only displayed on canonical article pages
      assertFeaturesAnalysisComponentClick, // Features & Analysis component click event test not working on lite pages
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
      useReverb: false,
      siteId: testSuite.service === 'magyarul' ? 134 : testSuite.siteId,
      tests: [...liteSiteTests],
    };
  });
runTestsForPage({
  testSuites: [...canonicalTestSuites, ...ampTestSuites, ...liteTestSuites],
  beforeAll: [setUserIDCookie],
});
