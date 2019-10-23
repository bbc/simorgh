import fetchData from '../utils/fetchData';
import addIdsToBlocks from './addIdsToBlocks';

const preprocessorRules = [addIdsToBlocks];

const getRadioPageInitialData = pathname => {
  return fetchData({
    pathname,
    preprocessorRules,
  });
};

export default getRadioPageInitialData;
