import {
  runCoreAmpTests,
  runAmpAnalyticsTests,
  runSeoAmpTests,
} from '../../common';

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runSeoAmpTests();
};
