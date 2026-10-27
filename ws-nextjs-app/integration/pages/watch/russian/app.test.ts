/**
 * @service russian
 * @pathname /russian/watch/cjqyq2kz645mo
 */
import runMediaPlayerTests from '../../../common/mediaPlayer';
import runAppTests from '../appTests';

describe('App', () => {
  describe(pageType, () => {
    runAppTests();
    runMediaPlayerTests('Media Article Page');
  });
});
