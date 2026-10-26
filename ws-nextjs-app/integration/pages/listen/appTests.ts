import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runTimestampTests,
  runCrossPlatformSEOTests,
} from '../../common';
import runAppSiteNavigationTests from '../../common/navigation.app';

export default () => {
  runResponseHeaderTests();
  runAppSiteNavigationTests();
  runCrossPlatformSEOTests();
  runTimestampTests();
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
};
