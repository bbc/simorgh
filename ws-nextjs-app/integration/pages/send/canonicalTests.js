import {
  runHeaderTests,
  runA11yTests,
  runFooterTests,
} from '../../../../src/integration/common';

import ugcFormTest from './ugcFormTests';

export default () => {
  runHeaderTests();
  runA11yTests();
  runFooterTests();
  ugcFormTest();
};
