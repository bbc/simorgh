import {
  cpsAssetPreprocessorRules,
  articlesPreprocessorRules,
  indexPreprocessorRules,
  radioPagePreprocessorRules,
} from '../preprocessorRulesConfig';

const getPreprocessorRules = type => {
  switch (type) {
    case 'article':
      return articlesPreprocessorRules;
    case 'WS-LIVE':
      return radioPagePreprocessorRules;
    case 'IDX':
      return indexPreprocessorRules;
    case 'FIX':
      return indexPreprocessorRules;
    case 'MAP':
      return cpsAssetPreprocessorRules;
    case 'STY':
      return cpsAssetPreprocessorRules;
    case 'PGL':
      return cpsAssetPreprocessorRules;
    default:
      return [];
  }
};

export default getPreprocessorRules;
