import { STATIC_PAGE, HOME_PAGE } from '#app/routes/utils/pageTypes';
import runTestsForPage from '../../support/helpers/runTestsForPage';

import { homePageTestSuites, staticPageTestSuites } from './tests';

describe('Languages Page E2E', () => {
  runTestsForPage({
    pageType: STATIC_PAGE,
    testSuites: staticPageTestSuites,
  });

  runTestsForPage({
    pageType: HOME_PAGE,
    testSuites: homePageTestSuites,
  });
});
