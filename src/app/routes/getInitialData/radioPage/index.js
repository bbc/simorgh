import fetchData from '../utils/fetchData';
import addIdsToBlocks from './addIdsToBlocks';

const getRadioPageInitialData = pathname => {
  return fetchData({
    pathname,
    preprocessorRules: [addIdsToBlocks],
  });
};

export default getRadioPageInitialData;
