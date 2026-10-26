/**
 * @service mundo
 * @pathname /mundo/listen/ck124pz8jz1yo
 */
import { runMediaPlayerAudioTests } from '#nextjs/integration/common';
import runAppTests from '../appTests';

describe('App', () => {
  describe(pageType, () => {
    runAppTests();
    runMediaPlayerAudioTests();
  });
});
