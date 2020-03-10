import onClient from '#lib/utilities/onClient';

const getTogglesEndpoint = (service, origin) => {
  const requestOrigin = origin ? origin : 'https://www.test.bbc.com';
  const baseTogglesUrl = `${process.env.SIMORGH_TOGGLES_URL}/toggles?application=simorgh&service=${service}&__amp_source_origin=${requestOrigin}`;

  // client side renders should trigger a geoIPLookup
  if (onClient()) {
    console.log('zzzzzzz', `${baseTogglesUrl}&geoiplookup=true`);
    return `${baseTogglesUrl}&geoiplookup=true`;
  }
  console.log('zzzzzzz', baseTogglesUrl);

  return baseTogglesUrl;
};

export default getTogglesEndpoint;
