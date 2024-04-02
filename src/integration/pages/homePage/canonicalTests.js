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

  it('should render the correct number of curations, including most read, radio schedule & VJ embed', () => {
    const curationsWithSummaries = pageData.curations.filter(
      ({ summaries, mostRead, radioSchedule, embed }) =>
        (summaries && summaries?.length > 0) ||
        mostRead ||
        radioSchedule ||
        embed,
    );
    // I have edited the hindi embed html fixture data so that the embed heading is an h2 as this is what we want
    // Do we need a discussion with VJ to talk about making the headings all h2?
    // Otherwise if they are going to keep making them h1s, then this test doesn't apply to
    // all real embeds
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

  describe('Embed', () => {
    const embedComponent = document.querySelector('[data-testid="embed"]');
    if (service === 'hindi') {
      it('should be in the document', () => {
        expect(embedComponent).toBeInTheDocument();
      });
    } else {
      it('should not be in the document', () => {
        expect(embedComponent).not.toBeInTheDocument();
      });
    }
  });
};
