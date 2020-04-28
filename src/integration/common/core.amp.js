export default () => {
  it('Core scripts', () => {
    const ampScripts = [
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
      'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
      'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
    ];

    ampScripts.forEach(ampScript => {
      expect(
        document.querySelector(`head script[src="${ampScript}"]`),
      ).toBeInTheDocument();
    });
  });

  it('AMP Geo config', () => {
    expect(
      JSON.parse(
        document.querySelector('body amp-geo > script[type="application/json"]')
          .textContent,
      ),
    ).toMatchSnapshot();
  });

  it('AMP Consent config', () => {
    expect(
      JSON.parse(
        document.querySelector(
          'body amp-consent > script[type="application/json"]',
        ).textContent,
      ),
    ).toMatchSnapshot();
  });

  it('AMP attribute is set', () => {
    const htmlEl = document.querySelector('html');

    expect(htmlEl.getAttribute('amp')).not.toBeNull();
  });
};
