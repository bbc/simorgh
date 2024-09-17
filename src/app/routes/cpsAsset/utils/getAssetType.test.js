// components to test

// mock data
import mapJson from '#data/pidgin/cpsAssets/media-23256549.json';
import styJson from '#data/mundo/cpsAssets/23263889.json';

import { MEDIA_ASSET_PAGE, STORY_PAGE } from '#routes/utils/pageTypes';
import getAssetType from './getAssetType';

describe('getAssetType', () => {
  it(`should return an assetType of ${STORY_PAGE}`, () => {
    const assetType = getAssetType(styJson);

    expect(assetType).toEqual(STORY_PAGE);
  });

  it(`should return an assetType of ${MEDIA_ASSET_PAGE}`, () => {
    const assetType = getAssetType(mapJson);

    expect(assetType).toEqual(MEDIA_ASSET_PAGE);
  });

  it('should return undefined when no jsonData is passed in', () => {
    const assetType = getAssetType();

    expect(assetType).toEqual(null);
  });
});
