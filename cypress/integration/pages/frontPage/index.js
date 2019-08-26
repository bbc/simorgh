import runTestsForPage from '../../../support/helpers/runTestsForPage';
import { testsToAlwaysRun, tests, testsToNeverSmokeTest } from './tests';
import {
  testsToAlwaysRunForAMPOnly,
  testsForAMPOnly,
  testsToNeverSmokeTestForAMPOnly,
} from './testsForAMPOnly';
import {
  testsToAlwaysRunForCanonicalOnly,
  testsForCanonicalOnly,
  testsToNeverSmokeTestForCanonicalOnly,
} from './testsForCanonicalOnly';

runTestsForPage(
  'frontPage',
  testsToAlwaysRun,
  tests,
  testsToNeverSmokeTest,
  testsToAlwaysRunForCanonicalOnly,
  testsForCanonicalOnly,
  testsToNeverSmokeTestForCanonicalOnly,
  testsToAlwaysRunForAMPOnly,
  testsForAMPOnly,
  testsToNeverSmokeTestForAMPOnly,
);
