export default () => {
  describe('Image Copyright BBC', () => {
    const copyrightTextEl = document.querySelector(
      'main figure span:nth-child(2)',
    );
    it('should not be in the document', () => {
      expect(copyrightTextEl).not.toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(copyrightTextEl).toMatchSnapshot();
    });
  });
};
