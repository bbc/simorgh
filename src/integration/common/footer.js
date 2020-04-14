export default () => {
  describe('Footer', () => {
    it('Copyright', () => {
      const footerCopyrightEl = document.querySelector('footer div p');

      expect(footerCopyrightEl).toBeInTheDocument();
      expect(footerCopyrightEl.textContent).toBeTruthy();
      expect(footerCopyrightEl.textContent).toMatchSnapshot();
    });
  });
};
