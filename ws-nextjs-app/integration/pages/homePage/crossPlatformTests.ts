import { runCommonCrossPlatformTests, runTimestampTests } from '../../common';

import pageContentTests from './pageContentTests';
import messageBannerTest from './messageBannerTests';

export default ({ service }) => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  pageContentTests();
  messageBannerTest();
};
