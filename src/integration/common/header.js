export default () => {
  describe('Header -', () => {
    it('I can see the branding', () => {
      const logo = document.querySelector('header svg');

      expect(logo).toBeInTheDocument();
      expect(logo.parentNode.textContent).toBeTruthy();
      expect(logo.parentNode.textContent).toMatchSnapshot();
    });

    const navigationItemEls = document.querySelector('header nav ul > li > a');

    if (navigationItemEls) {
      it('I can see the navigation', () => {
        expect(navigationItemEls).toBeInTheDocument();
      });
    }

    const skipToContentEl = document.querySelector('header [href="#content"]');

    if (skipToContentEl) {
      it('I can see a skip to content link', () => {
        expect(skipToContentEl).toBeInTheDocument();
      });
    }
  });
};
