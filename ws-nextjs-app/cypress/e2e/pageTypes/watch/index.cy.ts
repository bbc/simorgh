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

if (Cypress.env('APP_ENV') === 'local') {
  Cypress.config('baseUrl', 'http://localhost.bbc.com:7081');
}

const testSuites = [
  {
    path: '/hindi/watch/cw1ldl595v1yo',
    runforEnv: ['local'],
    service: 'hindi',
    tests: [testsForAllPages, testsForAllCanonicalPages],
  },
  {
    path: '/punjabi/watch/cy9dkd8l9lrdo',
    runforEnv: ['local'],
    service: 'punjabi',
    tests: [testsForAllPages, testsForAllCanonicalPages],
  },
  {
    path: '/telugu/watch/c7k9x9jzg39jo',
    runforEnv: ['local'],
    service: 'telugu',
    tests: [testsForAllPages, testsForAllCanonicalPages],
  },
  {
    path: '/urdu/watch/c463r38dp7qeo',
    runforEnv: ['local'],
    service: 'urdu',
    tests: [testsForAllPages, testsForAllCanonicalPages],
  },
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
    path: '/hindi/watch/cw1ldl595v1yo',
    runforEnv: ['local'],
    service: 'hindi',
    pageIdentifier: 'hindi.watch.cw1ldl595v1yo.page',
    siteId: 52,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/punjabi/watch/cy9dkd8l9lrdo',
    runforEnv: ['local'],
    service: 'punjabi',
    pageIdentifier: 'punjabi.watch.cy9dkd8l9lrdo.page',
    siteId: 73,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/telugu/watch/c7k9x9jzg39jo',
    runforEnv: ['local'],
    service: 'telugu',
    pageIdentifier: 'telugu.watch.c7k9x9jzg39jo.page',
    siteId: 89,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/urdu/watch/c463r38dp7qeo',
    runforEnv: ['local'],
    service: 'urdu',
    pageIdentifier: 'urdu.watch.c463r38dp7qeo.page',
    siteId: 95,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/tamil/watch/c36l16ny6klo',
    runforEnv: ['local', 'live'],
    service: 'tamil',
    pageIdentifier: 'tamil.watch.c36l16ny6klo.page',
    siteId: 87,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/gujarati/watch/cx2zevlw204o',
    runforEnv: ['local', 'live'],
    service: 'gujarati',
    // This pageIdentifier assertion covers assets published before the /watch route was launched
    pageIdentifier: 'gujarati.articles.cx2zevlw204o.page',
    siteId: 50,
    applicationType: 'responsive',
    contentType: 'article-sfv',
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
