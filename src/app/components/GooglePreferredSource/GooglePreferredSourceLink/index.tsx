import isGoogleReferral from '#app/lib/utilities/isGoogleReferral';
import { use, useEffect, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useToggle from '#hooks/useToggle';
import styles from './index.module.scss';

const GOOGLE_PREFERRED_SOURCE_URL =
  'https://www.google.com/preferences/source?q=bbc.com';

const GooglePreferredSource = () => {
  const toggle = useToggle('googlePreferredSource');
  const googlePreferredSourceEnabled = toggle.enabled;
  const [isGoogleReferralTraffic, setIsGoogleReferralTraffic] = useState(false);

  useEffect(() => {
    setIsGoogleReferralTraffic(isGoogleReferral());
  }, []);

  const eventTrackingData = {
    componentName: 'google-preferred-source',
  };

  const viewTracker = useViewTracker(eventTrackingData);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  const { translations, externalLinkText } = use(ServiceContext);
  const linkText = translations?.googlePreferredSource?.linkText;
  if (!linkText || !isGoogleReferralTraffic || !googlePreferredSourceEnabled)
    return null;

  return (
    <div className={styles.wrapper} {...viewTracker}>
      <a
        className={styles.link}
        href={GOOGLE_PREFERRED_SOURCE_URL}
        {...clickTrackerHandler}
        aria-label={`${linkText} ${externalLinkText}`}
      >
        {linkText}
      </a>
    </div>
  );
};

export default GooglePreferredSource;
