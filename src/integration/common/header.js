export default () => {
  describe('Header', () => {
    it('I can see the branding', () => {
      const logo = document.querySelector('header svg');

      expect(logo).toBeInTheDocument();
      expect(logo.parentNode.textContent).toBeTruthy();
      expect(logo.parentNode.textContent).toMatchSnapshot();
    });

    it("I can see the offscreen text with product's language code set to English", () => {
      const langCode = document.querySelector(
        'header div span span[lang="en-GB"]',
      );
      expect(langCode).toBeInTheDocument();
    });

    const navigationLinks = document.querySelectorAll('header nav ul > li > a');
    navigationLinks.forEach(navigationLink => {
      it(`I can see a navigation link: ${navigationLink.textContent}`, () => {
        expect(navigationLink).toBeInTheDocument();
        expect(navigationLink.textContent).toBeTruthy();
        expect(navigationLink.getAttribute('href')).toMatchSnapshot();
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
