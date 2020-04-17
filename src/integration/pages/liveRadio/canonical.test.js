/**
 * @service korean
 * @pathname /korean/bbc_korean_radio/liveradio
 */

import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

describe('Canonical Live Radio', () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
});
