/**
 * @isInUK yes
 */

export default () => {
  it('Core scripts', () => {
    const ampScripts = [
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
      'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
    ];

    ampScripts.forEach(ampScript => {
      expect(
        document.querySelector(`head script[src="${ampScript}"]`),
      ).toBeInTheDocument();
    });
  });

  it('AMP Geo config', () => {
    const ampGeoScript = document.querySelector(
      'body amp-geo > script[type="application/json"]',
    );
    expect(ampGeoScript).toBeInTheDocument();
    expect(ampGeoScript?.textContent).toMatchSnapshot();
  });
};
