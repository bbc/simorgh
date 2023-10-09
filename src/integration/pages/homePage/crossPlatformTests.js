import { runCommonCrossPlatformTests, runTimestampTests } from '../../common';

import pageContentTests from './pageContentTests';
import messageBannerTest from './messageBannerTests';

export default ({ service, pageData }) => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  pageContentTests({ pageData });
  messageBannerTest();
};
