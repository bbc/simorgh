export default () => {
  describe('Ads', () => {
    const ads = document.querySelectorAll('amp-ad');

    ads.forEach(ad => {
      it('should be displayed', () => {
        expect(ad).toBeInTheDocument();
      });
      it('should have the following properties', () => {
        expect(ad).toMatchSnapshot();
      });
    });
  });
};
