import runA11yTests from './a11y';
import runAmpAnalyticsTests from './analytics.amp';
import runCanonicalAnalyticsTests from './analytics.canonical';
import runCoreAmpTests from './core.amp';
import runCoreCanonicalTests from './core.canonical';
import runFooterTests from './footer';
import runAmpFooterTests from './footer.amp';
import runHeaderTests from './header';
import runMainHeadingTests from './mainHeading';
import runMediaPlaceholderTests from './mediaPlaceholder';
import runMediaPlayerEmbedTests from './mediaPlayerEmbed';
import runPerformanceTests from './performance';
import runRadioScheduleTests from './radioSchedule';
import runRecentEpisodesTests from './recentEpisodes';
import runCrossPlatformSEOTests from './SEO';
import runSeoAmpTests from './SEO.amp';
import runTimestampTests from './timestamp';
import runImageTests from './image';
import runAppleItunesAppBannerTests from './appleItunesAppBanner';
import runStoryPromoTests from './storyPromo';
import runSectionTests from './sections';

const runCommonCrossPlatformTests = service => {
  runA11yTests();
  runHeaderTests(service);
  runFooterTests();
  runPerformanceTests({ service });
  runCrossPlatformSEOTests();
  runMainHeadingTests();
};

export {
  runA11yTests,
  runAmpAnalyticsTests,
  runCanonicalAnalyticsTests,
  runCommonCrossPlatformTests,
  runCoreAmpTests,
  runCoreCanonicalTests,
  runFooterTests,
  runAmpFooterTests,
  runHeaderTests,
  runMainHeadingTests,
  runMediaPlaceholderTests,
  runMediaPlayerEmbedTests,
  runPerformanceTests,
  runRadioScheduleTests,
  runRecentEpisodesTests,
  runCrossPlatformSEOTests,
  runSeoAmpTests,
  runTimestampTests,
  runImageTests,
  runAppleItunesAppBannerTests,
  runStoryPromoTests,
  runSectionTests,
};
