import {
  cpsAssetPreprocessorRules,
  articlesPreprocessorRules,
  indexPreprocessorRules,
  radioPagePreprocessorRules,
} from '../preprocessorRulesConfig';

import {
  ARTICLE_PAGE,
  LIVE_RADIO_PAGE,
  INDEX_PAGE,
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
} from '../../../pageTypes';

const getPreprocessorRules = pageType => {
  switch (pageType) {
    case ARTICLE_PAGE:
      return articlesPreprocessorRules;
    case LIVE_RADIO_PAGE:
      return radioPagePreprocessorRules;
    case INDEX_PAGE:
      return indexPreprocessorRules;
    case FEATURE_INDEX_PAGE:
      return indexPreprocessorRules;
    case MEDIA_ASSET_PAGE:
      return cpsAssetPreprocessorRules;
    case STORY_PAGE:
      return cpsAssetPreprocessorRules;
    case PHOTO_GALLERY_PAGE:
      return cpsAssetPreprocessorRules;
    default:
      return [];
  }
};

export default getPreprocessorRules;
