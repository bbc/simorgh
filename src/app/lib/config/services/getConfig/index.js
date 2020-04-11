import pathOr from 'ramda/src/pathOr';

/* This function allows for a dynamic import of service config outside of
the react application (for example, for server side data fetching). Within
the react application, the config can be found in the ServiceContext. */
const getConfig = async (service, variant = 'default') => {
  let serviceConfig;

  try {
    const { service: config } = await import(`#lib/config/services/${service}`);
    serviceConfig = config;
  } catch (error) {
    // maybe don't error to console here, or only do it in dev mode.
    // eslint-disable-next-line no-console
    console.error(
      `getConfig could not find config for the requested service: ${service}.`,
    );
  }

  return pathOr({}, [variant], serviceConfig);
};

export default getConfig;
