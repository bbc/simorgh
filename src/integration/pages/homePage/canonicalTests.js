import { runCoreCanonicalTests, runMostReadTests } from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default ({ service, pageData }) => {
  runCrossPlatformTests({ service, pageData });
  runCoreCanonicalTests();
  runMostReadTests();

  it('should render the correct number of curations, including most read', () => {
    const curationsWithSummaries = pageData.curations.filter(
      ({ summaries, mostRead }) =>
        (summaries && summaries?.length > 0) || mostRead,
    );

    const numberOfCurations = document.querySelectorAll('main h2').length;

    expect(numberOfCurations).toEqual(curationsWithSummaries.length);
  });
};
