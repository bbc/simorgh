/**
 * @service mundo
 * @pathname /mundo/listen/ck124pz8jz1yo.app
 */
import { runMediaPlayerAudioTests } from '#nextjs/integration/common';
import runCanonicalTests from '../../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerAudioTests();
  });
});
