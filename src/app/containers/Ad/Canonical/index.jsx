import useToggle from '#hooks/useToggle';

const CanonicalAd = () => {
  const { enabled: adsEnabled } = useToggle('ads');

  if (!adsEnabled) {
    return null;
  }

  // To be implemented in next feature ticket
  return null;
};

export default CanonicalAd;
