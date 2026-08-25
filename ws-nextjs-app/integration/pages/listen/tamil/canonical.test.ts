/**
 * @service tamil
 * @pathname /tamil/listen/c84m2jl4dpzo
 */
import runMediaPlayerAudioTests from '../../../common/mediaPlayerAudio';
import runCanonicalTests from '../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerAudioTests();
  });
});
