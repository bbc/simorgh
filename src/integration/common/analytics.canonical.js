export default () => {
  describe('Analytics', () => {
    it('should match ATI noscript tag', () => {
      const noscriptImage = document.querySelector('noscript').innerHTML;

      expect(noscriptImage).toMatchSnapshot();
    });
  });
};
