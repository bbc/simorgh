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

const testsForPage = {
  pageType: 'articles',
  runTestsSpecificToPageTypeToAlwaysRun: testsToAlwaysRun(),
  runTestsSpecificToPageType: tests(),
  runTestsSpecificToPageTypeToNeverSmokeTest: testsToNeverSmokeTest(),
  runCanonicalTestsSpecificToPageTypeToAlwaysRun: testsToAlwaysRunForCanonicalOnly(),
  runCanonicalTestsSpecificToPageType: testsForCanonicalOnly(),
  runCanonicalTestsSpecificToPageTypeToNeverSmokeTest: testsToNeverSmokeTestForCanonicalOnly(),
  runAMPTestsSpecificToPageTypeToAlwaysRun: testsToAlwaysRunForAMPOnly(),
  runAmpTestsSpecificToPageType: testsForAMPOnly(),
  runAmpTestsSpecificToPageTypeToNeverSmokeTest: testsToNeverSmokeTestForAMPOnly(),
};

runTestsForPage(testsForPage);
