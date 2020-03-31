import runAmpTests from './testsForAMPOnly';
import runCanonicalTests from './testsForCanonicalOnly';
import runStandaloneTests from '../../../support/helpers/runStandaloneTests';

const pageType = 'mediaAssetPage';

runStandaloneTests({ pageType, runAmpTests, runCanonicalTests });
