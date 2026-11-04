/**
 * @service arabic
 * @pathname /arabic/watch/c7vxryk46w0qo
 */
import runMediaPlayerTests from '../../../common/mediaPlayer';
import runAppTests from '../../../common/core.app';

describe('App', () => {
  describe(pageType, () => {
    runAppTests();
    runMediaPlayerTests('Media Article Page');
  });
});
