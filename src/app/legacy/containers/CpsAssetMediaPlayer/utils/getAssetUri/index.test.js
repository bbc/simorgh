import getAssetUri from '.';

describe('getAssetUri', () => {
  it('returns the correct assetUri for russian', () => {
    const input = '/russian/multimedia/2016/05/160505_v_diving_record';
    expect(getAssetUri(input)).toEqual(input);
  });

  it('returns the correct assetUri for cymrufyw/newyddion', () => {
    const input = '/newyddion/55802579/p0953xf8/cy';
    const output = '/cymrufyw/55802579/p0953xf8/cy';

    expect(getAssetUri(input)).toEqual(output);
  });
});
