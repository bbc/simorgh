import {
  runHeaderTests,
  runA11yTests,
  runFooterTests,
} from '#src/integration/common';
import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';

import ugcFormTest from './ugcFormTests';

export default () => {
  runResponseHeaderTests();
  runHeaderTests();
  runA11yTests();
  runFooterTests();
  ugcFormTest();
};
