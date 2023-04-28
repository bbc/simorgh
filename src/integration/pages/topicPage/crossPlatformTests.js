import { runCommonCrossPlatformTests, runSectionTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runSectionTests();
};
