import '@testing-library/jest-dom/extend-expect';
import { renderAsReact } from '../../render';

export default ({ pageUrl, copyrightText, brandingText, brandingLink }) => {
  describe('Footer', () => {
    let app;

    beforeEach(async () => {
      app = await renderAsReact(pageUrl);
    });

    it('I can see the footer copyright text', () => {
      const footerEl = document.querySelector('footer');
      const copyrightEl = app.within(footerEl).getByTextSpecial(copyrightText);

      expect(copyrightEl).toBeInTheDocument();
    });

    it('I can see the BBC branding', () => {
      const footerEl = document.querySelector('footer');
      const brandingEl = app.within(footerEl).getByTextSpecial(brandingText);

      expect(brandingEl).toBeInTheDocument();
    });

    it('I can click on the BBC branding and it would take me to the homepage', () => {
      const footerEl = document.querySelector('footer');
      const brandingEl = app.within(footerEl).getByTextSpecial(brandingText);
      const brandingLinkEl = brandingEl.parentNode;
      const brandingImageEl = brandingLinkEl.querySelector('svg');

      expect(brandingLinkEl.tagName).toEqual('A');
      expect(brandingLinkEl.getAttribute('href')).toEqual(brandingLink);
      expect(brandingImageEl).toBeInTheDocument();
    });
  });
};
