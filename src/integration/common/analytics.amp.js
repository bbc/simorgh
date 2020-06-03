export default () => {
  describe('Analytics', () => {
    const analyticsElements = document.querySelectorAll('amp-analytics');

    analyticsElements.forEach(analyticsEl => {
      const type = analyticsEl.getAttribute('type') || 'ATI';

      it(`${type}`, () => {
        const script = analyticsEl.querySelector(
          'script[type="application/json"',
        );
        expect(script).toBeInTheDocument();
        expect(script.textContent).toBeTruthy();

        expect(JSON.parse(script.textContent)).toMatchSnapshot();
      });
    });
  });
};
