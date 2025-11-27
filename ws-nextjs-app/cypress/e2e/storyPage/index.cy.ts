import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { assertPageView } from '../../../../cypress/e2e/specialFeatures/atiAnalytics/assertions';
import runTestsForPage, {
  TestDataType,
} from '../../support/helpers/runTestsForPage';
import testsForAllPages from '../testsForAllPages';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';
import testsForAllAMPPages from '../testsForAllAMPPages';
import canonicalAndAmpArticleTests from './tests';
import ampArticleTests from './testsForAMPOnly';
import canonicalArticleTests from './testsForCanonicalOnly';
import { setUserIDCookie } from '../specialFeatures/atiAnalytics/helpers';
import {
  assertDropdownNavigationComponentClick,
  assertDropdownNavigationComponentView,
  assertScrollableNavigationComponentClick,
  assertScrollableNavigationComponentView,
} from '../specialFeatures/atiAnalytics/assertions/navigation';
// import liteTests from '../articlePage/testsForLiteOnly';

const canonicalTests = [
  testsForAllPages,
  testsForAllCanonicalPages,
  canonicalAndAmpArticleTests,
  canonicalArticleTests,
];

const ampTests = [
  testsForAllPages,
  testsForAllAMPPages,
  canonicalAndAmpArticleTests,
  ampArticleTests,
];

const canonicalSmokeTestSuites = [
  {
    path: '/hausa/labarai-54292969',
    service: 'hausa',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/hausa/labarai-23190660',
    service: 'hausa',
    runforEnv: ['local', 'test'],
    tests: canonicalTests,
  },
  {
    path: '/mundo/noticias-54274735',
    service: 'mundo',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/mundo/noticias-66171332',
    service: 'mundo',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  // TODO: Re-enable once the external media/analytics issue is resolved - https://bbc.atlassian.net/browse/WS-1745
  // {
  //   path: '/mundo/23263889',
  //   service: 'mundo',
  //   runforEnv: ['local', 'test'],
  //   tests: canonicalTests,
  // },
  {
    path: '/mundo/noticias-internacional-51266689',
    service: 'mundo',
    runforEnv: ['local'],
    tests: canonicalTests,
  },
  {
    path: '/russian/features-54391793',
    service: 'russian',
    runforEnv: ['live', 'local'],
    tests: canonicalTests,
  },
  {
    path: '/russian/news-55041160',
    service: 'russian',
    runforEnv: ['live', 'local'],
    tests: canonicalTests,
  },
  {
    path: '/thai/international-53381389',
    service: 'thai',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/uzbek/uzbekistan-53263099',
    service: 'uzbek',
    runforEnv: ['local'],
    tests: canonicalTests,
  },
];

const canonicalNonSmokeTestSuites = [
  {
    path: '/gahuza/amakuru-52821373',
    service: 'gahuza',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/gahuza/23307435',
    service: 'gahuza',
    runforEnv: ['local', 'test'],
    tests: canonicalTests,
  },
  {
    path: '/igbo/afirika-52816709',
    service: 'igbo',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/igbo/afirika-23252735',
    service: 'igbo',
    runforEnv: ['local', 'test'],
    tests: canonicalTests,
  },
  {
    path: '/indonesia/dunia-53413801',
    service: 'indonesia',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/kyrgyz/kyrgyzstan-52891593',
    service: 'kyrgyz',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/kyrgyz/23292889',
    service: 'kyrgyz',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/pashto/world-52873295',
    service: 'pashto',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/pashto/23289748',
    service: 'pashto',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/sinhala/world-51723376',
    service: 'sinhala',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/sinhala/23225618',
    service: 'sinhala',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
  {
    path: '/yoruba/afrika-58539527',
    service: 'yoruba',
    runforEnv: ['live'],
    tests: canonicalTests,
  },
  {
    path: '/yoruba/afrika-23252769',
    service: 'yoruba',
    runforEnv: ['test'],
    tests: canonicalTests,
  },
];

const ampOnlyNonSmokeTestSuites = [
  {
    path: '/news/uk-56342465',
    service: 'news',
    runforEnv: ['live'],
  },
  {
    path: '/news/technology-56294493',
    service: 'news',
    runforEnv: ['live'],
  },
  {
    path: '/news/23393110',
    service: 'news',
    runforEnv: ['test'],
  },
  {
    path: '/newsround/56331357',
    service: 'newsround',
    runforEnv: ['live'],
  },
  {
    path: '/newsround/23212028',
    service: 'newsround',
    runforEnv: ['test'],
  },
];

const atiAnalyticsTests = [
  assertPageView,
  assertDropdownNavigationComponentView, // Dropdown navigation removed from all pages, as it requires JS
  assertDropdownNavigationComponentClick, // Dropdown navigation removed from all pages, as it requires JS
  assertScrollableNavigationComponentView,
  assertScrollableNavigationComponentClick,
];

const atiAnalyticsTestSuites = [
  {
    path: '/hausa/labarai-54292969',
    runforEnv: ['live'],
    service: 'hausa',
    pageIdentifier: 'hausa.news.story.54292969.page',
    siteId: 51,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/mundo/noticias-54274735',
    runforEnv: ['live'],
    service: 'mundo',
    pageIdentifier: 'mundo.also_in_the_news.story.54274735.page',
    siteId: 62,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/russian/news-55041160',
    runforEnv: ['live'],
    service: 'russian',
    pageIdentifier: 'russian.news.story.55041160.page',
    siteId: 75,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [...atiAnalyticsTests],
  },
  {
    path: '/thai/international-53381389',
    runforEnv: ['live'],
    service: 'thai',
    pageIdentifier: 'thai.international.story.53381389.page',
    siteId: 90,
    applicationType: 'responsive',
    contentType: 'article',
    useReverb: true,
    tests: [...atiAnalyticsTests],
  },
] as unknown as TestDataType[];

const canonicalTestSuites = Cypress.env('SMOKE')
  ? canonicalSmokeTestSuites
  : canonicalNonSmokeTestSuites;

const ampTestSuites = [
  ...canonicalTestSuites,
  ...ampOnlyNonSmokeTestSuites,
].map(testSuite => {
  return {
    ...testSuite,
    path: `${testSuite.path}.amp`,
    tests: [...ampTests],
  };
});

// SKIPPED: We are not able to set page-type headers in cy.click and cy.back
// const liteTestSuites = canonicalTestSuites
//   .filter(({ service }) => !['news', 'newsround'].includes(service))
//   .map(testSuite => {
//     return {
//       ...testSuite,
//       path: `${testSuite.path}.lite`,
//       tests: [liteTests],
//     };
//   });

runTestsForPage({
  pageType: STORY_PAGE,
  headers: {
    'page-type': 'article',
    'BBC-Adverts': 'true',
  },
  testSuites: [
    ...canonicalTestSuites,
    ...ampTestSuites,
    // ...liteTestSuites
  ],
});

runTestsForPage({
  pageType: STORY_PAGE,
  testSuites: atiAnalyticsTestSuites,
  beforeAll: [setUserIDCookie],
  testIsolation: true,
});
