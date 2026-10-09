/**
 * @service romania
 * @pathname /romania/listen/cwn607ex79dro
 */
import runMediaPlayerAudioTests from '../../../common/mediaPlayerAudio';
import runCanonicalTests from '../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerAudioTests();
  });
});
