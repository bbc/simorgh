/**
 * @service russian
 * @pathname /russian/watch/cjqyq2kz645mo
 */
import runMediaPlayerTests from '../../../../common/mediaPlayer';
import runCanonicalTests from '../../../articles/canonicalTests';

describe('Canonical', () => {
  describe(pageType, () => {
    runCanonicalTests(service);
    runMediaPlayerTests('Media Article Page');
  });
});
