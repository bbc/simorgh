const canAdvertise = (headers, queryParam) => {
  if (queryParam && queryParam['force-ads'] === 'true') {
    return true;
  }

  // if 'x-ip_is_advertise_combined' exists, we should not check 'x-bbc-edge-isuk' at all, we should respect the value of 'x-ip_is_advertise_combined'
  const isAdvertiseCombined = headers['x-ip_is_advertise_combined'];
  const isUK = headers['x-bbc-edge-isuk'];

  return typeof isAdvertiseCombined !== 'undefined'
    ? isAdvertiseCombined === 'yes'
    : isUK === 'no';
};

export default canAdvertise;
