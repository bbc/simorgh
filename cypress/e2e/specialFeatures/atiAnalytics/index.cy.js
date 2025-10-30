import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { assertPageView } from './assertions';
import { assertFeaturesAnalysisComponentClick } from './assertions/featuresAnalysis';
import { assertLiteSiteSummaryComponentToMainSiteClick } from './assertions/liteSiteSummary';
import {
  assertArticleLiteSiteLinkComponentClick,
  assertArticleLiteSiteLinkComponentView,
} from './assertions/articleLiteSiteLink';
import {
  assertMessageBannerComponentClick,
  assertMessageBannerComponentView,
} from './assertions/messageBanner';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from './assertions/navigation';
import {
  assertSocialEmbedComponentClick,
  assertSocialEmbedComponentView,
} from './assertions/socialEmbed';

import { setUserIDCookie } from './helpers';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';

const canonicalTestSuites = [
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
];

const supportsAmp = ({ contentType }) =>
  !['player-live', 'player-episode', 'index-category', 'static'].includes(
    contentType,
  );

const ampTestSuites = canonicalTestSuites.filter(supportsAmp).map(testSuite => {
  return {
    ...testSuite,
    path: getPathWithSuffix({ path: testSuite.path, suffix: '.amp' }),
    useReverb: true,
    applicationType: 'amp',
    tests: [assertPageView],
  };
});

const supportsLite = ({ path }) => !path.startsWith('/persian/afghanistan');

const liteTestSuites = canonicalTestSuites
  .filter(supportsLite)
  .map(testSuite => {
    const excludedLiteTests = [
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
