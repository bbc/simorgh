export default () => {
  describe('Analytics', () => {
    it('ATI', () => {
      const noscriptImage = document.querySelector('noscript').innerHTML;

      expect(noscriptImage).toMatch('x8=[simorgh-nojs]');
      expect(noscriptImage).toMatchSnapshot();
    });

    it('Chartbeat', () => {
      const chartbeatScript = document.querySelector(
        'html > head > script[src="//static.chartbeat.com/js/chartbeat.js"]',
      );

      if (chartbeatScript) {
        const chartbeatConfig =
          document.querySelector(
            'html > head > script[async="true"][type="text/javascript"]',
          )?.innerText || 'Chartbeat not configured';

        expect(chartbeatConfig).toMatchSnapshot();
      }
    });
  });
};
