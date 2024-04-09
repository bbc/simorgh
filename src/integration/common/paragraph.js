export default () => {
  describe('Paragraph', () => {
    it('should have a paragraph element', () => {
      const paragraphEl = document.querySelector('p');
      // eslint-disable-next-line no-console
      console.log('paragraph test is running');
      expect(paragraphEl).toBeInTheDocument();
    });
  });
};
