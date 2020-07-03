const canAdvertise = headers => {
  const isAdvertiseCombine = headers['x-ip_is_advertise_combined'];

  if (isAdvertiseCombine && isAdvertiseCombine === 'yes') {
    return true;
  }

  const isUK = headers['x-bbc-edge-isuk'];
  if (isUK && isUK === 'no') {
    return true;
  }

  return false;
};

export default canAdvertise;
