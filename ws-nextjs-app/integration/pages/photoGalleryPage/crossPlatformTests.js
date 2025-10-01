import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
} from '#src/integration/common';

export default service => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();
};
