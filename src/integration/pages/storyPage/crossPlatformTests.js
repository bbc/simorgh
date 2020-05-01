import { runCommonCrossPlatformTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();

  it('I can see an image with a caption', () => {
    const imageEl = document.querySelector(
      'main figure img, main figure amp-img',
    );
    const imageCaptionEl = document.querySelector('main figure figcaption');

    expect(imageEl).toBeInTheDocument();
    expect(imageCaptionEl).toBeInTheDocument();
    expect(imageCaptionEl.textContent).toBeTruthy();
    expect(imageCaptionEl.textContent).toMatchSnapshot();
  });

  /**
   * Social Embeds.
   */
  it('I can see the skip social embed link', () => {
    const skipLinkEl = document.querySelector(
      'a[href="#skip-youtube-content-1"]',
    );

    expect(skipLinkEl).toBeInTheDocument();
    expect(skipLinkEl.textContent).toBeTruthy();
    expect(skipLinkEl.textContent).toMatchSnapshot();
  });

  it('I can see the skip social embed link destination', () => {
    const skipLinkDestinationEl = document.getElementById(
      'skip-youtube-content-1',
    );

    expect(skipLinkDestinationEl).toBeInTheDocument();
    expect(skipLinkDestinationEl.textContent).toBeTruthy();
    expect(skipLinkDestinationEl.textContent).toMatchSnapshot();
  });

  // Social Embeds - Rich.
  const hasRichYouTubeEmbed = [
    document.querySelector('iframe[src*="https://www.youtube.com/embed/"]'),
    document.querySelector('amp-youtube'),
  ].find(el => !!el);

  if (hasRichYouTubeEmbed) {
    it('I can see the caption accompanying a rich YouTube embed', () => {
      const figCaptionEl = document.querySelector(
        'a[href="#skip-youtube-content-1"] + figure > figcaption',
      );

      expect(figCaptionEl).toBeInTheDocument();
      expect(figCaptionEl.textContent).toBeTruthy();
      expect(figCaptionEl.textContent).toMatchSnapshot();
    });
  }
};
