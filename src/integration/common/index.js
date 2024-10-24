import runA11yTests from './a11y';
import runAmpAnalyticsTests from './analytics.amp';
import runCanonicalAnalyticsTests from './analytics.canonical';
import runCoreAmpTests from './core.amp';
import runCoreCanonicalTests from './core.canonical';
import runFooterTests from './footer';
import runAmpFooterTests from './footer.amp';
import runHeaderTests from './header';
import runMainHeadingTests from './mainHeading';
import runMediaPlayerAudioTests from './mediaPlayerAudio';
import runMediaPlayerTests from './mediaPlayer';
import runRadioScheduleTests from './radioSchedule';
import runRecentEpisodesTests from './recentEpisodes';
import runCrossPlatformSEOTests from './SEO';
import runSeoAmpTests from './SEO.amp';
import runTimestampTests from './timestamp';
import runImageTests from './image';
import runAppleItunesAppBannerTests from './appleItunesAppBanner';
import runStoryPromoTests from './storyPromo';
import runSectionTests from './sections';
import runMostReadTests from './mostReadTests';
import runAmpAdsTests from './ads.amp';
import runCanonicalAdsTests from './ads.canonical';
import runFlourishCanonicalEmbedTests from './flourishEmbed.canonical';
import runFlourishAmpEmbedTests from './flourishEmbed.amp';
import runCanonicalEmbedHtmlTests from './embedHtml.canonical';
import runAmpEmbedHtmlTests from './embedHtml.amp';
import runEmbedImagesTests from './embedImages';
import runAmpIframeTests from './ampIframe.amp';
import runLiteSiteTests from './liteSite.lite';

const runCommonCrossPlatformTests = service => {
  runA11yTests();
  runHeaderTests(service);
  runFooterTests();
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
  runMediaPlayerAudioTests,
  runMediaPlayerTests,
  runMostReadTests,
  runRadioScheduleTests,
  runRecentEpisodesTests,
  runCrossPlatformSEOTests,
  runSeoAmpTests,
  runTimestampTests,
  runImageTests,
  runAppleItunesAppBannerTests,
  runStoryPromoTests,
  runSectionTests,
  runAmpAdsTests,
  runCanonicalAdsTests,
  runFlourishCanonicalEmbedTests,
  runFlourishAmpEmbedTests,
  runCanonicalEmbedHtmlTests,
  runAmpEmbedHtmlTests,
  runEmbedImagesTests,
  runAmpIframeTests,
  runLiteSiteTests,
};
