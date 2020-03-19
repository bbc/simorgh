import onClient from '#lib/utilities/onClient';

export default (service, origin) => {
  const requestOrigin = origin || 'https://www.test.bbc.com';
  const baseTogglesUrl = `${process.env.SIMORGH_TOGGLES_URL}/toggles?application=simorgh&service=${service}&__amp_source_origin=${requestOrigin}`; // __amp_source_origin is relevant to both canonical and amp

  // client side renders should trigger a geoIPLookup
  if (onClient()) {
    return `${baseTogglesUrl}&geoiplookup=true`;
  }

  return baseTogglesUrl;
};
