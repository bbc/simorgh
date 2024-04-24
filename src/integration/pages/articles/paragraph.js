export default () => {
  describe('Paragraph', () => {
    const paragraphEl = document.querySelector('main p:nth-child(1)');
    it('should have a paragraph element', () => {
      expect(paragraphEl).toBeInTheDocument();
    });

    it('should match paragraph text', () => {
      expect(paragraphEl.textContent).toMatchSnapshot();
    });
  });
};
