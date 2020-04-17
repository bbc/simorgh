/**
 * @service persian
 * @pathname /persian/iran-23231114
 */

import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

describe('Canonical Media Asset Page', () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
});
