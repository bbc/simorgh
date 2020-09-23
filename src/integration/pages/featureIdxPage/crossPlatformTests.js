import {
  runCommonCrossPlatformTests,
  runMainHeadingTests,
  runStoryPromoTests,
} from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);
  runMainHeadingTests();
  runStoryPromoTests();
};
