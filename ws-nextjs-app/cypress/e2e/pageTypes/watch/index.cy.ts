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
    path: '/gujarati/watch/c93437jwkzpo',
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
    pageIdentifier: 'tamil.articles.c36l16ny6klo.page',
    siteId: 87,
    applicationType: 'responsive',
    contentType: 'article',
    tests: [assertPageView],
  },
  {
    path: '/gujarati/watch/c93437jwkzpo',
    runforEnv: ['local', 'live'],
    service: 'gujarati',
    pageIdentifier: 'gujarati.articles.c93437jwkzpo.page',
    siteId: 50,
    applicationType: 'responsive',
    contentType: 'article',
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
