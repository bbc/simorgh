export default () => {
  describe('Main heading', () => {
    const mainHeadingEl = document.querySelector('h1');
    const mainHeadingText = mainHeadingEl.textContent;
    const idAttr = mainHeadingEl.getAttribute('id');

    it('should be in the document', () => {
      expect(mainHeadingEl).toBeInTheDocument();
    });

    it('should have id attribute with value equal to "content"', () => {
      expect(idAttr).toEqual('content');
    });

    it('should contain text', () => {
      expect(mainHeadingText).toBeTruthy();
    });

    it('should match text', () => {
      expect(mainHeadingText).toMatchSnapshot();
    });
  });
};
