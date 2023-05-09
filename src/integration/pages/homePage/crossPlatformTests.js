import { runCommonCrossPlatformTests, runTimestampTests } from '../../common';

import messageBannerTest from './messageBannerTests';

export default service => {
  runCommonCrossPlatformTests(service);
  messageBannerTest();
  runTimestampTests();
};
