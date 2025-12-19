import { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import AmpComscoreAnalytics from './Amp';
import CanonicalComscoreAnalytics from './Canonical';

const ComscoreAnalytics = () => {
  const { isAmp, showCookieBannerBasedOnCountry, nonce } = use(RequestContext);
  const { enabled } = useToggle('comscoreAnalytics');

  if (!enabled || (isAmp && showCookieBannerBasedOnCountry)) {
    return null;
  }
  return isAmp ? (
    <AmpComscoreAnalytics />
  ) : (
    <CanonicalComscoreAnalytics nonce={nonce} />
  );
};

export default ComscoreAnalytics;
