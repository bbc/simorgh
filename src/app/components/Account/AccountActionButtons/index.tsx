import { use } from 'react';
import Paragraph from '#app/components/Paragraph';
import CallToActionLink from '#app/components/CallToActionLink';
import { AccountIcon } from '#app/components/icons';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';

interface AccountActionButtonsProps {
  signInComponentName: string;
  registerComponentName: string;
  onLightBackground?: boolean;
}

const AccountActionButtons = ({
  signInComponentName,
  registerComponentName,
  onLightBackground = false,
}: AccountActionButtonsProps) => {
  const { signInUrl, registerUrl } = use(AccountContext);
  const { translations } = use(ServiceContext);

  const signInText = translations?.account?.signIn;
  const registerText = translations?.account?.register;
  const separatorText = translations?.accountPromoBanner?.buttonSeparatorText;

  if (!signInUrl || !registerUrl) return null;

  return (
    <>
      <CallToActionLink
        url={signInUrl}
        className="focusIndicatorInvert"
        css={[styles.callToActionLink, styles.signInLink]}
        eventTrackingData={{ componentName: signInComponentName }}
      >
        <CallToActionLink.ButtonLikeWrapper>
          <AccountIcon css={styles.accountIcon} />
          <CallToActionLink.Text shouldUnderlineOnHoverFocus>
            {signInText}
          </CallToActionLink.Text>
        </CallToActionLink.ButtonLikeWrapper>
      </CallToActionLink>

      {separatorText && (
        <Paragraph
          size="bodyCopy"
          css={[
            styles.separatorText,
            onLightBackground && styles.separatorTextOnLightBackground,
          ]}
        >
          {separatorText}
        </Paragraph>
      )}

      <CallToActionLink
        url={registerUrl}
        className="focusIndicatorInvert"
        css={[
          styles.callToActionLink,
          styles.registerLink,
          onLightBackground && styles.registerLinkOnLightBackground,
        ]}
        eventTrackingData={{ componentName: registerComponentName }}
      >
        <CallToActionLink.ButtonLikeWrapper>
          <CallToActionLink.Text shouldUnderlineOnHoverFocus>
            {registerText}
          </CallToActionLink.Text>
        </CallToActionLink.ButtonLikeWrapper>
      </CallToActionLink>
    </>
  );
};

export default AccountActionButtons;
