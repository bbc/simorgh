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
import { assertFeaturesAnalysisComponentClick } from './assertions/featuresAnalysis';
import {
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
} from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/navigation';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions/liteSiteSummary';
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
    tests: [
      assertPageView,
      assertScrollableNavigationComponentView,
      assertScrollableNavigationComponentClick,
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

const ampTestSuites = canonicalTestSuites.filter(supportsAmp).map(testSuite => {
  return {
    ...testSuite,
    path: getPathWithSuffix({ path: testSuite.path, suffix: '.amp' }),
    applicationType: 'amp',
    tests: [assertPageView],
  };
});

const liteTestSuites = canonicalTestSuites
  .filter(({ path }) => path !== '/ws/languages')
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
