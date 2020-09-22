import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runSeoCanonicalTests,
} from '../../common';

export default service => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runSeoCanonicalTests(service);
};
