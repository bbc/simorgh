export default () => {
  describe('SEO', () => {
    it('AMP attribute should be in the document', () => {
      const htmlEl = document.querySelector('html');

      expect(htmlEl.hasAttribute('amp')).toBeTruthy();
    });
  });
};
