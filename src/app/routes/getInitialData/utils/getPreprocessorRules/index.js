import {
  cpsAssetPreprocessorRules,
  articlesPreprocessorRules,
  indexPreprocessorRules,
  radioPagePreprocessorRules,
} from '../preprocessorRulesConfig';

let preprocessorRules;

const getPreprocessorRules = type => {
  switch (type) {
    case 'article':
      preprocessorRules = articlesPreprocessorRules;
      break;
    case 'WS-LIVE':
      preprocessorRules = radioPagePreprocessorRules;
      break;
    case 'IDX':
      preprocessorRules = indexPreprocessorRules;
      break;
    case 'FIX':
      preprocessorRules = indexPreprocessorRules;
      break;
    case 'MAP':
      preprocessorRules = cpsAssetPreprocessorRules;
      break;
    case 'STY':
      preprocessorRules = cpsAssetPreprocessorRules;
      break;
    case 'PGL':
      preprocessorRules = cpsAssetPreprocessorRules;
      break;
    default:
      preprocessorRules = [];
  }
  return preprocessorRules;
};

export default getPreprocessorRules;
