import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';
import runAmpOnlyEpisodeTests from './ampOnlyEpisodeTests';

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runAmpOnlyEpisodeTests();
};
