/* eslint-disable no-restricted-syntax */
export default () => {
  describe('Ads', () => {
    const ads = document.querySelectorAll('amp-ad');

    for (const ad of ads) {
      it('should be displayed', () => {
        expect(ad).toBeInTheDocument();
      });
      it('should have the following properties', () => {
        expect(ad).toMatchSnapshot();
      });
    }
  });
};
