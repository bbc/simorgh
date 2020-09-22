import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runCrossPlatformTests(service);

  describe('Lead image', () => {
    it('I can see an image with a caption', () => {
      const imageEl = document.querySelector('main figure amp-img');
      expect(imageEl).toBeInTheDocument();

      const imageCaptionEl = document.querySelector('main figure figcaption');
      expect(imageCaptionEl).toBeInTheDocument();
      expect(imageCaptionEl.textContent).toBeTruthy();
      expect(imageCaptionEl.textContent).toMatchSnapshot();
    });
  });

  describe('Social Embeds', () => {
    const hasRichInstagramEmbed = !!document.querySelector(
      'iframe.instagram-media',
    );

    if (hasRichInstagramEmbed) {
      it("I can see the AMP component's JavaScript", () => {
        expect(
          document.querySelector(
            'head > script[src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"]',
          ),
        ).toBeInTheDocument();
      });
    }
  });
};
