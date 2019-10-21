import fetchData from '../utils/fetchData';
import convertToOptimoBlocks from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks';
import applyTimestampRules from '#lib/utilities/preprocessor/rules/timestamp';
import addIdsToBlocks from '#lib/utilities/preprocessor/rules/addIdsToBlocks';
import applyBlockPositioning from '#lib/utilities/preprocessor/rules/blockPositioning';

export const preprocessorRules = [
  convertToOptimoBlocks,
  applyTimestampRules,
  addIdsToBlocks,
  applyBlockPositioning,
];

const getCpsAssetInitialData = async pathname => {
  return fetchData({ pathname, preprocessorRules });
};

export default getCpsAssetInitialData;
