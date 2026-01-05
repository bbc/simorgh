import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';
import { runHeaderTests, runMediaPlayerTests } from '../../common';

export default () => {
  runResponseHeaderTests();
  runHeaderTests(service);
  runMediaPlayerTests(pageType);
};
