import { runCommonCrossPlatformTests, runTimestampTests } from '../../common';

import pageContentTests from './pageContentTests';
import messageBannerTest from './messageBannerTests';
import mostReadTests from './mostReadTests';

export default ({ service, pageData }) => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  pageContentTests({ pageData });
  messageBannerTest();
  mostReadTests();
};
