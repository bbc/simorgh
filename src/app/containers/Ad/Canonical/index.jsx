import useToggle from '#hooks/useToggle';

const CanonicalAd = () => {
  const { enabled: adsEnabled } = useToggle('ads');

  if (!adsEnabled) {
    return null;
  }

  return null;
};

export default CanonicalAd;
