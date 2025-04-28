import isToggleEnabled from '../../utils/isToggleEnabled';

export default service => {
  describe('Lite Site Link', () => {
    const articleLiteSiteLink = document.querySelector(
      "[data-e2e='article-lite-site-link']",
    );

    it('should be in the document if toggle enabled', async () => {
      const isLiteSiteLinkEnabled = await isToggleEnabled({
        service,
        toggleName: 'articleLiteSiteLink',
      });

      if (isLiteSiteLinkEnabled) {
        expect(articleLiteSiteLink).toBeInTheDocument();
      } else {
        expect(articleLiteSiteLink).not.toBeInTheDocument();
      }
    });
  });
};
