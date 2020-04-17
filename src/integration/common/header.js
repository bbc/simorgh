export default () => {
  describe('Header', () => {
    it('I can see the branding', () => {
      const logo = document.querySelector('header svg');

      expect(logo).toBeInTheDocument();
      expect(logo.parentNode.textContent).toBeTruthy();
      expect(logo.parentNode.textContent).toMatchSnapshot();
    });
  });
};
