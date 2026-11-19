import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from './index.module.scss';

type Props = {
  isGoogleReferralTraffic: boolean;
  googlePreferredSourceEnabled: boolean;
};

const GOOGLE_PREFERRED_SOURCE_URL =
  'https://www.google.com/preferences/source?q=bbc.com';

const GooglePreferredSource = ({
  isGoogleReferralTraffic,
  googlePreferredSourceEnabled,
}: Props) => {
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
