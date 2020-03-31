import runAmpUserTests from './testsForAMPOnly';
import runCanonicalUserTests from './testsForCanonicalOnly';
import runStandaloneTests from '../../../support/helpers/runStandaloneTests';

const pageType = 'mediaAssetPage';

runStandaloneTests({ pageType, runAmpUserTests, runCanonicalUserTests });
