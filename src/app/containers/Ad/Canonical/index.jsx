import useToggle from '#hooks/useToggle';

const CanonicalAd = () => {
  const { enabled: adsEnabled } = useToggle('ads');

  if (!adsEnabled) {
    return null;
  }

  // To be implemented in the next feature ticket: https://github.com/bbc/simorgh/issues/6182
  return null;
};

export default CanonicalAd;
