import fetchData from '../utils/fetchData';
import addIdsToBlocks from './addIdsToBlocks';

const getMediaPageInitialData = props => {
  const { service, mediaId } = props;
  let { serviceId } = props;

  if (serviceId === 'bbc_oromo_radio') {
    serviceId = 'bbc_afaanoromo_radio';
  }

  const url = `http://localhost:7080/${service}/${serviceId}/${mediaId}.json`;

  return fetchData({
    url,
    preprocessorRules: [addIdsToBlocks],
  });
};

export default getMediaPageInitialData;
