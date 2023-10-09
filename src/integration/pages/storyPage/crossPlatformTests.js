import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
  runMostReadTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();
  runMostReadTests();
};
