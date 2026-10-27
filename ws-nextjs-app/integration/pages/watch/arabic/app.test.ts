/**
 * @service arabic
 * @pathname /arabic/watch/c7vxryk46w0qo
 */
import runMediaPlayerTests from '../../../common/mediaPlayer';
import runAppTests from '../appTests';

describe('App', () => {
  describe(pageType, () => {
    runAppTests();
    runMediaPlayerTests('Media Article Page');
  });
});
