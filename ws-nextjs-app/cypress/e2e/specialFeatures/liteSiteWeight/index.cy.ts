/* eslint-disable import/no-relative-packages */
import { PageTypes } from '#app/models/types/global';
import { ARTICLE_PAGE, LIVE_PAGE } from '#app/routes/utils/pageTypes';
import assertPageWeight from '../../../../../cypress/e2e/specialFeatures/liteSiteWeight/assertions/liteSiteWeight';
import runTestsForPage, {
  TestDataType,
} from '../../../support/helpers/runTestsForPage';

const tests = [assertPageWeight];

const runforEnv = ['local'];

const testSuites = [
  {
    path: '/burmese/live/ckg19998pldt.lite',
    runforEnv,
    tests,
    pageType: LIVE_PAGE,
    service: 'burmese',
  },
] as unknown as TestDataType[];

const articleRelatedTestSuites = [
  // {
  //   path: '/mundo/articles/cddylv9g8z0o.lite',
  //   runforEnv,
  //   pageType: ARTICLE_PAGE,
  //   tests,
  //   service: 'mundo',
  // },
  // {
  //   path: '/hausa/articles/c4nvy27mervo.lite',
  //   runforEnv,
  //   pageType: 'Optimo Media Article',
  //   tests,
  // },
  {
    path: '/arabic/media-53135426.lite',
    runforEnv,
    pageType: 'CPS Media Article with Live Stream',
    tests,
  },
  {
    path: '/persian/media-49522521.lite',
    runforEnv,
    pageType: 'CPS Media Article with Live Stream',
    tests,
  },
  {
    path: '/arabic/art-and-culture-38260491.lite',
    runforEnv,
    pageType: 'CPS Photo Gallery (PGL)',
    tests,
  },
  {
    path: '/mundo/noticias-56669604.lite',
    runforEnv,
    pageType: 'CPS Story (STY)',
    tests,
  },
] as unknown as TestDataType[];

// runTestsForPage({
//   testSuites,
//   testIsolation: true,
//   pageType: 'all' as PageTypes,
// });

runTestsForPage({
  testSuites: articleRelatedTestSuites,
  testIsolation: true,
  pageType: 'all' as PageTypes,
  headers: {
    'page-type': 'article',
  },
});
