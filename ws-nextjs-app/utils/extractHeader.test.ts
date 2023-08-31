import extractHeaders from './extractHeader';

describe('extractHeader', () => {
  it(`sets isUK to true when 'x-bbc-edge-isuk' is set to yes`, () => {
    const actual = extractHeaders({
      'x-bbc-edge-isuk': 'yes',
    });
    expect(actual).toStrictEqual({ isUK: true });
  });

  it(`sets isUK to true when 'x-country' is set to 'gb'`, () => {
    const actual = extractHeaders({
      'x-country': 'gb',
    });
    expect(actual).toStrictEqual({ isUK: true });
  });
});
