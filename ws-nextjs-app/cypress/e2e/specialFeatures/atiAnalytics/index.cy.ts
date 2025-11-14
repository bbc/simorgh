/* eslint-disable import/no-relative-packages */
import { PageTypes } from '#app/models/types/global';
import { LIVE_PAGE } from '../../../../../src/app/routes/utils/pageTypes';
import { assertPageView } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import { setUserIDCookie } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/helpers';
// TODO: Resolve error which is preventing e2e tests to run
// import {
//   assertRecommendationsComponentClick,
//   assertRecommendationsComponentView,
// } from './assertions/recommendations';
import {
  assertRelatedContentComponentClick,
  assertRelatedContentComponentView,
} from './assertions/relatedContent';
import {
  assertFeaturesAnalysisComponentView,
  assertFeaturesAnalysisComponentClick,
} from './assertions/featuresAnalysis';
import {
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
} from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/navigation';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/liteSiteSummary';
import {
  assertLatestMediaComponentClick,
  assertLatestMediaComponentView,
} from './assertions/latestMedia';
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
import {
  assertArticleLiteSiteLinkComponentClick,
  assertArticleLiteSiteLinkComponentView,
} from './assertions/articleLiteSiteLink';

import runTestsForPage, {
  TestDataType,
} from '../../../support/helpers/runTestsForPage';
import {
  assertPodcastPromoComponentClick,
  assertPodcastPromoComponentView,
} from './assertions/podcastPromo';
import {
  assertMostReadComponentClick,
  assertMostReadComponentView,
} from './assertions/mostRead';
import {
  assertSocialEmbedComponentClick,
  assertSocialEmbedComponentView,
} from './assertions/socialEmbed';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
} from './assertions/navigation';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';

const canonicalTestSuites = [
  {
    path: '/burmese/live/ckg19998pldt',
    runforEnv: ['local', 'live'],
    service: 'burmese',
    pageIdentifier: 'live_coverage.ckg19998pldt.page',
    siteId: 35,
    applicationType: 'responsive',
    contentType: 'live-coverage',
    componentTrackingContentType: LIVE_PAGE,
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
    ],
  },
  {
    path: '/mundo/live/c7dkx155e626t',
    runforEnv: ['local'],
    service: 'mundo',
    pageIdentifier: 'live_coverage.c7dkx155e626t.page',
    siteId: 62,
    applicationType: 'responsive',
    contentType: 'live-coverage',
    componentTrackingContentType: LIVE_PAGE,
    useReverb: true,
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
    ],
  },
  {
    path: '/ws/languages',
    runforEnv: ['local', 'test', 'live'],
    service: 'ws',
    pageIdentifier: 'ws.languages.page',
    siteId: 30,
    applicationType: 'responsive',
    contentType: 'index-home',
    useReverb: true,
    tests: [assertPageView],
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
  // TODO: Resolve error which is preventing e2e tests to run - https://bbc.atlassian.net/browse/WS-1745
  // {
  //   path: '/hindi/articles/c9w59wnx27ro',
  //   runforEnv: ['local', 'live'],
  //   service: 'hindi',
  //   pageIdentifier: 'hindi.articles.c9w59wnx27ro.page',
  //   siteId: 52,
  //   applicationType: 'responsive',
  //   contentType: 'article',
  //   useReverb: true,
  //   tests: [
  //     assertPageView,
  //     assertTopStoriesComponentView,
  //     assertTopStoriesComponentClick,
  //     assertFeaturesAnalysisComponentView,
  //     assertRecommendationsComponentView,
  //     assertRecommendationsComponentClick,
  //     assertPodcastPromoComponentView,
  //     assertPodcastPromoComponentClick,
  //     assertScrollablePromoComponentView,
  //     assertScrollablePromoComponentClick,
  //     assertRelatedTopicsComponentView,
  //     assertRelatedTopicsComponentClick,
  //     assertMostReadComponentView,
  //     assertMostReadComponentClick,
  //   ],
  // },
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
];

const supportsAmp = ({ contentType }: { contentType: string }) =>
  ![
    'index-home',
    'player-live',
    'player-episode',
    'index-category',
    'live-coverage',
    'static',
  ].includes(contentType);

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

const supportsLite = ({ path }: { path: string }) =>
  !path.startsWith('/persian/afghanistan');

const liteTestSuites = canonicalTestSuites
  .filter(({ path }) => path !== '/ws/languages')
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

    const liteSiteTests = testSuite.tests
      .filter(test => !excludedLiteTests.includes(test))
      .filter(
        test =>
          // Exclude component click tests, as component click support is not supported on all components yet
          !test.name.toLowerCase().includes('click'),
      );

    // All lite enabled pages should have the Lite Site Summary component
    liteSiteTests.push(assertLiteSiteSummaryComponentToMainSiteClick);

    return {
      ...testSuite,
      path: getPathWithSuffix({ path: testSuite.path, suffix: '.lite' }),
      applicationType: 'lite',
      useReverb: true,
      tests: [...liteSiteTests],
    };
  });

runTestsForPage({
  testSuites: [
    ...canonicalTestSuites,
    ...ampTestSuites,
    ...liteTestSuites,
  ] as unknown as TestDataType[],
  beforeEachFns: [setUserIDCookie],
  pageType: 'all' as PageTypes,
});
