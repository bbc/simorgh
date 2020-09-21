export default () => {
  describe('SEO', () => {
    it('AMP attribute should contain text', () => {
      const htmlEl = document.querySelector('html');
      const ampAttribute = htmlEl.getAttribute('amp');

      expect(ampAttribute).toBeTruthy();
    });
  });
};
