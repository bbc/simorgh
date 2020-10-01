import {
  runCommonCrossPlatformTests,
  runMainHeadingTests,
  runStoryPromoTests,
  runSectionTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runMainHeadingTests();
  runStoryPromoTests();
  runSectionTests();
};
