import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runMediaPlaceholderTests,
} from '../../common';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runMediaPlaceholderTests();
};
