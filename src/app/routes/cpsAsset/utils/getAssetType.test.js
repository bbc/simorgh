import { getAssetType } from './getAssetType';
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';
import styJson from '#data/mundo/cpsAssets/23263889.json';

describe('getAssetType', () => {
  it('should return an assetType of "STY"', () => {
    const assetType = getAssetType(styJson);

    expect(assetType).toEqual('STY');
  });

  it('should return an assetType of "MAP"', () => {
    const assetType = getAssetType(mapJson);

    expect(assetType).toEqual('MAP');
  });

  it('should return undefined when no jsonData is passed in', () => {
    const assetType = getAssetType();

    expect(assetType).toEqual(undefined);
  });
});
