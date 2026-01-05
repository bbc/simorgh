import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';
import { runHeaderTests, runA11yTests, runFooterTests } from '../../common';

import ugcFormTest from './ugcFormTests';

export default () => {
  runResponseHeaderTests();
  runHeaderTests(service);
  runA11yTests();
  runFooterTests();
  ugcFormTest();
};
