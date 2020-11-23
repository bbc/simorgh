import getMasterbrand from '.';

describe('getMasterbrand', () => {
  const brand = 'brand';
  const assetId = 'liveradio';

  it('should find value', () => {
    const masterbrand = getMasterbrand('liveradio', {
      masterBrand: {
        liveradio: brand,
      },
    });
    expect(masterbrand).toBe(brand);
  });

  it('should not find value and use external id', () => {
    const masterbrand = getMasterbrand(assetId, {
      masterBrand: {
        nothing: brand,
      },
    });
    expect(masterbrand).toBe(assetId);
  });
});
