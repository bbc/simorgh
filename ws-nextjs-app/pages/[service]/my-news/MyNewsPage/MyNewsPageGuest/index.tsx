import { use } from 'react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import AccountActionButtons from '#app/components/Account/AccountActionButtons';
import styles from './styles';

const MyNewsPageGuest = () => {
  const { translations } = use(ServiceContext);

  return (
    <>
      <Heading level={1} css={styles.heading} size="paragon">
        {translations?.myNews?.guestTitle}
      </Heading>
      <Text size="longPrimer">{translations?.myNews?.guestDescription}</Text>
      <div css={styles.actionButtonsContainer}>
        <AccountActionButtons
          registerComponentName="my-news-register-link"
          signInComponentName="my-news-guest-sign-in-link"
          onLightBackground
        />
      </div>
    </>
  );
};

export default MyNewsPageGuest;
