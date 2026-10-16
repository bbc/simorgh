/**
 * @service hausa
 * @pathname /hausa/listen/cpj5ny39g35mo.app
 */
import { runMediaPlayerAudioTests } from '#nextjs/integration/common';
import runCanonicalTests from '../../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerAudioTests();
  });
});
