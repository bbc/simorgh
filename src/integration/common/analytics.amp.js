export default () => {
  describe('Analytics', () => {
    const analyticsElements = Array.from(
      document.querySelectorAll('amp-analytics'),
    );

    analyticsElements.forEach(analyticsEl => {
      const type = analyticsEl.getAttribute('type') || 'ATI';

      it(`${type}`, () => {
        const script = analyticsEl.querySelector(
          'script[type="application/json"',
        );
        expect(script).toBeInTheDocument();
        expect(script.textContent).toBeTruthy();

        const textContent = JSON.parse(script.textContent);

        if (type === 'ATI') {
          const {
            requests: { base, pageview },
          } = textContent;

          // eslint-disable-next-line no-template-curly-in-string
          const atiUrl = new URL(pageview.replace('${base}', base));

          const params = [];
          // eslint-disable-next-line no-restricted-syntax
          for (const [key, value] of atiUrl.searchParams.entries()) {
            params.push({ [key]: value });
          }

          textContent.requests.pageview = params;
        }

        expect(textContent).toMatchSnapshot();
      });
    });
  });
};
