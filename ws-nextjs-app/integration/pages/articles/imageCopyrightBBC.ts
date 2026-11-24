export default () => {
  describe('Image Copyright BBC', () => {
    const copyrightTextEl = document.querySelector('main figure p');
    it('should not be in the document', () => {
      expect(copyrightTextEl).not.toBeInTheDocument();
    });
  });
};
