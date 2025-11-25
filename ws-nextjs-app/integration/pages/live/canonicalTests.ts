import { runHeaderTests, runMediaPlayerTests } from '#src/integration/common';
import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';

export default () => {
  runResponseHeaderTests();
  runHeaderTests();
  runMediaPlayerTests();
};
