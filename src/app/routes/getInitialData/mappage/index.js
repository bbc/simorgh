import fetchData from '../utils/fetchData';

const getMediaAssetPageInitialData = props => {
  const { service, mediaId } = props;

  const url = `http://localhost:7080/${service}/${mediaId}`;

  return fetchData({ url });
};

export default getMediaAssetPageInitialData;
