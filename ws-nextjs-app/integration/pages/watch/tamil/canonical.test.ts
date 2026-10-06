/**
 * @service tamil
 * @pathname /tamil/watch/c6gjm3gede9zo
 */
import runMediaPlayerTests from '../../../common/mediaPlayer';
import runCanonicalTests from '../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerTests('Media Article Page');
  });
});
