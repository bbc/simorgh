import { runCommonCrossPlatformTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();

  // These service's urls don't have images with captions. Need to find better examples
  if (!['zhongwen', 'uzbek', 'serbian', 'ukchina'].includes(service)) {
    it('I can see an image with a caption', () => {
      const imageEl = document.querySelector(
        'main figure img, main figure amp-img',
      );
      const imageCaptionEl = document.querySelector('main figure figcaption');

      expect(imageEl).toBeInTheDocument();
      expect(imageEl.getAttribute('src')).toBeTruthy();
      expect(imageEl.getAttribute('src')).toMatchSnapshot();

      expect(imageCaptionEl).toBeInTheDocument();
      expect(imageCaptionEl.textContent).toBeTruthy();
      expect(imageCaptionEl.textContent).toMatchSnapshot();
    });
  }
};
