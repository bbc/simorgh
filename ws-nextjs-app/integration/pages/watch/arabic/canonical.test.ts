/**
 * @service arabic
 * @pathname /arabic/watch/c7vxryk46w0qo
 */
import runMediaPlayerTests from '../../../common/mediaPlayer';
import runCanonicalTests from '../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerTests('Media Article Page');
  });
});
