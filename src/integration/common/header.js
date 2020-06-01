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

    it('I can see the navigation', () => {
      const navigationItemATag = document.querySelector(
        'header nav ul > li > a',
      );

      expect(navigationItemATag).toBeInTheDocument();
      expect(navigationItemATag.getAttribute('href')).toBeTruthy();
      expect(navigationItemATag.textContent).toBeTruthy();
      expect(navigationItemATag.textContent).toMatchSnapshot();
    });

    it('I can see a skip to content link', () => {
      const skipToContentEl = document.querySelector(
        'header [href="#content"]',
      );

      expect(skipToContentEl).toBeInTheDocument();
    });
  });
};
