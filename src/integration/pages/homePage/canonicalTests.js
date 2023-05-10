import { runCoreCanonicalTests } from '../../common';
import runCrossPlatformTests from './crossPlatformTests';
import pageContentTests from './pageContentTests';
import messageBannerTest from './messageBannerTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  pageContentTests();
  messageBannerTest();
};
