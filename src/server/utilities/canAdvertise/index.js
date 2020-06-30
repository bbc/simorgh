const canAdvertise = headers => {
  const isAdvertiseCombine = headers['x-ip_is_advertise_combined'];
  const isUkCombined = headers['x-ip_is_uk_combined'];
  const isUK = headers['x-bbc-edge-isuk'];

  const hasIpHeaders = isAdvertiseCombine && isUkCombined;

  return hasIpHeaders
    ? isAdvertiseCombine === 'yes' && isUkCombined === 'no'
    : isUK === 'no';
};

export default canAdvertise;
