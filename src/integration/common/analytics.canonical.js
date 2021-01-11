export default () => {
  describe('Analytics', () => {
    it('ATI', () => {
      const noscriptImage = document.querySelector('noscript').innerHTML;

      expect(noscriptImage).toMatch('x8=[simorgh-nojs]');
      expect(noscriptImage).toMatchSnapshot();
    });
  });
};
