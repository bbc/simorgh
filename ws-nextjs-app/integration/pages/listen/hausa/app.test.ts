/**
 * @service hausa
 * @pathname /hausa/listen/cpj5ny39g35mo
 */
import { runMediaPlayerAudioTests } from '#nextjs/integration/common';
import runAppTests from '../appTests';

describe('App', () => {
  describe(pageType, () => {
    runAppTests(service);
    runMediaPlayerAudioTests();
  });
});
