export default () => {
  describe('Analytics', () => {
    it('ATI', () => {
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
