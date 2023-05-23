import {
  runCoreAmpTests,
  runAmpFooterTests,
  runAmpAnalyticsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default ({ service, pageData }) => {
  runCrossPlatformTests({ service, pageData });
  runAmpFooterTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();
};
