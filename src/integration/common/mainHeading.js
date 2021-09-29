export default () => {
  describe('Main heading', () => {
    const mainHeadingEl = document.querySelector('h1');
    const mainHeadingText = mainHeadingEl.textContent;

    it('should be in the document', () => {
      expect(mainHeadingEl).toBeInTheDocument();
    });

    it('should contain text', () => {
      expect(mainHeadingText).toBeTruthy();
    });

    it('should match text', () => {
      expect(mainHeadingText).toMatchSnapshot();
    });
  });
};
