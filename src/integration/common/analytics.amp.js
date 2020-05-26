export default () => {
  describe('Analytics', () => {
    it('should match ATI AMP analytics script tag', () => {
      expect(
        JSON.parse(
          document.querySelector(
            'amp-analytics script[type="application/json"]',
          ).textContent,
        ),
      ).toMatchSnapshot();
    });
  });
};
