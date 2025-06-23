import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { assertPageView } from '../../assertions';
import {
  assertBillboardComponentClick,
  assertBillboardComponentView,
} from '../../assertions/billboard';
import { assertLiteSiteSummaryComponentToMainSiteClick } from '../../assertions/liteSiteSummary';
import {
  assertMessageBannerComponentClick,
  assertMessageBannerComponentView,
} from '../../assertions/messageBanner';
import {
  assertMostReadComponentClick,
  assertMostReadComponentView,
} from '../../assertions/mostRead';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../../assertions/navigation';
import {
  assertRadioScheduleComponentClick,
  assertRadioScheduleComponentView,
} from '../../assertions/radioSchedule';
import { getPathWithSuffix, setUserIDCookie } from '../../helpers';

const canonicalTestSuites = [
  {
    path: '/afrique',
    runforEnv: ['local', 'test'],
    service: 'afrique',
    pageIdentifier: 'afrique.page',
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
    path: '/kyrgyz',
    runforEnv: ['local', 'test', 'live'],
    service: 'kyrgyz',
    pageIdentifier: 'kyrgyz.page',
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
    path: '/persian/afghanistan',
    runforEnv: ['local', 'test', 'live'],
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
      assertMessageBannerComponentView,
      assertMessageBannerComponentClick,
    ],
  },
  {
    path: '/polska',
    runforEnv: ['local'],
    service: 'polska',
    pageIdentifier: 'polska.page',
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

const ampTestSuites = canonicalTestSuites.map(testSuite => {
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
      tests: [...liteSiteTests],
    };
  });

runTestsForPage({
  testSuites: [...canonicalTestSuites, ...ampTestSuites, ...liteTestSuites],
  beforeAll: [setUserIDCookie],
});
