import { useContext } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import styles from './index.styles';

const AccountHeader = () => {
  const { isSignedIn, signInUrl, forYouUrl } = useContext(AccountContext);

  const href = isSignedIn ? forYouUrl : signInUrl;
  if (!href) return null;

  return (
    <div css={styles.wrapper}>
      <a css={styles.link} href={href}>
        {isSignedIn ? 'For you' : 'Sign in'}
      </a>
    </div>
  );
};

export default AccountHeader;
