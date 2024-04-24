export default () => {
  describe('Image Copyright Non BBC', () => {
    const copyrightTextEl = document.querySelector(
      'main figure span:nth-child(2)',
    );
    it('should be in the document', () => {
      expect(copyrightTextEl).toBeInTheDocument();
    });

    it('should have the right text content', () => {
      expect(copyrightTextEl).toHaveTextContent('Getty Images');
    });

    it('should match snapshot', () => {
      expect(copyrightTextEl).toMatchSnapshot();
    });
  });
};
