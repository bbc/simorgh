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

    it('scripts should be loaded', () => {
      const adScript = document.querySelector(
        "script[src*='dotcom-bootstrap.js']",
      );
      expect(adScript).toBeInTheDocument();
    });
  });
};
