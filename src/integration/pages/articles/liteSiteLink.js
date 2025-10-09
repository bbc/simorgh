export default () => {
  describe('Lite Site Link', () => {
    it('should be in the document', () => {
      const articleLiteSiteLink = document.querySelector(
        "[data-e2e='article-lite-site-link']",
      );
      expect(articleLiteSiteLink).toBeInTheDocument();
    });
  });
};
