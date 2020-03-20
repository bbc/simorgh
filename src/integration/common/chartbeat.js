import '@testing-library/jest-dom/extend-expect';
import { renderAsJsDom } from '../render';

export default ({ pageUrl }) => {
  describe('Chartbeat', () => {
    it.skip('should have script with chartbeat source', async () => {
      const { document } = await renderAsJsDom(pageUrl);
      const chartbeatScript = document.querySelector(
        'head > script[src="//static.chartbeat.com/js/chartbeat.js"]',
      );

      expect(chartbeatScript).toBeInTheDocument();
    });
  });
};
