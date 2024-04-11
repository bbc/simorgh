export default () => {
  describe('Paragraph', () => {
    const paragraphEl = document.querySelector('p');
    it('should have a paragraph element', () => {
      // eslint-disable-next-line no-console
      console.log('paragraph test is running');
      expect(paragraphEl).toBeInTheDocument();
    });

    it('should match paragraph text', () => {
      expect(paragraphEl.textContent).toMatchSnapshot();
    });
  });
};
