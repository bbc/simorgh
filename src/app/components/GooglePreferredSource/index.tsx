import isGoogleReferral from '#app/lib/utilities/isGoogleReferral';
import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.module.scss';

const GOOGLE_PREFERRED_SOURCE_URL =
  'https://www.google.com/preferences/source?q=bbc.com';

const GooglePreferredSource = () => {
  const { translations } = use(ServiceContext);
  const linkText = translations?.googlePreferredSource?.linkText;
  if (!linkText) return null;
  if (!isGoogleReferral()) return null;

  return (
    <a
      className={styles.link}
      href={GOOGLE_PREFERRED_SOURCE_URL}
      rel="noopener noreferrer"
      target="_blank"
    >
      {linkText}
    </a>
  );
};

export default GooglePreferredSource;
