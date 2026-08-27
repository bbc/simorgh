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
  testSuites: [
    ...atiAnalyticsTestSuites.filter(({ service }) => service !== 'news'),
  ] as unknown as TestDataType[],
});

runTestsForPage({
  pageType: ARTICLE_PAGE,
  beforeEachFns: [],
  testSuites: [...canonicalTestSuites],
  deleteServiceWorker: true,
});
