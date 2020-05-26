export default () => {
  describe('Footer', () => {
    describe('Branding', () => {
      const logo = document.querySelector('footer svg');

      it('should be in the document', () => {
        expect(logo).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(logo.parentNode.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(logo.parentNode.textContent).toMatchSnapshot();
      });

      it('should be wrapped in anchor with href that matches value', () => {
        expect(logo.parentNode.tagName).toEqual('A');
        expect(logo.parentNode.getAttribute('href')).toMatchSnapshot();
      });
    });

    describe('Copyright and external linking text', () => {
      const footerCopyrightEl = document.querySelector('footer div p');

      it('should be in the document', () => {
        expect(footerCopyrightEl).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(footerCopyrightEl.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(footerCopyrightEl.textContent).toMatchSnapshot();
      });
    });
  });
};
