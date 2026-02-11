import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useHydrationDetection from '#hooks/useHydrationDetection';
import useToggle from '#hooks/useToggle';
import Text from '#app/components/Text';
import styles from './index.styles';

const AccountHeader = () => {
  const isHidrated = useHydrationDetection();
  const { isSignedIn, signInUrl, forYouUrl } = use(AccountContext);
  const { translations, service } = use(ServiceContext);
  const { enabled, value } = useToggle('account');
  const enabledForService =
    enabled && (value ? String(value).split('|').includes(service) : true);

  if (!isHidrated) return null;
  if (!enabledForService) return null;

  const href = isSignedIn ? forYouUrl : signInUrl;
  if (!href) return null;

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
