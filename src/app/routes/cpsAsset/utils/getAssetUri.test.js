// components to test
import styJson from '#data/mundo/cpsAssets/23263889.json';
import getAssetUri from './getAssetUri';

// mock data

describe('getAssetType', () => {
  it('should return the assetUri', () => {
    const assetType = getAssetUri(styJson);

    expect(assetType).toEqual('/mundo/23263889');
  });

  it('should return undefined when no jsonData is passed in', () => {
    const assetType = getAssetUri();

    expect(assetType).toEqual(undefined);
  });
});
