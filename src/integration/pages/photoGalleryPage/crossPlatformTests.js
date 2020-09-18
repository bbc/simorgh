import { runCommonCrossPlatformTests, runTimestampTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runTimestampTests();
};
