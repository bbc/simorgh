export default () => {
  describe('Paragraph', () => {
    const paragraphEl = document.querySelector('p');
    it('should have a paragraph element', () => {
      expect(paragraphEl).toBeInTheDocument();
    });

    it('should match paragraph text', () => {
      expect(paragraphEl.textContent).toMatchSnapshot();
    });
  });
};
