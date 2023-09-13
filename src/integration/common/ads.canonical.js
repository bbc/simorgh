export default () => {
  describe('Ads', () => {
    const ads = document.querySelectorAll('[id^=dotcom-slot]');

    ads.forEach(ad => {
      it('should be displayed', () => {
        expect(ad).toBeInTheDocument();
      });
      it('should have the following properties', () => {
        expect(ad.innerHTML).toMatchSnapshot();
      });
    });
  });
};
