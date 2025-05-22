/**
 * @isInUK yes
 */

export default () => {
  it('Core scripts', () => {
    const ampScripts = [
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
    ];

    const concentRequiredScripts = [
      'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
      'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
    ];

    ampScripts.forEach(ampScript => {
      expect(
        document.querySelector(`head script[src="${ampScript}"]`),
      ).toBeInTheDocument();
    });

    concentRequiredScripts.forEach(ampScript => {
      expect(
        document.querySelector(`head script[src="${ampScript}"]`),
      ).not.toBeInTheDocument();
    });
  });

  it('AMP Geo config', () => {
    expect(
      document.querySelector('body amp-geo > script[type="application/json"]'),
    ).not.toBeInTheDocument();
  });

  it('AMP Consent config', () => {
    expect(
      document.querySelector(
        'body amp-consent > script[type="application/json"]',
      ),
    ).not.toBeInTheDocument();
  });
};
