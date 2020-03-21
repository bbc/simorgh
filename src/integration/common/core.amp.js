const { amp } = global;

export default () => {
  it('Core AMP scripts are loaded in the head of the document', () => {
    const ampScripts = [
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
      'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
      'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
    ];

    ampScripts.forEach(ampScript => {
      expect(
        amp.document.querySelector(`head script[src="${ampScript}"]`),
      ).toBeInTheDocument();
    });
  });
};
