export default () => {
  describe('SEO', () => {
    it('AMP attribute should be in the document', () => {
      const htmlEl = document.querySelector('html');
      const ampAttribute = htmlEl.getAttribute('amp');

      expect(ampAttribute).toBeInTheDocument();
    });
  });
};
