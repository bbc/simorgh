export default () => {
  describe('Footer', () => {
    it('I can see the BBC branding', () => {
      const brandingEl = document.querySelector('footer svg');

      expect(brandingEl).toBeInTheDocument();
    });

    it('I can click on the BBC branding and it would take me to the homepage', () => {
      const brandingEl = document.querySelector('footer svg');
      const brandingLinkEl = brandingEl.parentNode;
      const brandingImageEl = brandingLinkEl.querySelector('svg');

      expect(brandingLinkEl.tagName).toEqual('A');
      expect(brandingLinkEl.getAttribute('href')).toMatchSnapshot();
      expect(brandingImageEl).toBeInTheDocument();
    });

    describe('Anchors', () => {
      const footerAnchors = document.querySelectorAll('footer a');

      footerAnchors.forEach(footerAnchor => {
        const anchorText = footerAnchor.textContent;
        const anchorUrl = footerAnchor.getAttribute('href');

        it('should be in the document', () => {
          expect(footerAnchor).toBeInTheDocument();
        });

        it('should contain text', () => {
          expect(anchorText).toBeTruthy();
        });

        it('should match text and url', () => {
          expect({
            text: anchorText,
            url: anchorUrl,
          }).toMatchSnapshot();
        });
      });
    });

    describe('Paragraphs', () => {
      const footerParagraphs = document.querySelectorAll('footer div p');

      footerParagraphs.forEach(footerParagraph => {
        it('should be in the document', () => {
          expect(footerParagraph).toBeInTheDocument();
        });

        it('should contain text', () => {
          expect(footerParagraph.textContent).toBeTruthy();
        });

        it('should match text', () => {
          expect(footerParagraph.textContent).toMatchSnapshot();
        });
      });
    });
  });
};
