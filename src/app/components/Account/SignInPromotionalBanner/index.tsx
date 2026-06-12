import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import PromotionalBanner from '#app/components/PromotionalBanner';
import AccountActionButtons from '#app/components/Account/AccountActionButtons';
import styles from './index.styles';

const SignInPromotionalBanner = () => {
  const { translations } = use(ServiceContext);
  const {
    title = '',
    description = '',
    closeLabel,
    buttonSeparatorText = '',
  } = translations.accountPromoBanner ?? {};

  return (
    <PromotionalBanner
      id="sign-in-promotional-banner"
      title={title}
      description={description}
      bannerLabel={title}
      closeLabel={closeLabel}
      buttonSeparatorText={buttonSeparatorText}
      topImage={<div css={styles.signInImage} aria-hidden="true" />}
      variant="signIn"
      isDismissible={false}
    >
      <AccountActionButtons
        signInComponentName="account-sign-in-modal-sign-in"
        registerComponentName="account-sign-in-modal-register"
      />
    </PromotionalBanner>
  );
};

export default SignInPromotionalBanner;
