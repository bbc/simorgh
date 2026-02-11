import { useContext } from 'react';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { ToggleContext } from '#app/contexts/ToggleContext';
import getToggleDefinitions from '#app/lib/utilities/getToggleDefinition';
import Text from '#app/components/Text';
import styles from './index.styles';

const AccountHeader = () => {
  const { isSignedIn, signInUrl, forYouUrl } = useContext(AccountContext);
  const { translations, service } = useContext(ServiceContext);
  const { toggleState } = useContext(ToggleContext);
  const { account } = getToggleDefinitions(toggleState);

  console.log('signinurl', signInUrl);
  console.log('foryouurl', forYouUrl);

  const enabledForService =
    account?.enabled &&
    (account?.value
      ? String(account.value).split('|').includes(service)
      : true);

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
