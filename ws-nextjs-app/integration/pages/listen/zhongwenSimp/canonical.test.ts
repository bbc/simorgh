/**
 * @service zhongwen
 * @pathname /zhongwen/listen/cgn50l2wz6kqo/simp
 */
import runMediaPlayerAudioTests from '../../../common/mediaPlayerAudio';
import runCanonicalTests from '../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerAudioTests();
  });
});
