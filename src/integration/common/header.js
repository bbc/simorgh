export default ({ skipToContentText }) => {
  [amp, canonical].forEach(page => {
    describe(`And using ${page.platform}`, () => {
      it('I can see the BBC branding', () => {
        const brandingEl = page.document.querySelector('footer svg');

        expect(brandingEl).toBeInTheDocument();
      });

      it('I can see the navigation', () => {
        const navigationItemEls = page.document.querySelector(
          'header nav ul > li > a',
        );

        expect(navigationItemEls).toBeInTheDocument();
      });

      it('I can see a skip to content link', () => {
        const skipToContentEl = page.getByText(skipToContentText);

        expect(skipToContentEl).toBeInTheDocument();
      });
    });
  });
};

// TODO decide which of these AMP/Canonical header tests from Cypress to implement
// it("should have offscreen text with product's language code set to English", () => {});
// it('should not set the language code for localised name', () => {});
// it('should not have a language attribute if no serviceLocalizedName set', () => {});
// it('should show dropdown menu and hide scrollable menu when menu button is clicked', () => {}); // this one should be a Cypress test
