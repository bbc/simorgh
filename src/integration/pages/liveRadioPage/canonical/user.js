import '@testing-library/jest-dom/extend-expect';
import { renderAsReact } from '../../../render';
import { LIVE_RADIO_PAGE_URL } from '../../../pageUrls';

export default () => {
  describe('User', () => {
    let app;

    beforeEach(async () => {
      app = await renderAsReact(LIVE_RADIO_PAGE_URL);
    });

    it('should render the headline', () => {
      const headlineEl = app.getByText('BBC 코리아 라디오');

      expect(headlineEl).toBeInTheDocument();
    });

    it('should render the summary', () => {
      const summaryEl = app.getByText(
        '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
      );

      expect(summaryEl).toBeInTheDocument();
    });
  });
};
