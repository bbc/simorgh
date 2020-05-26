export default () => {
  describe('Header', () => {
    describe('Branding', () => {
      const logo = document.querySelector('header svg');

      it('should be in the document', () => {
        expect(logo).toBeInTheDocument();
      });

      it('should have text', () => {
        expect(logo.parentNode.textContent).toBeTruthy();
      });

      it('should match text', () => {
        expect(logo.parentNode.textContent).toMatchSnapshot();
      });
    });

    if (service !== 'scotland') {
      describe('Navigation', () => {
        const navigationItemEls = document.querySelector(
          'header nav ul > li > a',
        );

        it('should be in the document', () => {
          expect(navigationItemEls).toBeInTheDocument();
        });
      });
    }

    describe('Skip to content', () => {
      const skipToContentEl = document.querySelector(
        'header [href="#content"]',
      );

      it('should be in the document', () => {
        expect(skipToContentEl).toBeInTheDocument();
      });
    });
  });
};
