import cafServicesConst from '../../../app/lib/cafServices.const';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
  runMediaPlayerEmbedTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default (service, pageType) => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  if (cafServicesConst.includes(service)) {
    runMediaPlayerEmbedTests(pageType);
  }
};
