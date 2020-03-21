const { amp, canonical } = global;

export default ({ copyrightText, brandingLink }) => {
  [amp, canonical].forEach(page => {
    it('I can see the footer copyright text', () => {
      const copyrightEl = page.getByTextMultiElement(copyrightText);

      expect(copyrightEl).toBeInTheDocument();
    });

    it('I can see the BBC branding', () => {
      const brandingEl = page.document.querySelector('footer svg');

      expect(brandingEl).toBeInTheDocument();
    });

    it('I can click on the BBC branding and it would take me to the homepage', () => {
      const brandingEl = page.document.querySelector('footer svg');
      const brandingLinkEl = brandingEl.parentNode;
      const brandingImageEl = brandingLinkEl.querySelector('svg');

      expect(brandingLinkEl.tagName).toEqual('A');
      expect(brandingLinkEl.getAttribute('href')).toEqual(brandingLink);
      expect(brandingImageEl).toBeInTheDocument();
    });
  });
};
