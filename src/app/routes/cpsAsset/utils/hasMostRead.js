import path from 'ramda/src/path';
import getConfig from '#app/routes/utils/getConfig';

const hasMostRead = async (service, variant) => {
  const config = await getConfig(service, variant);

  const serviceHashasMostRead = path(['mostRead', 'hasMostRead'], config);
  return serviceHashasMostRead;
};

export default hasMostRead;
