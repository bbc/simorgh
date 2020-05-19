export default () => {
  describe('Analytics', () => {
    it('ATI', () => {
      const noscriptImage = document.querySelector('noscript').innerHTML;

      expect(noscriptImage).toMatchSnapshot();
    });
  });
};
