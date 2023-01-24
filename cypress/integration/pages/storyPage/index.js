import runTestsForPage from '../../../support/helpers/runTestsForPage';
import * as crossPlatformTests from './tests';
import * as ampTests from './testsForAMPOnly';
import * as canonicalTests from './testsForCanonicalOnly';

runTestsForPage({
  pageType: 'storyPage',
  ...crossPlatformTests,
  ...ampTests,
  ...canonicalTests,
});
