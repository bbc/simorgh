import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#contexts/ServiceContext';
import Text from '#app/components/Text';
import styles from './index.styles';

const AccountHeader = () => {
  const { isSignedIn, signInUrl, forYouUrl } = use(AccountContext);
  const { translations } = use(ServiceContext);

  const href = (isSignedIn ? forYouUrl : signInUrl) || '/signin';

  const label = isSignedIn
    ? (translations?.account?.forYou ?? 'For you')
    : (translations?.account?.signIn ?? 'Sign In');

  return (
    <div css={styles.wrapper}>
      <Text as="a" css={styles.link} href={href}>
        {label}
      </Text>
    </div>
  );
};

export default AccountHeader;
