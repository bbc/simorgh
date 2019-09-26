import checkExternalIdOverrides from './helper';

describe('LiveRadio helper override externalId', () => {
  it('should override bbc_oromo_radio to bbc_afaanormoo_radio', () => {
    const externalId = 'bbc_oromo_radio';
    expect(checkExternalIdOverrides(externalId)).toBe('bbc_afaanoromoo_radio');
  });

  it('should not override anything other than bbc_afaanoromoo_radio', () => {
    let externalId = 'foobar';
    expect(checkExternalIdOverrides(externalId)).toBe('foobar');

    externalId = 'bbc_korean_radio';
    expect(checkExternalIdOverrides(externalId)).toBe('bbc_korean_radio');

    externalId = 'do_not_override_me';
    expect(checkExternalIdOverrides(externalId)).toBe('do_not_override_me');
  });
});
