/**
 * @service tamil
 * @pathname /tamil/listen/cw3xlkprxv82o
 */
import runMediaPlayerAudioTests from '../../../common/mediaPlayerAudio';
import runCanonicalTests from '../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerAudioTests();
  });
});
