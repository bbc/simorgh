export default () => {
  describe('Footer -', () => {
    it('I can see the footer copyright and external linking text', () => {
      const footerCopyrightEl = document.querySelector('footer div p');
      expect(footerCopyrightEl).toBeInTheDocument();
      expect(footerCopyrightEl.textContent).toBeTruthy();
      expect(footerCopyrightEl.textContent).toMatchSnapshot();
    });

    it('I can click the external link', () => {
      const externalLinkEl = document.querySelector('footer div p a');
      expect(externalLinkEl).toBeInTheDocument();
      expect(externalLinkEl.getAttribute('href')).toMatchSnapshot();
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

    const footerLinks = document.querySelectorAll('footer ul > li > a');
    footerLinks.forEach((link) => {
      describe('I can see a link', () => {
        beforeEach(() => {
          expect(link).toBeInTheDocument();
        });
        it('with title', () => {
          expect(link.textContent).toBeTruthy();
          expect(link.textContent).toMatchSnapshot();
        });
        it('with url', () => {
          expect(link.getAttribute('href')).toMatchSnapshot();
        });
      });
    });
  });
};
