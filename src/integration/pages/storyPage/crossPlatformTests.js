import {
  runCommonCrossPlatformTests,
  runImageWithCaptionTests,
} from '../../common';

export default () => {
  runCommonCrossPlatformTests();
  runImageWithCaptionTests();

  describe('Social Embeds', () => {
    describe('Skip link', () => {
      const skipLinkEl = document.querySelector(
        'a[href="#skip-youtube-content-1"]',
      );

      it('should be in the document', () => {
        expect(skipLinkEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(skipLinkEl.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(skipLinkEl.textContent).toMatchSnapshot();
      });
    });

    describe('Skip link destination', () => {
      const skipLinkDestinationEl = document.getElementById(
        'skip-youtube-content-1',
      );

      it('should be in the document', () => {
        expect(skipLinkDestinationEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(skipLinkDestinationEl.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(skipLinkDestinationEl.textContent).toMatchSnapshot();
      });
    });

    /**
     * Rich embeds.
     */
    const hasRichYouTubeEmbed = [
      document.querySelector('iframe[src*="https://www.youtube.com/embed/"]'),
      document.querySelector('amp-youtube'),
    ].find(el => !!el);

    if (hasRichYouTubeEmbed) {
      describe('YouTube embed caption', () => {
        const figCaptionEl = document.querySelector(
          'a[href="#skip-youtube-content-1"] + figure > figcaption',
        );

        it('should be in the document', () => {
          expect(figCaptionEl).toBeInTheDocument();
        });

        it('should have text', () => {
          expect(figCaptionEl.textContent).toBeTruthy();
        });

        it('should match text', () => {
          expect(figCaptionEl.textContent).toMatchSnapshot();
        });
      });
    }

    /**
     * Fallbacks.
     */
    const hasFallback = !!document.getElementById('skip-facebook-content-1');

    if (hasFallback) {
      describe('Embed original content fallback', () => {
        const externalLinkEl = document.querySelector(
          'a[href*="https://www.facebook.com"]',
        );

        it('should be in the document', () => {
          expect(externalLinkEl).toBeInTheDocument();
        });

        it('should have text', () => {
          expect(externalLinkEl.textContent).toBeTruthy();
        });

        it('should match text', () => {
          expect(externalLinkEl.textContent).toMatchSnapshot();
        });
      });
    }
  });
};
