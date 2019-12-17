import {
  cpsAssetPreprocessorRules,
  articlesPreprocessorRules,
  indexPreprocessorRules,
  radioPagePreprocessorRules,
} from '../preprocessorRulesConfig';

const ARTICLE_PAGE = 'article';
const LIVE_RADIO_PAGE = 'WS-LIVE';
const INDEX_PAGE = 'IDX';
const FEATURE_INDEX_PAGE = 'FIX';
const MEDIA_ASSET_PAGE = 'MAP';
const BASIC_STORY_PAGE = 'STY';
const PHOTO_GALLERY_PAGE = 'PGL';

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
    case BASIC_STORY_PAGE:
      return cpsAssetPreprocessorRules;
    case PHOTO_GALLERY_PAGE:
      return cpsAssetPreprocessorRules;
    default:
      return [];
  }
};

export default getPreprocessorRules;
