import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
} from '#src/integration/common';
import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';

export default (service: string) => {
  runResponseHeaderTests();
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();
};
