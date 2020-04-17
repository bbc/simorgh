import runA11yTests from './a11y';
import runAmpAnalyticsTests from './analytics.amp';
import runCanonicalAnalyticsTests from './analytics.canonical';
import runCoreAmpTests from './core.amp';
import runCoreCanonicalTests from './core.canonical';
import runFooterTests from './footer';
import runHeaderTests from './header';
import runMediaPlayerTests from './mediaPlayer';
import runPerformanceTests from './performance';
import runSEOTests from './SEO';

const runCommonCrossPlatformTests = () => {
  runA11yTests();
  runHeaderTests();
  runFooterTests();
  runPerformanceTests();
  runSEOTests();
};

export {
  runA11yTests,
  runAmpAnalyticsTests,
  runCanonicalAnalyticsTests,
  runCommonCrossPlatformTests,
  runCoreAmpTests,
  runCoreCanonicalTests,
  runFooterTests,
  runHeaderTests,
  runMediaPlayerTests,
  runPerformanceTests,
  runSEOTests,
};
