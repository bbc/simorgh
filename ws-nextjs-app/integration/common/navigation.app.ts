export default () => {
  describe('Header', () => {
    it('The header is omitted', () => {
      const header = document.querySelector('header nav [role="banner"]');

      expect(header).not.toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('The footer is omitted', () => {
      const footer = document.querySelector('footer [role="contentinfo"]');

      expect(footer).not.toBeInTheDocument();
    });
  });
};
