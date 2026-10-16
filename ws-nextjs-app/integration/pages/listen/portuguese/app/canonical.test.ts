/**
 * @service portuguese
 * @pathname /portuguese/listen/cqx36ey0kld4o.app
 */
import { runMediaPlayerAudioTests } from '#nextjs/integration/common';
import runCanonicalTests from '../../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerAudioTests();
  });
});
