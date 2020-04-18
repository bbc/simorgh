export default () => {
  describe('Footer -', () => {
    it('I can see the footer copyright and external linking text', () => {
      const footerCopyrightEl = document.querySelector('footer div p');

      expect(footerCopyrightEl).toBeInTheDocument();
      expect(footerCopyrightEl.textContent).toBeTruthy();
      expect(footerCopyrightEl.textContent).toMatchSnapshot();
    });

    const brandingEl = document.querySelector('footer svg');

    it('I can see the BBC branding', () => {
      expect(brandingEl).toBeInTheDocument();
    });

    it('I can click on the BBC branding and it would take me to the homepage', () => {
      const brandingLinkEl = brandingEl.parentNode;
      const brandingImageEl = brandingLinkEl.querySelector('svg');

      expect(brandingLinkEl.tagName).toEqual('A');
      expect(brandingLinkEl.getAttribute('href')).toMatchSnapshot();
      expect(brandingImageEl).toBeInTheDocument();
    });

    it('I can see site wide links', () => {
      const siteLinkEls = document.querySelectorAll('footer ul > li > a');

      siteLinkEls.forEach((siteLink) => {
        expect(siteLink).toBeInTheDocument();
        expect(siteLink.getAttribute('href')).toMatchSnapshot();
        expect(siteLink.textContent).toBeTruthy();
        expect(siteLink.textContent).toMatchSnapshot();
      });
    });
  });
};
