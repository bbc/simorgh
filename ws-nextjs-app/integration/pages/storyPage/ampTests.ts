import {
  runCoreAmpTests,
  runAmpAnalyticsTests,
  runSeoAmpTests,
} from '#src/integration/common';
import { Services } from '#app/models/types/global';
import runCrossPlatformTests from './crossPlatformTests';

export default (service: Services) => {
  runCrossPlatformTests(service);
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runSeoAmpTests();

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
