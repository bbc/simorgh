import { use } from 'react';
import Text from '#app/components/Text';
import { AccountContext } from '../AccountContext';
import styles from './index.styles';

const AccountIcon = () => {
  return (
    <svg
      viewBox="0 0 32 32"
      focusable="false"
      aria-hidden="true"
      css={styles.icon}
    >
      <path d="M16 23c-3.3 0-5.8-2.5-5.8-5.8s2.5-5.8 5.8-5.8c3.2 0 5.8 2.5 5.8 5.8S19.2 23 16 23m15-5.7c0-8.4-6.6-15-15-15-8.5 0-15 6.6-15 15 0 5.2 2.5 9.8 6.4 12.4 1.9-2.8 5-4.6 8.6-4.6s6.7 1.8 8.6 4.6C28.5 27 31 22.5 31 17.3" />
    </svg>
  );
};

const HeaderAccount = () => {
  const { isSignedIn, signInUrl, accountUrl, isSignInAvailable } =
    use(AccountContext);

  // TODO: fix hydration error
  if (!isSignInAvailable || isSignedIn === null) {
    return null;
  }

  return (
    <div>
      <Text
        as="a"
        href={isSignedIn ? accountUrl : signInUrl}
        css={styles.linkWrapper}
      >
        <Text
          as="span"
          css={styles.linkText}
          size="pica"
          suppressHydrationWarning
        >
          {isSignedIn ? 'For you' : 'Sign In'}{' '}
        </Text>
        <AccountIcon />
      </Text>
    </div>
  );
};

export default HeaderAccount;
