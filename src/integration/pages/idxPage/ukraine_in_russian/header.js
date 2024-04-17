export default () => {
  describe('Header lang code', () => {
    const header = document.querySelector('header');

    if (header) {
      it('should be in document', () => {
        expect(header).toBeInTheDocument();
      });

      const langAttribute = header.getAttribute('lang');

      it('should contain text', () => {
        expect(langAttribute).toBeTruthy();
      });

      it('should match text', () => {
        expect(langAttribute).toMatchSnapshot();
      });
    }
  });
};
