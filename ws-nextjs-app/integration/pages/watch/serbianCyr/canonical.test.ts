/**
 * @service serbian
 * @pathname /serbian/watch/c8506jgj5gw6o/cyr
 */
import runMediaPlayerTests from '../../../common/mediaPlayer';
import runCanonicalTests from '../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerTests('Media Article Page');
  });
});
