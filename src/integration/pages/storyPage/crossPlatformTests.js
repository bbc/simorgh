import {
  runCommonCrossPlatformTests,
  runTimestampTests,
  runImageTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
  runImageTests();
};
