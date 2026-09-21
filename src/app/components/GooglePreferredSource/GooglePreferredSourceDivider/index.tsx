import isGoogleReferral from '#app/lib/utilities/isGoogleReferral';
import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.module.scss';

const GooglePreferredSourceDivider = () => {
  const { translations } = use(ServiceContext);
  const linkText = translations?.googlePreferredSource?.linkText;

  if (!linkText || !isGoogleReferral()) return null;

  return <div className={styles.divider} aria-hidden="true" />;
};

export default GooglePreferredSourceDivider;
