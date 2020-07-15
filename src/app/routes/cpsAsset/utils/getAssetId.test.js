// components to test
import getAssetId from './getAssetId';

// mock data
import styJson from '#data/mundo/cpsAssets/23263889.json';

describe('getAssetType', () => {
  it('should return an assetType of "STY"', () => {
    const assetType = getAssetId(styJson);

    expect(assetType).toEqual('23263889');
  });

  it('should return undefined when no jsonData is passed in', () => {
    const assetType = getAssetId();

    expect(assetType).toEqual(undefined);
  });
});
