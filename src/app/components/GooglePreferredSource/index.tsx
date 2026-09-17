import isGoogleReferral from '#app/lib/utilities/isGoogleReferral';
import styles from './index.module.scss';

export type GooglePreferredSourceProps = {
  linkText: string;
};

const GOOGLE_PREFERRED_SOURCE_URL =
  'https://www.google.com/preferences/source?q=bbc.com';

const GooglePreferredSource = ({ linkText }: GooglePreferredSourceProps) => {
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
