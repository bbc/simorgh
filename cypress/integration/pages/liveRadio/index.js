import runTestsForPage from '../../../support/helpers/runTestsForPage';
import tests from './tests';
import testsForAMPOnly from './testsForAMPOnly';
import testsForCanonicalOnly from './testsForCanonicalOnly';

runTestsForPage('liveRadio', tests, testsForCanonicalOnly, testsForAMPOnly);
