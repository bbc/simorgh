import shouldAllowAdvertising from './shouldAllowAdvertising';

describe('Preroll ads are allowed', () => {
  const expectedValue = true;

  it('xxx', () => {
    const allowAdvertising = shouldAllowAdvertising({
      isEmbedabble: false,
      isOutsideUk: true,
      allowGlobal: true,
      allowService: true,
      assetType: 'cps',
      allowAsset: true,
      assetDuration: 30,
    });

    expect(allowAdvertising).toBe(expectedValue);
  });
});

describe('Preroll ads are NOT allowed', () => {
  const expectedValue = false;

  it('xxx', () => {
    const allowAdvertising = shouldAllowAdvertising({
      isEmbedabble: true,
      isOutsideUk: true,
      allowGlobal: true,
      allowService: true,
      assetType: 'cps',
      allowAsset: true,
      assetDuration: 30,
    });

    expect(allowAdvertising).toBe(expectedValue);
  });

  it('xxx', () => {
    const allowAdvertising = shouldAllowAdvertising({
      isEmbedabble: true,
      isOutsideUk: false,
      allowGlobal: true,
      allowService: true,
      assetType: 'cps',
      allowAsset: true,
      assetDuration: 30,
    });

    expect(allowAdvertising).toBe(expectedValue);
  });

  it('xxx', () => {
    const allowAdvertising = shouldAllowAdvertising({
      isEmbedabble: false,
      isOutsideUk: true,
      allowGlobal: false,
      allowService: true,
      assetType: 'cps',
      allowAsset: true,
      assetDuration: 30,
    });

    expect(allowAdvertising).toBe(expectedValue);
  });

  it('xxx', () => {
    const allowAdvertising = shouldAllowAdvertising({
      isEmbedabble: false,
      isOutsideUk: true,
      allowGlobal: true,
      allowService: false,
      assetType: 'cps',
      allowAsset: true,
      assetDuration: 30,
    });

    expect(allowAdvertising).toBe(expectedValue);
  });

  it('xxx', () => {
    const allowAdvertising = shouldAllowAdvertising({
      isEmbedabble: false,
      isOutsideUk: true,
      allowGlobal: true,
      allowService: true,
      assetType: 'cps',
      allowAsset: false,
      assetDuration: 30,
    });

    expect(allowAdvertising).toBe(expectedValue);
  });

  it('xxx', () => {
    const allowAdvertising = shouldAllowAdvertising({
      isEmbedabble: false,
      isOutsideUk: true,
      allowGlobal: true,
      allowService: true,
      assetType: 'cps',
      allowAsset: true,
      assetDuration: 29,
    });

    expect(allowAdvertising).toBe(expectedValue);
  });

  it('xxx', () => {
    const allowAdvertising = shouldAllowAdvertising({
      isEmbedabble: false,
      isOutsideUk: true,
      allowGlobal: true,
      allowService: true,
      assetType: 'cps',
      allowAsset: true,
      assetDuration: 29,
    });

    expect(allowAdvertising).toBe(expectedValue);
  });
});
