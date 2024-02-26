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

  it('should render the correct number of curations, including most read & radio schedule', () => {
    const curationsWithSummaries = pageData.curations.filter(
      ({ summaries, mostRead, radioSchedule }) =>
        (summaries && summaries?.length > 0) || mostRead || radioSchedule,
    );

    const numberOfCurations = document.querySelectorAll('main h2').length;
    expect(numberOfCurations).toEqual(curationsWithSummaries.length);
  });

  describe('Radio Schedule', () => {
    const radioScheduleComponent = document.getElementById('Radio-Schedule');

    if (service === 'arabic') {
      it('should be in the document', () => {
        expect(radioScheduleComponent).toBeInTheDocument();
      });
    } else {
      it('should not be in the document', () => {
        expect(radioScheduleComponent).not.toBeInTheDocument();
      });
    }
  });
};
