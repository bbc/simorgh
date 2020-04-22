import path from 'ramda/src/path';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

/* This function allows for a dynamic import of service config outside of
the react application (for example, for server side data fetching). Within
the react application, the config can be found in the ServiceContext. */
const getConfig = async (service, variant = 'default') => {
  let serviceConfig;

  try {
    const { service: config } = await import(`#lib/config/services/${service}`);
    serviceConfig = config;
  } catch (e) {
    logger.error(`Error retrieving config for ${service}`);
    return {};
  }

  const variantConfig = path([variant], serviceConfig);

  if (!variantConfig) {
    logger.error(`No config found for ${service} variant ${variant}`);
  }

  return variantConfig || {};
};

export default getConfig;
