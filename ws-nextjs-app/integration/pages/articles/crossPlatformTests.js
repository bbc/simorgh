import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
  runMostReadTests,
} from '#src/integration/common';

export default service => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();

  if (service !== 'scotland') {
    runMostReadTests();
  }
};
