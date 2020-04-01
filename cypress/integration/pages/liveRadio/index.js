import runAmpTests from './user.amp';
import runCanonicalTests from './user.canonical';
import runStandaloneTests from '../../../support/helpers/runStandaloneTests';

const pageType = 'liveRadio';

runStandaloneTests({ pageType, runAmpTests, runCanonicalTests });
