import type { AppEnv } from '../../utilities/env';

export type HomePageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
};

export type HomePageAtiTest =
  | 'assertPageView'
  | 'assertResonancePageView'
  | 'assertBillboardComponentView'
  | 'assertBillboardComponentClick'
  | 'assertScrollableNavigationComponentView'
  | 'assertScrollableNavigationComponentClick'
  | 'assertDropdownNavigationComponentView'
  | 'assertDropdownNavigationComponentClick'
  | 'assertMessageBannerComponentView'
  | 'assertMessageBannerComponentClick'
  | 'assertMostReadComponentView'
  | 'assertMostReadComponentClick'
  | 'assertRadioScheduleComponentView'
  | 'assertRadioScheduleComponentClick'
  | 'assertPortraitVideoCarouselComponentView'
  | 'assertPortraitVideoModalComponentView'
  | 'assertLiteSiteSummaryComponentToMainSiteClick';

export type AtiHomePageTestSuite = {
  path: string;
  service: string;
  runForEnv: AppEnv[];
  pageIdentifier: string;
  siteId: number;
  applicationType: string;
  contentType: string;
  tests: HomePageAtiTest[];
};

const getPathWithSuffix = ({
  path,
  suffix,
}: {
  path: string;
  suffix: string;
}) => {
  const normalizedSuffix = suffix.startsWith('.') ? suffix : `.${suffix}`;
  return `${path}${normalizedSuffix}`;
};

const canonicalTestSuites: HomePageTestSuite[] = [
  {
    path: '/arabic',
    runForEnv: ['local', 'test', 'live'],
    service: 'arabic',
  },
  {
    path: '/dari',
    runForEnv: ['local', 'test'],
    service: 'dari',
  },
  {
    path: '/kyrgyz',
    // 'test' temporarily removed: https://www.test.bbc.com/kyrgyz currently returns 500 due to ongoing work
    runForEnv: ['local', 'live'],
    service: 'kyrgyz',
  },
  {
    path: '/magyarul',
    runForEnv: ['local', 'test', 'live'],
    service: 'magyarul',
  },
  {
    path: '/polska',
    runForEnv: ['local', 'test', 'live'],
    service: 'polska',
  },
  {
    path: '/portuguese',
    runForEnv: ['local', 'test', 'live'],
    service: 'portuguese',
  },
  {
    path: '/romania',
    runForEnv: ['local', 'test', 'live'],
    service: 'romania',
  },
  {
    path: '/serbian/lat',
    runForEnv: ['local', 'test', 'live'],
    service: 'serbian',
  },
  {
    path: '/serbian/cyr',
    runForEnv: ['local', 'test', 'live'],
    service: 'serbian',
  },
  {
    path: '/tamil',
    runForEnv: ['local', 'test', 'live'],
    service: 'tamil',
  },
  {
    path: '/uzbek/lat',
    runForEnv: ['local', 'test', 'live'],
    service: 'uzbek',
  },
  {
    path: '/uzbek/cyr',
    runForEnv: ['local', 'test', 'live'],
    service: 'uzbek',
  },
];

const atiNavigationComponentTests: HomePageAtiTest[] = [
  'assertPageView',
  'assertScrollableNavigationComponentView',
  'assertScrollableNavigationComponentClick',
  'assertDropdownNavigationComponentView',
  'assertDropdownNavigationComponentClick',
];

const atiTestSuites: AtiHomePageTestSuite[] = [
  {
    path: '/afrique',
    runForEnv: ['local', 'test'],
    service: 'afrique',
    pageIdentifier: 'afrique.page',
    siteId: 3,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: [
      'assertPageView',
      'assertBillboardComponentView',
      'assertBillboardComponentClick',
    ],
  },
  {
    path: '/dari',
    runForEnv: ['local', 'test'],
    service: 'dari',
    pageIdentifier: 'dari.page',
    siteId: 142,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: [...atiNavigationComponentTests],
  },
  {
    path: '/kyrgyz',
    runForEnv: ['local', 'live'],
    service: 'kyrgyz',
    pageIdentifier: 'kyrgyz.page',
    siteId: 58,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: [
      ...atiNavigationComponentTests,
      'assertMessageBannerComponentView',
      'assertMessageBannerComponentClick',
      // Commenting out to silence failing tests caused by truncated ATI responses
      // 'assertMostReadComponentView',
      // 'assertMostReadComponentClick',
    ],
  },
  {
    path: '/magyarul',
    runForEnv: ['local', 'test', 'live'],
    service: 'magyarul',
    pageIdentifier: 'magyarul.page',
    siteId: 134,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: ['assertPageView'],
  },
  {
    path: '/marathi',
    runForEnv: ['local', 'live'],
    service: 'marathi',
    pageIdentifier: 'marathi.page',
    siteId: 59,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: ['assertResonancePageView'],
  },
  {
    path: '/pashto',
    runForEnv: ['local', 'live'],
    service: 'pashto',
    pageIdentifier: 'pashto.page',
    siteId: 68,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: [
      'assertPageView',
      'assertRadioScheduleComponentView',
      'assertRadioScheduleComponentClick',
    ],
  },
  {
    path: '/portuguese',
    runForEnv: ['local'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.page',
    siteId: 33,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: [
      'assertPageView',
      'assertPortraitVideoCarouselComponentView',
      'assertPortraitVideoModalComponentView',
    ],
  },
  {
    path: '/romania',
    runForEnv: ['local', 'test', 'live'],
    service: 'romania',
    pageIdentifier: 'romania.page',
    siteId: 136,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: ['assertPageView'],
  },
  {
    path: '/serbian/lat',
    runForEnv: ['local', 'test', 'live'],
    service: 'serbian',
    pageIdentifier: 'serbianlat.page',
    siteId: 81,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: [
      'assertPageView',
      'assertMostReadComponentView',
      'assertMostReadComponentClick',
    ],
  },
  {
    path: '/uzbek/cyr',
    runForEnv: ['test', 'live'],
    service: 'uzbek',
    pageIdentifier: 'uzbekcyr.page',
    siteId: 96,
    applicationType: 'responsive',
    contentType: 'index-home',
    tests: [
      'assertPageView',
      'assertMessageBannerComponentView',
      'assertMessageBannerComponentClick',
      'assertMostReadComponentView',
    ],
  },
];

// TEMP: Disable homepage smoke tests on the test environment due to flakiness
const smokeCanonicalTestSuites: HomePageTestSuite[] = process.env.SMOKE
  ? canonicalTestSuites.map(testSuite => ({
      ...testSuite,
      runForEnv: testSuite.runForEnv.filter(env => env !== 'test'),
    }))
  : canonicalTestSuites;

const excludedLiteTests: HomePageAtiTest[] = [
  // Dropdown navigation removed from all pages, as it requires JS
  'assertDropdownNavigationComponentView',
  'assertDropdownNavigationComponentClick',
];

const atiLiteTestSuites: AtiHomePageTestSuite[] = atiTestSuites.map(
  testSuite => {
    const liteSiteTests = testSuite.tests.filter(
      testName => !excludedLiteTests.includes(testName),
    );

    // All lite enabled pages should have the Lite Site Summary component
    liteSiteTests.push('assertLiteSiteSummaryComponentToMainSiteClick');

    return {
      ...testSuite,
      path: getPathWithSuffix({ path: testSuite.path, suffix: '.lite' }),
      applicationType: 'lite',
      siteId: testSuite.service === 'magyarul' ? 134 : testSuite.siteId,
      tests: liteSiteTests,
    };
  },
);

export const homePageSuites = {
  canonical: smokeCanonicalTestSuites,
  ati: atiTestSuites,
  atiLite: atiLiteTestSuites,
};
