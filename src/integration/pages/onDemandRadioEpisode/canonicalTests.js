import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';
import runCanonicalOnlyEpisodeTests from './canonicalOnlyEpisodeTests';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  runCanonicalOnlyEpisodeTests();
};
