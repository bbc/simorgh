import '@testing-library/jest-dom/extend-expect';
import renderApp from '../../renderApp';

export default ({ pageUrl, jsonData }) => {
  describe(`User`, () => {
    let app;

    beforeEach(async () => {
      app = await renderApp(pageUrl);
    });

    it('should render the headline', () => {
      const headlineEl = app.getByText(jsonData.promo.name);

      expect(headlineEl).toBeInTheDocument();
    });

    it('should render the summary', () => {
      const summaryEl = app.getByText(jsonData.promo.summary);

      expect(summaryEl).toBeInTheDocument();
    });
  });
};
