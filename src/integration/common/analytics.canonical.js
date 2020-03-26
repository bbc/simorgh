export default () => {
  it('I can see the data collected with ATI analytics', () => {
    process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';

    const noscriptImage = canonical.document.querySelector('noscript img');

    expect(noscriptImage.tagName).toEqual('IMG');
    expect(noscriptImage.getAttribute('width')).toEqual('1px');
    expect(noscriptImage.getAttribute('height')).toEqual('1px');
    expect(noscriptImage.getAttribute('src')).toMatch(
      'https://logws1363.ati-host.net?',
    );
  });
};
