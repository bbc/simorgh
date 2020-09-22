import { runCommonCrossPlatformTests } from '../../common';

export default service => {
  runCommonCrossPlatformTests(service);

  describe('Social Embeds', () => {
    it('I can see the skip link', () => {
      const skipLinkEl = document.querySelector(
        'a[href="#skip-youtube-content-1"]',
      );

      expect(skipLinkEl).toBeInTheDocument();
      expect(skipLinkEl.textContent).toBeTruthy();
      expect(skipLinkEl.textContent).toMatchSnapshot();
    });

    it('I can see the skip link destination', () => {
      const skipLinkDestinationEl = document.getElementById(
        'skip-youtube-content-1',
      );

      expect(skipLinkDestinationEl).toBeInTheDocument();
      expect(skipLinkDestinationEl.textContent).toBeTruthy();
      expect(skipLinkDestinationEl.textContent).toMatchSnapshot();
    });

    /**
     * Rich embeds.
     */
    const hasRichYouTubeEmbed = [
      document.querySelector('iframe[src*="https://www.youtube.com/embed/"]'),
      document.querySelector('amp-youtube'),
    ].find(el => !!el);

    if (hasRichYouTubeEmbed) {
      it('I can see the caption accompanying a YouTube embed', () => {
        const figCaptionEl = document.querySelector(
          'a[href="#skip-youtube-content-1"] + figure > figcaption',
        );

        expect(figCaptionEl).toBeInTheDocument();
        expect(figCaptionEl.textContent).toBeTruthy();
        expect(figCaptionEl.textContent).toMatchSnapshot();
      });
    }

    /**
     * Fallbacks.
     */
    const hasFallback = !!document.getElementById('skip-facebook-content-1');

    if (hasFallback) {
      it('I can see a link to the original content in a fallback', () => {
        const externalLinkEl = document.querySelector(
          'a[href*="https://www.facebook.com"]',
        );

        expect(externalLinkEl).toBeInTheDocument();
        expect(externalLinkEl.textContent).toBeTruthy();
        expect(externalLinkEl.textContent).toMatchSnapshot();
      });
    }
  });
};
