export default () => {
  describe('Image with Caption', () => {
    const figureEl = document.querySelector('main figure');

    describe('Image', () => {
      const imageEl = figureEl.querySelector('img, amp-img');
      const src = imageEl.getAttribute('src');

      it('should be in the document', () => {
        expect(imageEl).toBeInTheDocument();
      });

      it('should have a src attribute value', () => {
        expect(src).toBeTruthy();
      });

      it('should match src attribute value', () => {
        expect(src).toMatchSnapshot();
      });
    });

    describe('Caption', () => {
      const imageCaptionEl = figureEl.querySelector('figcaption');
      const imageCaptionText = imageCaptionEl.textContent;

      it('should be in the document', () => {
        expect(imageCaptionEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(imageCaptionText).toBeTruthy();
      });

      it('should match text', () => {
        expect(imageCaptionText).toMatchSnapshot();
      });
    });
  });
};
