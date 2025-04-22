import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import crossPlatformTests from './tests';
import { TOPIC_PAGE } from '../../../../src/app/routes/utils/pageTypes';

const topicPagesToTest = [
  {
    path: '/arabic/topics/cwr9j7nv58nt',
    service: 'arabic',
    runforEnv: ['local', 'test', 'live'],
    pageType: TOPIC_PAGE,
    tests: [crossPlatformTests],
  },
  {
    path: '/pidgin/topics/c95y35941vrt',
    service: 'pidgin',
    runforEnv: ['local', 'test', 'live'],
    pageType: TOPIC_PAGE,
    tests: [crossPlatformTests],
  },
  {
    path: '/serbian/topics/c1gd303q6y6t/lat',
    service: 'serbian',
    runforEnv: ['local', 'test', 'live'],
    pageType: TOPIC_PAGE,
    tests: [crossPlatformTests],
    variant: 'lat',
  },
  {
    path: '/ukrainian/topics/c61k92vrqz6t', // ukrainian in Russian
    service: 'ukrainian',
    runforEnv: ['test', 'live'],
    pageType: TOPIC_PAGE,
    tests: [crossPlatformTests],
    smoke: false,
  },
  {
    path: '/uzbek/topics/c8y949r98pgt/cyr',
    service: 'uzbek',
    runforEnv: ['local', 'test', 'live'],
    pageType: TOPIC_PAGE,
    tests: [crossPlatformTests],
    variant: 'cyr',
  },
  {
    path: '/uzbek/topics/c8y949r98pgt/lat',
    service: 'uzbek',
    runforEnv: ['local', 'test', 'live'],
    pageType: TOPIC_PAGE,
    tests: [crossPlatformTests],
    variant: 'lat',
  },
];

// ToDo(discuss): I put this helper here - but it seems to me that both the helper and the array of pages should be in helper.js
// but keeping it like this for consistency
export const topicPagesForService = service =>
  topicPagesToTest.filter(
    topicPage =>
      topicPage.service === service && topicPage.pageType === TOPIC_PAGE,
  );
// ToDo: clarify if we need to check which ones should run on SMOKE=True
// why only Ukrainian is SMOKE=FALSE currently?
const testSuites =
  Cypress.env('SMOKE') === 'true'
    ? topicPagesToTest.filter(t => t.smoke !== false)
    : topicPagesToTest;

runTestsForPage({
  pageType: TOPIC_PAGE,
  testSuites: [...testSuites],
});
