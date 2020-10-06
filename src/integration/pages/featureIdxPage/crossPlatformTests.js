import {
  runCommonCrossPlatformTests,
  runStoryPromoTests,
  runSectionTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runStoryPromoTests();
  runSectionTests();
};
