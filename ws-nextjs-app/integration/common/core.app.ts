import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runTimestampTests,
  runCrossPlatformSEOTests,
} from '.';
import runAppSiteNavigationTests from './navigation.app';

export default () => {
  runResponseHeaderTests();
  runAppSiteNavigationTests();
  runCrossPlatformSEOTests();
  runTimestampTests();
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
};
