import isGoogleReferral from '#app/lib/utilities/isGoogleReferral';
import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from './index.module.scss';

const GOOGLE_PREFERRED_SOURCE_URL =
  'https://www.google.com/preferences/source?q=bbc.com';

const GooglePreferredSource = () => {
  const eventTrackingData = {
    componentName: 'google-preferred-source',
  };

  const viewTracker = useViewTracker(eventTrackingData);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  const { translations } = use(ServiceContext);
  const linkText = translations?.googlePreferredSource?.linkText;
  //   if (!linkText || !isGoogleReferral()) return null;

  return (
    <div className={styles.wrapper} {...viewTracker}>
      <a
        className={styles.link}
        href={GOOGLE_PREFERRED_SOURCE_URL}
        rel="noopener noreferrer"
        target="_blank"
        {...clickTrackerHandler}
      >
        {linkText}
      </a>
    </div>
  );
};

export default GooglePreferredSource;
