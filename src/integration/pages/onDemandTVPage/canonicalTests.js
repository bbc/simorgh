import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

jest.setTimeout(10000); // overriding the default jest timeout

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
};
