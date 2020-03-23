const { amp } = global;

export default () => {
  it('AMP analytics config is loaded', () => {
    expect(
      amp.document.querySelector(
        'amp-analytics script[type="application/json"]',
      ).textContent,
    ).toMatch('https://logws1363.ati-host.net?');
  });
};
