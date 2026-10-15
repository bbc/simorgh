/**
 * @service hindi
 * @pathname /hindi/watch/cw1ldl595v1yo
 */
import runMediaPlayerTests from '../../../common/mediaPlayer';
import runCanonicalTests from '../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerTests('Media Article Page');
  });
});
