import deriveVariant from '.';

describe('deriveVariant', () => {
  it('returns the variant if it is valid structure', () => {
    const variantParams = ['trad'];
    const result = deriveVariant(variantParams);
    expect(result).toBe('trad');
  });

  it('returns just the variant if it contains an extension', () => {
    const variantParams = ['trad.lite'];
    const result = deriveVariant(variantParams);
    expect(result).toBe('trad');
  });

  it('returns the variant if there are multiple parameters passed', () => {
    const variantParams = ['trad', 'param2', 'param3'];
    const result = deriveVariant(variantParams);
    expect(result).toBe('trad');
  });

  it('returns the variant if there are multiple parameters passed with extensions', () => {
    const variantParams = ['trad.lite', 'param2.app', 'param3.amp'];
    const result = deriveVariant(variantParams);
    expect(result).toBe('trad');
  });

  it('returns null if the input is null', () => {
    const variant = null;
    const result = deriveVariant(variant);
    expect(result).toBe(null);
  });

  it('returns null if the input is undefined', () => {
    const variant = undefined;
    const result = deriveVariant(variant);
    expect(result).toBe(null);
  });
});
