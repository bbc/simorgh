import fetchData from '../utils/fetchData';
import convertToOptimoBlocks from '#lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks';

const preprocessorRules = [convertToOptimoBlocks];

const getCpsAssetInitialData = async pathname => {
  return fetchData({ pathname, preprocessorRules });
};

export default getCpsAssetInitialData;
