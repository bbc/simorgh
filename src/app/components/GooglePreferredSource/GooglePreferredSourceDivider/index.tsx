import isGoogleReferral from '#app/lib/utilities/isGoogleReferral';
import { use, useEffect, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import styles from './index.module.scss';

const GooglePreferredSourceDivider = () => {
  const toggle = useToggle('googlePreferredSource');
  const googlePreferredSourceEnabled = toggle.enabled;
  const [isGoogleReferralTraffic, setIsGoogleReferralTraffic] = useState(false);

  useEffect(() => {
    setIsGoogleReferralTraffic(isGoogleReferral());
  }, []);

  const { translations } = use(ServiceContext);
  const linkText = translations?.googlePreferredSource?.linkText;

  if (!linkText || !isGoogleReferralTraffic || !googlePreferredSourceEnabled)
    return null;

  return <div className={styles.divider} aria-hidden="true" />;
};

export default GooglePreferredSourceDivider;
