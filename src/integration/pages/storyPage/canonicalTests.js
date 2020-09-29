import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  describe('Social Embeds', () => {
    const hasRichInstagramEmbed = !!document.querySelector(
      'iframe.instagram-media',
    );

    if (hasRichInstagramEmbed) {
      it("I can see the social media provider's JavaScript", () => {
        expect(
          document.querySelector(
            'head > script[src="https://www.instagram.com/embed.js"]',
          ),
        ).toBeInTheDocument();
      });
    }
  });
};
