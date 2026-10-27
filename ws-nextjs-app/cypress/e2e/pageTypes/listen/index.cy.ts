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
    path: '/portuguese/listen/cqx36ey0kld4o.app',
    runforEnv: ['local'],
    service: 'portuguese',
    tests: [...canonicalTests],
  },
  {
    path: '/dari/listen/c4z1p12mn62po',
    runforEnv: ['local'],
    service: 'dari',
    tests: [...canonicalTests],
  },
  {
    path: '/tamil/listen/cw3xlkprxv82o',
    runforEnv: ['local'],
    service: 'tamil',
    tests: [...canonicalTests],
  },
  {
    path: '/tamil/listen/cwyzlmrmy87o',
    runforEnv: ['live'],
    service: 'tamil',
    tests: [...canonicalTests],
  },
  {
    path: '/portuguese/listen/cj62yn475xrwo.app',
    runforEnv: ['live'],
    service: 'portuguese',
    tests: [...canonicalTests],
  },
  {
    path: '/zhongwen/listen/cgn50l2wz6kqo/trad',
    runforEnv: ['local'],
    service: 'zhongwen',
    tests: [...canonicalTests],
  },
  {
    path: '/zhongwen/listen/cgn50l2wz6kqo/simp',
    runforEnv: ['local'],
    service: 'zhongwen',
    tests: [...canonicalTests],
  },
];

const atiAnalyticsTestSuites = [
  {
    path: '/portuguese/listen/cqx36ey0kld4o.app',
    runforEnv: ['local'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.listen.cqx36ey0kld4o.page',
    siteId: 33,
    applicationType: 'mobile-app',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/dari/listen/c4z1p12mn62po',
    runforEnv: ['local'],
    service: 'dari',
    pageIdentifier: 'dari.listen.c4z1p12mn62po.page',
    siteId: 142,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
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
  {
    path: '/portuguese/listen/cj62yn475xrwo.app',
    runforEnv: ['live'],
    service: 'portuguese',
    pageIdentifier: 'portuguese.articles.cj62yn475xrwo.page',
    siteId: 33,
    applicationType: 'mobile-app',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/zhongwen/listen/cgn50l2wz6kqo/trad',
    runforEnv: ['local'],
    service: 'zhongwen',
    pageIdentifier: 'zhongwen.listen.cgn50l2wz6kqo.trad.page',
    siteId: 38,
    applicationType: 'responsive',
    contentType: 'article-sfv',
    tests: [assertPageView],
  },
  {
    path: '/zhongwen/listen/cgn50l2wz6kqo/simp',
    runforEnv: ['local'],
    service: 'zhongwen',
    pageIdentifier: 'zhongwen.listen.cgn50l2wz6kqo.simp.page',
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
