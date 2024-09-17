import path from 'ramda/src/path';
import getConfig from '#routes/utils/getConfig';

const hasMostRead = async (service, variant) => {
  const config = await getConfig(service, variant);

  return path(['mostRead', 'hasMostRead'], config);
};

export default hasMostRead;
