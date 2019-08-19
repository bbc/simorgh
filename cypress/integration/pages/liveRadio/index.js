import iterator from '../../../support/iterator';
import runCanonicalTests from './amp';
import runAmpTests from './canonical';
import runCommonTests from './common';

iterator('liveRadio', runCommonTests, runCanonicalTests, runAmpTests);
