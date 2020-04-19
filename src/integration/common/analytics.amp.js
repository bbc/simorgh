export default () => {
  describe('Analytics', () => {
    it('ATI', () => {
      expect(
        document.querySelector('amp-analytics script[type="application/json"]')
          .textContent,
      ).toMatch('https://logws1363.ati-host.net?');
    });
  });
};
