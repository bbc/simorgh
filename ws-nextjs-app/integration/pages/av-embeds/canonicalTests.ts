import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';
import { runMediaPlayerTests } from '../../common';

export default () => {
  runResponseHeaderTests();
  runMediaPlayerTests(pageType);
};
