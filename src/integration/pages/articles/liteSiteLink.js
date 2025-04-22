import fetchToggles from '../../utils/fetchToggles';

const isArticleLiteSiteLinkEnabled = async service => {
  const toggles = await fetchToggles(service);

  return toggles?.articleLiteSiteLink?.enabled;
};

export default () => {
  describe('Lite Site Link', service => {
    const articleLiteSiteLink = document.querySelector(
      "[data-e2e='article-lite-site-link']",
    );

    it('should be in the document if toggle enabled', async () => {
      const isLiteSiteLinkEnabled = await isArticleLiteSiteLinkEnabled(service);

      if (isLiteSiteLinkEnabled) {
        expect(articleLiteSiteLink).toBeInTheDocument();
      } else {
        expect(articleLiteSiteLink).not.toBeInTheDocument();
      }
    });
  });
};
