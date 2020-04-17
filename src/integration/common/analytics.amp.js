export default () => {
  describe('AMP analytics', () => {
    it('ATI', () => {
      expect(
        document.querySelector('amp-analytics script[type="application/json"]')
          .textContent,
      ).toMatchSnapshot();
    });
  });
};
