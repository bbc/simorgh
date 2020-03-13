import '@testing-library/jest-dom/extend-expect';
import renderApp from '../../renderApp';

export default ({ pageUrl, copyrightText, brandingText, brandingLink }) => {
  describe('Footer', () => {
    let app;

    beforeEach(async () => {
      app = await renderApp(pageUrl);
    });

    describe('User tests', () => {
      it('should render footer copyright text', () => {
        const footerEl = document.querySelector('footer');
        const copyrightEl = app
          .within(footerEl)
          .getByTextSpecial(copyrightText);

        expect(copyrightEl).toBeInTheDocument();
      });

      it('should render BBC branding', () => {
        const footerEl = document.querySelector('footer');
        const brandingEl = app.within(footerEl).getByTextSpecial(brandingText);

        expect(brandingEl).toBeInTheDocument();
      });

      it('should wrap BBC branding with an anchor that links to the homepage', () => {
        const footerEl = document.querySelector('footer');
        const brandingEl = app.within(footerEl).getByTextSpecial(brandingText);
        const brandingLinkEl = brandingEl.parentNode;
        const brandingImageEl = brandingLinkEl.querySelector('svg');

        expect(brandingLinkEl.tagName).toEqual('A');
        expect(brandingLinkEl.getAttribute('href')).toEqual(brandingLink);
        expect(brandingImageEl).toBeInTheDocument();
      });
    });
  });
};
