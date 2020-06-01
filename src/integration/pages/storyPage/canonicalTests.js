import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  describe('Lead image', () => {
    it('I can see an image with a caption in a noscript tag', () => {
      const imageEl = document.querySelector('main figure');
      console.log(`here: ${JSON.stringify(imageEl, null, 2)}`);
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
