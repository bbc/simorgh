export default () => {
  describe('canonical Lite Site CTA', () => {
    const liteSiteCTA = document.querySelector("[data-e2e='to-lite-site']");
    it('should be in the document', () => {
      expect(liteSiteCTA).toBeInTheDocument();
    });
    it('should match snapshot', () => {
      expect(liteSiteCTA).toMatchSnapshot();
    });
  });
};
