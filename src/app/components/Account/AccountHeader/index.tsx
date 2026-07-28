import { use } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#contexts/ServiceContext';
import useHydrationDetection from '#hooks/useHydrationDetection';
import Text from '#app/components/Text';
import { AccountIconRounded } from '#app/components/icons';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import styles from './index.styles';

export type AccountHeaderVariant = 'legacy' | 'default';

type AccountHeaderProps = {
  variant?: AccountHeaderVariant;
};

const AccountHeader = ({ variant = 'legacy' }: AccountHeaderProps) => {
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

  if (!isIdctaAvailable) return null;

  const href = isSignedIn ? settingsUrl : signInUrl;
  const label = isSignedIn
    ? translations?.account?.forYou
    : translations?.account?.signIn;

  if (!href || !label) return null;

  const isDefaultVariant = variant === 'default';

  return (
    <div
      css={[
        isDefaultVariant ? styles.wrapperDefault : styles.wrapper,
        !isHydrated && styles.hidden,
      ]}
      {...viewTracker}
    >
      <Text
        as="a"
        css={isDefaultVariant ? styles.linkDefault : styles.link}
        href={href}
        fontVariant="sansBold"
        onClick={onClickTrack}
        {...(isDefaultVariant && { 'aria-label': label })}
      >
        <AccountIconRounded
          css={isDefaultVariant ? styles.iconDefault : styles.icon}
        />
        <span>{label}</span>
      </Text>
    </div>
  );
};

export default AccountHeader;
