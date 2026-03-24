import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useHydrationDetection from '#hooks/useHydrationDetection';
import Text from '#app/components/Text';
import { AccountIcon } from '#app/components/icons';
import styles from './index.styles';

const AccountHeader = () => {
  const isHydrated = useHydrationDetection();
  const { isSignedIn, signInUrl, forYouUrl, isIdctaAvailable } =
    use(AccountContext);
  const { translations } = use(ServiceContext);

  if (!isHydrated || !isIdctaAvailable) return null;

  const href = isSignedIn ? forYouUrl : signInUrl;
  const label = isSignedIn
    ? translations?.account?.forYou
    : translations?.account?.signIn;

  if (!href || !label) return null;

  return (
    <div css={styles.wrapper}>
      <Text as="a" css={styles.link} href={href} fontVariant="sansBold">
        <AccountIcon css={styles.icon} />
        {label}
      </Text>
    </div>
  );
};

export default AccountHeader;
