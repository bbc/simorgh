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

      const CHARTBEAT_NOT_CONFIGURED = 'Chartbeat not configured';

      if (chartbeatScript) {
        const chartbeatConfig =
          document.querySelector(
            'html > head > script[async="true"][type="text/javascript"]',
          )?.innerText || CHARTBEAT_NOT_CONFIGURED;

        expect(chartbeatConfig).toMatchSnapshot();
      } else {
        expect(CHARTBEAT_NOT_CONFIGURED).toMatchSnapshot();
      }
    });
  });
};
