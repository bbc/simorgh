export default () => {
  describe('Inline Link', () => {
    const serviceHasInlineLink = service =>
      service === 'news' || service === 'afaanoromoo';
    it('should have an inline link', () => {
      if (serviceHasInlineLink(service)) {
        const inlineLinkEl = document.querySelector('main a');
        expect(inlineLinkEl).toBeInTheDocument();
      }
    });
  });
};
