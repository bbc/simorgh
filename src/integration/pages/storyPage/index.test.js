/**
 * @service mundo
 * @pathname /mundo/noticias-internacional-51266689
 */

import runCrossPlatformTests from './crossPlatformTests';
import runAmpTests from './ampTests';
import runCanonicalTests from './canonicalTests';

describe(`Story Page - ${platform} - `, () => {
  runCrossPlatformTests();

  if (platform === 'amp') {
    runAmpTests();
  }

  if (platform === 'canonical') {
    runCanonicalTests();
  }
});
