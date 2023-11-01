export default service => {
  describe('Header', () => {
    it('I can see the branding', () => {
      const logo = document.getElementById('brandSvgHeader');

      expect(logo).toBeInTheDocument();
      expect(logo.parentNode.textContent).toBeTruthy();
      expect(logo.parentNode.textContent).toMatchSnapshot();
    });

    if (service !== 'news' && service !== 'scotland') {
      it("I can see the offscreen text with product's language code set to English", () => {
        const langCode = document.querySelector(
          'header div span span[lang="en-GB"]',
        );
        expect(langCode).toBeInTheDocument();
      });
    }

    if (service !== 'scotland') {
      describe('Navigation link', () => {
        const navigationLinks = document
          .querySelector('header nav [role="list"]')
          .querySelectorAll('a');

        navigationLinks.forEach(navigationLink => {
          const linkText = navigationLink.textContent;
          const linkUrl = navigationLink.getAttribute('href');

          it('should be in the document', () => {
            expect(navigationLink).toBeInTheDocument();
          });

          it('should contain text', () => {
            expect(linkText).toBeTruthy();
          });

          it('should match text and url', () => {
            expect({
              text: linkText,
              url: linkUrl,
            }).toMatchSnapshot();
          });
        });
      });
    }

    it('I can see a skip to content link', () => {
      const skipToContentEl = document.querySelector(
        'header [href="#content"]',
      );

      expect(skipToContentEl).toBeInTheDocument();
    });
  });
};
