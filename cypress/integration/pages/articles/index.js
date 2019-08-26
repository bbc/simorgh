import runTestsForPage from '../../../support/helpers/runTestsForPage';
import { testsToAlwaysRun, tests, testsToNeverSmokeTest } from './tests';
import testsForAMPOnly from './testsForAMPOnly';
import testsForCanonicalOnly from './testsForCanonicalOnly';

runTestsForPage(
  'articles',
  testsToAlwaysRun,
  tests,
  testsToNeverSmokeTest,
  testsForCanonicalOnly,
  testsForAMPOnly,
);
