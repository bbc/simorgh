export default () => {
  it('AMP ATI analytics', () => {
    expect(
      document.querySelector('amp-analytics script[type="application/json"]')
        .textContent,
    ).toMatchSnapshot();
  });
};
