export default () => {
  describe('Footer lang code', () => {
    const footer = document.querySelector('footer');

    if (footer) {
      it('should be in document', () => {
        expect(footer).toBeInTheDocument();
      });

      const langAttribute = footer.getAttribute('lang');

      it('should contain text', () => {
        expect(langAttribute).toBeTruthy();
      });

      it('should match text', () => {
        expect(langAttribute).toMatchSnapshot();
      });
    }
  });
};
