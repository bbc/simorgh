/* eslint-disable import/no-relative-packages */
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { assertPageView } from '../../specialFeatures/atiAnalytics/assertions';
import runTestsForPage, {
  TestDataType,
} from '../../../support/helpers/runTestsForPage';
import e2eTests from './tests';
import testsForAllPages from '../../testsForAllPages';
import testsForAllCanonicalPages from '../../testsForAllCanonicalPages';

const canonicalTests = [e2eTests, testsForAllPages, testsForAllCanonicalPages];

const testSuites = [
  {
    path: '/tamil/watch/c36l16ny6klo',
    runforEnv: ['local', 'live'],
    service: 'tamil',
    tests: [...canonicalTests],
  },
  {
    path: '/gujarati/watch/cx2zevlw204o',
    runforEnv: ['local', 'live'],
    service: 'gujarati',
    tests: [...canonicalTests],
  },
];

const atiAnalyticsTestSuites = [
  {
    path: '/tamil/listen/cw3xlkprxv82o',
    runforEnv: ['local'],
    service: 'tamil',
    pageIdentifier: 'tamil.listen.cw3xlkprxv82o.page',
    siteId: 87,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/tamil/listen/cwyzlmrmy87o',
    runforEnv: ['live'],
    service: 'tamil',
    // This pageIdentifier assertion covers assets published before the /listen route was launched
    pageIdentifier: 'tamil.articles.cwyzlmrmy87o.page',
    siteId: 87,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [assertPageView],
  },
] as unknown as TestDataType[];

const canonicalTestSuites = testSuites;

runTestsForPage({
  pageType: ARTICLE_PAGE,
  beforeEachFns: [],
  testSuites: [...atiAnalyticsTestSuites] as unknown as TestDataType[],
});

runTestsForPage({
  pageType: ARTICLE_PAGE,
  beforeEachFns: [],
  testSuites: [...canonicalTestSuites],
  deleteServiceWorker: true,
});
