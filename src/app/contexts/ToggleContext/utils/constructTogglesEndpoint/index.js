import onClient from '#lib/utilities/onClient';

const getTogglesEndpoint = (service, origin) => {
  const requestOrigin = origin || 'https://www.test.bbc.com';
  const baseTogglesUrl = `${process.env.SIMORGH_TOGGLES_URL}/toggles?application=simorgh&service=${service}&__amp_source_origin=${requestOrigin}`;

  // client side renders should trigger a geoIPLookup
  if (onClient()) {
    return `${baseTogglesUrl}&geoiplookup=true`;
  }

  return baseTogglesUrl;
};

export default getTogglesEndpoint;
