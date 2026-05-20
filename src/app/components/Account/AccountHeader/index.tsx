import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useHydrationDetection from '#hooks/useHydrationDetection';
import Text from '#app/components/Text';
import { AccountIcon } from '#app/components/icons';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from './index.styles';

const AccountHeader = () => {
  const isHydrated = useHydrationDetection();
  const { isSignedIn, signInUrl, settingsUrl, isIdctaAvailable } =
    use(AccountContext);
  const { translations } = use(ServiceContext);

  const clickComponentName = isSignedIn
    ? 'account-header-settings'
    : 'account-header-sign-in';

  const viewTracker = useViewTracker({
    componentName: 'account-header',
  });

  const { onClick: onClickTrack } = useClickTrackerHandler({
    componentName: clickComponentName,
  });

  if (!isHydrated || !isIdctaAvailable) return null;

  const href = isSignedIn ? settingsUrl : signInUrl;
  const label = isSignedIn
    ? translations?.account?.forYou
    : translations?.account?.signIn;

  if (!href || !label) return null;

  return (
    <div css={styles.wrapper} {...viewTracker}>
      <Text
        as="a"
        css={styles.link}
        href={href}
        fontVariant="sansBold"
        onClick={onClickTrack}
      >
        <AccountIcon css={styles.icon} />
        {label}
      </Text>
    </div>
  );
};

export default AccountHeader;
