import {
  runCoreAmpTests,
  runAmpAnalyticsTests,
  runSeoAmpTests,
} from '../../common';

jest.setTimeout(10000); // overriding the default jest timeout

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runSeoAmpTests();
};
