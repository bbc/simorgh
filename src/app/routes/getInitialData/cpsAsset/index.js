import fetchData from '../utils/fetchData';

const getCpsAssetInitialData = async pathname => {
  return fetchData({ pathname });
};

export default getCpsAssetInitialData;
