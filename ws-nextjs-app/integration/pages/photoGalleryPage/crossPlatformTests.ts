import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
} from '#src/integration/common';

export default (service: string) => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();
};
