export default () => {
  describe('Ads', () => {
    const ads = document.querySelectorAll('[id^=dotcom]');

    ads.forEach(ad => {
      it('should be displayed', () => {
        expect(ad).toBeInTheDocument();
      });
      it('should have the following properties', () => {
        expect(ad).toMatchSnapshot();
      });
    });

    it('dotcom scripts should be loaded', () => {
      const adScript = document.querySelector(
        "script[src*='dotcom-bootstrap.js']",
      );
      expect(adScript).toBeInTheDocument();
    });

    it('dotcom config should be loaded', () => {
      const scripts = document.querySelectorAll(
        "script[type='text/javascript']",
      );

      let adConfig;

      // eslint-disable-next-line no-restricted-syntax
      for (const script of scripts) {
        if (script.innerHTML.includes('pageAds: true')) {
          adConfig = script;
        }
      }

      expect(adConfig).toBeInTheDocument();
    });
  });
};
