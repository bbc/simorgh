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
    path: '/arabic/watch/c7vxryk46w0qo',
    runforEnv: ['local'],
    service: 'arabic',
    tests: [...canonicalTests],
  },
  {
    path: '/arabic/watch/c7vxryk46w0qo.app',
    runforEnv: ['local'],
    service: 'arabic',
    tests: [...canonicalTests],
  },
  {
    path: '/arabic/watch/c3x2wy0879d9o',
    runforEnv: ['live'],
    service: 'arabic',
    tests: [...canonicalTests],
  },
  {
    path: '/arabic/watch/cr78p48yy7qeo.app',
    // Re-enable on live once this .app route is available in Belfrage.
    runforEnv: [],
    service: 'arabic',
    tests: [...canonicalTests],
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
  {
    path: '/zhongwen/watch/cr93zl51k0z9o/trad',
    runforEnv: ['local', 'live'],
    service: 'zhongwen',
    tests: [...canonicalTests],
  },
  {
    path: '/zhongwen/watch/cr93zl51k0z9o/simp',
    runforEnv: ['local', 'live'],
    service: 'zhongwen',
    tests: [...canonicalTests],
  },
];

const atiAnalyticsTestSuites = [
  {
    path: '/arabic/watch/c7vxryk46w0qo',
    runforEnv: ['local'],
    service: 'arabic',
    pageIdentifier: 'arabic.watch.c7vxryk46w0qo.page',
    siteId: 5,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/arabic/watch/c7vxryk46w0qo.app',
    runforEnv: ['local'],
    service: 'arabic',
    pageIdentifier: 'arabic.watch.c7vxryk46w0qo.page',
    siteId: 5,
    applicationType: 'mobile-app',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/arabic/watch/c3x2wy0879d9o',
    runforEnv: ['live'],
    service: 'arabic',
    pageIdentifier: 'arabic.articles.c3x2wy0879d9o.page',
    siteId: 5,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/arabic/watch/cr78p48yy7qeo.app',
    // Re-enable on live once this .app route is available in Belfrage.
    runforEnv: [],
    service: 'arabic',
    pageIdentifier: 'arabic.articles.cr78p48yy7qeo.page',
    siteId: 5,
    applicationType: 'mobile-app',
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
  {
    path: '/zhongwen/watch/cr93zl51k0z9o/trad',
    runforEnv: ['local', 'live'],
    service: 'zhongwen',
    pageIdentifier: 'zhongwen.articles.cr93zl51k0z9o.trad.page',
    siteId: 38,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/zhongwen/watch/cr93zl51k0z9o/simp',
    runforEnv: ['local', 'live'],
    service: 'zhongwen',
    pageIdentifier: 'zhongwen.articles.cr93zl51k0z9o.simp.page',
    siteId: 38,
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
