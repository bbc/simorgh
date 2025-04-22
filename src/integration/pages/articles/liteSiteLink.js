export default () => {
  describe('Article Lite Site Link', () => {
    const liteSiteCTA = document.querySelector(
      "[data-e2e='article-lite-site-link']",
    );
    it('should be in the document', () => {
      expect(liteSiteCTA).toBeInTheDocument();
    });
    it('should match snapshot', () => {
      expect(liteSiteCTA).toMatchSnapshot();
    });
  });
};
