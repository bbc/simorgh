import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.module.scss';

type Props = {
  isGoogleReferralTraffic: boolean;
  googlePreferredSourceEnabled: boolean;
};

const GooglePreferredSourceDivider = ({
  isGoogleReferralTraffic,
  googlePreferredSourceEnabled,
}: Props) => {
  const { translations } = use(ServiceContext);
  const linkText = translations?.googlePreferredSource?.linkText;

  if (!linkText || !isGoogleReferralTraffic || !googlePreferredSourceEnabled)
    return null;

  return <div className={styles.divider} aria-hidden="true" />;
};

export default GooglePreferredSourceDivider;
