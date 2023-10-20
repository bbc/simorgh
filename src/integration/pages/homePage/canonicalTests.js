import {
  runCoreCanonicalTests,
  runMostReadTests,
  runCanonicalAdsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default ({ service, pageData, displayAds }) => {
  runCrossPlatformTests({ service, pageData });
  runCoreCanonicalTests();
  runMostReadTests();

  if (displayAds) {
    runCanonicalAdsTests();
  }

  it('should render the correct number of curations, including most read', () => {
    const curationsWithSummaries = pageData.curations.filter(
      ({ summaries, mostRead }) =>
        (summaries && summaries?.length > 0) || mostRead,
    );

    const numberOfCurations = document.querySelectorAll('main section').length;

    expect(numberOfCurations).toEqual(curationsWithSummaries.length);
  });
};
