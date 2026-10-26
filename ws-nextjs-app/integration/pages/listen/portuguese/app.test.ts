/**
 * @service portuguese
 * @pathname /portuguese/listen/cqx36ey0kld4o
 */
import { runMediaPlayerAudioTests } from '#nextjs/integration/common';
import runAppTests from '../appTests';

describe('App', () => {
  describe(pageType, () => {
    runAppTests();
    runMediaPlayerAudioTests();
  });
});
