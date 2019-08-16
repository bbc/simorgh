import iterator from '../../../support/iterator';
import runCanonicalTests from './amp.test';
import runAmpTests from './canonical.test';
import runCommonTests from './common.test';

export default iterator(
  'liveRadio',
  runCommonTests,
  runCanonicalTests,
  runAmpTests,
);
