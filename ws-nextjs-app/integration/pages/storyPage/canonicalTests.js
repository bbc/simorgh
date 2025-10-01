import {
  // runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '#src/integration/common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service, 'STY');
  // debuggggg
  // runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  describe('Lead image', () => {
    it('I can see an image with a caption', () => {
      const imageEl = document.querySelector('main figure img');
      expect(imageEl).toBeInTheDocument();

      const imageCaptionEl = document.querySelector('main figure figcaption');
      expect(imageCaptionEl).toBeInTheDocument();
      expect(imageCaptionEl.textContent).toBeTruthy();
      expect(imageCaptionEl.textContent).toMatchSnapshot();
    });
  });
};
