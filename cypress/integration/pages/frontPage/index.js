import runTestsForPage from '../../../support/helpers/runTestsForPage';
import tests from './tests';
import testsForAMPOnly from './testsForAMPOnly';
import testsForCanonicalOnly from './testsForCanonicalOnly';

runTestsForPage('frontPage', tests, testsForCanonicalOnly, testsForAMPOnly);
