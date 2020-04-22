export default () => {
  describe('Header', () => {
    it('I can see the branding', () => {
      const logo = document.querySelector('header svg');

      expect(logo).toBeInTheDocument();
      expect(logo.parentNode.textContent).toBeTruthy();
      expect(logo.parentNode.textContent).toMatchSnapshot();
    });

    it('I can see the navigation', () => {
      const navigationItemEls = document.querySelector(
        'header nav ul > li > a',
      );
      expect(navigationItemEls).toBeInTheDocument();
    });

    const navigationLinks = document.querySelectorAll('header nav a');
    navigationLinks.forEach(navigationLink => {
      it('I can see a navigation link', () => {
        expect(navigationLink).toBeInTheDocument();
        expect(navigationLink.textContent).toBeTruthy();
        expect(navigationLink.getAttribute('href')).toMatchSnapshot(
          navigationLink.textContent,
        );
      });
    });

    it('I can see a skip to content link', () => {
      const skipToContentEl = document.querySelector(
        'header [href="#content"]',
      );

      expect(skipToContentEl).toBeInTheDocument();
    });
  });
};
