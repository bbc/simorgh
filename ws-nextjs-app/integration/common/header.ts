export default service => {
  describe('Header', () => {
    it('I can see the branding', () => {
      const logo = document.getElementById('brandSvgHeader');

      expect(logo).toBeInTheDocument();

      const parentElement = logo?.parentNode as Element | null;

      expect(parentElement).toBeTruthy();

      if (!logo || !parentElement) return;

      const brandingTextElement = document.getElementById('BrandLink-topPage');
      expect(brandingTextElement?.textContent).toBeTruthy();

      const svg = logo.querySelector('g path');
      const brandText = brandingTextElement?.textContent ?? '';

      expect({
        svg,
        brandLink: brandText,
      }).toMatchSnapshot();
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
        const navList = document.querySelector('header nav [role="list"]');
        const navigationLinks = Array.from(
          navList?.querySelectorAll('a') ?? [],
        );

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
