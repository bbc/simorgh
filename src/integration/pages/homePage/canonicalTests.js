import { runCoreCanonicalTests } from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  describe('hierarchical grid', () => {
    const { pageData } = window.SIMORGH_DATA;
    const numberOfItems = pageData.curations.length;
    const hierarchicalGrid = document.querySelector(
      '[data-testid="hierarchical-grid"]',
    );
    const numberOfcurations = document.querySelectorAll('h2').length;
    it('is displayed', () => {
      expect(hierarchicalGrid).toBeInTheDocument();
      expect(numberOfcurations).toEqual(numberOfItems);
    });
  });
};
