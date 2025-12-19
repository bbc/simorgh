export default () => {
  describe('Inline Link', () => {
    it('should have an inline link', () => {
      const inlineLinkEl = document.querySelector('main a');
      expect(inlineLinkEl).toBeInTheDocument();
    });
  });
};
