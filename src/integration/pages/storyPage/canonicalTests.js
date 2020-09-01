import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  describe('Lead image', () => {
    it('I can see an image with a caption', () => {
      // This selects either a img tag or a noscript tag in the case of a
      // lazy loaded image
      const imageEl = document.querySelector(
        'main figure img, main figure noscript',
      );
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

  describe('Ads', () => {
    const hasAds = service === 'mundo';
    if (hasAds) {
      const leaderboardEl = document.getElementById('dotcom-leaderboard');
      const mpuEl = document.getElementById('dotcom-mpu');

      it('should have ads in the document', () => {
        expect(leaderboardEl).toBeInTheDocument();
        expect(mpuEl).toBeInTheDocument();
      });
    }
  });
};
