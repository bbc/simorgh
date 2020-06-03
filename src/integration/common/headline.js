export default () => {
  describe('Headline', () => {
    const headlineEl = document.querySelector('h1');
    const headlineText = headlineEl.textContent;
    const idAttr = headlineEl.getAttribute('id');

    it('should be in the document', () => {
      expect(headlineEl).toBeInTheDocument();
    });

    it('should have id attribute with value equal to "content"', () => {
      expect(idAttr).toEqual('content');
    });

    it('should contain text', () => {
      expect(headlineText).toBeTruthy();
    });

    it('should match text', () => {
      expect(headlineText).toMatchSnapshot();
    });
  });
};
