import { runMediaPlayerTests } from '#src/integration/common';
import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';

export default () => {
  runResponseHeaderTests();
  runMediaPlayerTests();
};
