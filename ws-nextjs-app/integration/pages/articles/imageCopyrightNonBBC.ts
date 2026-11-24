export default () => {
  describe('Image Copyright Non BBC', () => {
    const copyrightTextEl = document.querySelector(
      'main figure span:nth-child(2)',
    );
    it('should be in the document', () => {
      expect(copyrightTextEl).toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(copyrightTextEl).toMatchSnapshot();
    });
  });
};
