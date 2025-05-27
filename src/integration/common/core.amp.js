/**
 * @isInUK yes
 */

export default () => {
  it('Core scripts', () => {
    const ampScripts = [
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
    ];

    ampScripts.forEach(ampScript => {
      expect(
        document.querySelector(`head script[src="${ampScript}"]`),
      ).toBeInTheDocument();
    });
  });
};
