import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import getPathWithSuffix from '../../../support/helpers/getPathWithSuffix';
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';
import {
  assertBillboardComponentView,
  assertBillboardComponentClick,
} from '../../specialFeatures/atiAnalytics/assertions/billboard';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../specialFeatures/atiAnalytics/assertions/liteSiteSummary';
import {
  assertMessageBannerComponentClick,
  assertMessageBannerComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/messageBanner';
import {
  assertMostReadComponentClick,
  assertMostReadComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/mostRead';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/navigation';
import assertPortraitVideoCarouselComponentView from '../../specialFeatures/atiAnalytics/assertions/portraitVideoCarousel';
import assertPortraitVideoModalComponentView from '../../specialFeatures/atiAnalytics/assertions/portraitVideoModal';
import {
  assertRadioScheduleComponentClick,
  assertRadioScheduleComponentView,
} from '../../specialFeatures/atiAnalytics/assertions/radioSchedule';
import { setUserIDCookie } from '../../specialFeatures/atiAnalytics/helpers';

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

const liteTestSuites = canonicalTestSuites
  .filter(({ path }) => !path.startsWith('/persian/afghanistan'))
  .map(testSuite => {
    const excludedLiteTests = [
      assertDropdownNavigationComponentView, // Dropdown navigation removed from all pages, as it requires JS
      assertDropdownNavigationComponentClick, // Dropdown navigation removed from all pages, as it requires JS
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
  testSuites: [...canonicalTestSuites, ...liteTestSuites],
  beforeAll: [setUserIDCookie],
});
