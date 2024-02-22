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

  describe('Most Read', () => {
    it('should render the correct number of curations, including most read', () => {
      const curationsWithSummaries = pageData.curations.filter(
        ({ summaries, mostRead }) =>
          (summaries && summaries?.length > 0) || mostRead,
      );

      const numberOfCurations = document.querySelectorAll('main h2').length;
      // we know that number of curations is 3, but we need to modify the most read fixture data
      // so that the test recognises the addition of the radio schedule curation to most read?
      expect(numberOfCurations).toEqual(curationsWithSummaries.length + 1);
    });
  });

  describe.only('Radio Schedule', () => {
    const hasRadioSchedule = service === 'arabic';
    const id = document.getElementById('Radio-Schedule');

    if (hasRadioSchedule) {
      it('should be in the document', () => {
        expect(id).toBeInTheDocument();
      });
    } else {
      it('should not be in the document', () => {
        expect(id).not.toBeInTheDocument();
      });
    }
  });
};
