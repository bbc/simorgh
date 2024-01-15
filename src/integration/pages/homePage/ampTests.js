import {
  runCoreAmpTests,
  runAmpFooterTests,
  runAmpAnalyticsTests,
  runAmpAdsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default ({ service, pageData, displayAds }) => {
  runCrossPlatformTests({ service, pageData });
  runAmpFooterTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();

  if (displayAds) {
    runAmpAdsTests();
  }

  it('should render the correct number of curations, excluding most read', () => {
    const curationsWithSummaries = pageData.curations.filter(
      ({ summaries }) => summaries && summaries?.length > 0,
    );

    const numberOfCurations = document.querySelectorAll('main h2').length;

    expect(numberOfCurations).toEqual(curationsWithSummaries.length);
  });
};
