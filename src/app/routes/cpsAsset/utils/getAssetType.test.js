// components to test
import getAssetType from './getAssetType';

// mock data
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';
import styJson from '#data/mundo/cpsAssets/23263889.json';

import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';

describe('getAssetType', () => {
  it('should return an assetType of "STY"', () => {
    const assetType = getAssetType(styJson);

    expect(assetType).toEqual('STY');
  });

  it(`should return an assetType of ${MEDIA_ASSET_PAGE}`, () => {
    const assetType = getAssetType(mapJson);

    expect(assetType).toEqual(MEDIA_ASSET_PAGE);
  });

  it('should return undefined when no jsonData is passed in', () => {
    const assetType = getAssetType();

    expect(assetType).toEqual(undefined);
  });
});
