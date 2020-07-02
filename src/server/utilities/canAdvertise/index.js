const canAdvertise = headers => {
  const isAdvertiseCombine = headers['x-ip_is_advertise_combined'];
  const isUK = headers['x-bbc-edge-isuk'];

  return isAdvertiseCombine === 'yes' || isUK === 'no';
};

export default canAdvertise;
