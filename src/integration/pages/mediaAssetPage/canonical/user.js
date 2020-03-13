import '@testing-library/jest-dom/extend-expect';
import renderApp from '../../../renderApp';
import { MEDIA_ASSET_PAGE_URL } from '../../../pageUrls';

export default () => {
  describe('User', () => {
    let app;

    beforeEach(async () => {
      app = await renderApp(MEDIA_ASSET_PAGE_URL);
    });

    it('should render the headline', () => {
      const headlineEl = app.getAllByText(
        'Konflik Iran-AS: Lima penyebab krisis tak kunjung usai',
      );

      expect(headlineEl).toBeInTheDocument();
    });
  });
};
