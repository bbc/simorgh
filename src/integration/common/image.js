export default () => {
  describe('Image', () => {
    it('should be in the document', () => {
      // This selects either a img tag or a noscript tag in the case of a
      // lazy loaded image
      const imageEl = document.querySelector(
        'main figure img, main figure noscript, main figure amp-img',
      );
      expect(imageEl).toBeInTheDocument();
    });
  });

  describe('Image Caption', () => {
    const imageCaptionEl = document.querySelector('main figure figcaption');

    it('should be in the document', () => {
      expect(imageCaptionEl).toBeInTheDocument();
    });

    it('should contain text', () => {
      expect(imageCaptionEl.textContent).toBeTruthy();
    });

    it('should match text', () => {
      expect(imageCaptionEl.textContent).toMatchSnapshot();
    });
  });
};
