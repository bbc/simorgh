/**
 * @service hindi
 * @pathname /hindi/watch/cw1ldl595v1yo
 */
import runMediaPlayerTests from '../../../common/mediaPlayer';
import runAppTests from '../appTests';

describe('App', () => {
  describe(pageType, () => {
    runAppTests();
    runMediaPlayerTests('Media Article Page');
  });
});
