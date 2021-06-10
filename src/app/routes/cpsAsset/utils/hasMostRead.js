import path from 'ramda/src/path';
import getConfig from '#app/routes/utils/getConfig';

const hasMostRead = async (service, variant) => {
  const config = await getConfig(service, variant);

  const serviceHasMostRead = path(['mostRead', 'hasMostRead'], config);
  return serviceHasMostRead;
};

export default hasMostRead;
