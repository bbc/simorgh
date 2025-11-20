import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
  runMostReadTests,
} from '#src/integration/common';
import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';

export default (service: string) => {
  runResponseHeaderTests();
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();

  if (service !== 'scotland') {
    runMostReadTests();
  }
};
