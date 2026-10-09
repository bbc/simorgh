import runResponseHeaderTests from '#nextjs/integration/utils/responseHeaderTests';
import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
  runMostReadTests,
} from '../../common';

export default (service: string) => {
  runResponseHeaderTests();
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();

  if (service !== 'scotland') {
    runMostReadTests();
  }
};
