import fetchData from '../utils/fetchData';

const getMediaAssetPageInitialData = props => {
  const { service, assetUri } = props;

  const url = `http://localhost:7080/${service}/${assetUri}.json`;

  return fetchData({ url });
};

export default getMediaAssetPageInitialData;
