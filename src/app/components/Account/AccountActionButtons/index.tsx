import React, { use } from 'react';
import Paragraph from '#app/components/Paragraph';
import CallToActionLink from '#app/components/CallToActionLink';
import { AccountIcon } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { AccountContext } from '#contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';

interface AccountActionButtonsProps {
  signInComponentName: string;
  registerComponentName: string;
  onLightBackground?: boolean;
  signInRef?: React.Ref<HTMLAnchorElement>;
  experimentName?: string;
  experimentVariant?: string;
  signInAccessibleLabel?: string;
}

const AccountActionButtons = ({
  signInComponentName,
  registerComponentName,
  onLightBackground = false,
  signInRef,
  experimentName,
  experimentVariant,
  signInAccessibleLabel,
}: AccountActionButtonsProps) => {
  const { signInUrl, registerUrl } = use(AccountContext);
  const { translations } = use(ServiceContext);

  const signInText = translations?.account?.signIn;
  const registerText = translations?.account?.register;
  const separatorText = translations?.accountPromoBanner?.buttonSeparatorText;

  if (!signInUrl || !registerUrl) return null;

  const focusIndicatorClassName = onLightBackground
    ? undefined
    : 'focusIndicatorInvert';

  const signInButtonContent = (
    <>
      <CallToActionLink.ButtonLikeWrapper
        aria-hidden={signInAccessibleLabel ? true : undefined}
      >
        <AccountIcon css={styles.accountIcon} />
        <CallToActionLink.Text shouldUnderlineOnHoverFocus>
          {signInText}
        </CallToActionLink.Text>
      </CallToActionLink.ButtonLikeWrapper>
      {signInAccessibleLabel && (
        <VisuallyHiddenText>{signInAccessibleLabel}</VisuallyHiddenText>
      )}
    </>
  );

  return (
    <>
      <CallToActionLink
        ref={signInRef}
        url={signInUrl}
        className={focusIndicatorClassName}
        css={[styles.callToActionLink, styles.signInLink]}
        eventTrackingData={{
          componentName: signInComponentName,
          ...(experimentName && { experimentName }),
          ...(experimentVariant && { experimentVariant }),
          ...(experimentVariant && { sendOptimizelyEvents: true }),
        }}
        data-testid={signInComponentName}
      >
        {signInButtonContent}
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
        className={focusIndicatorClassName}
        css={[
          styles.callToActionLink,
          styles.registerLink,
          onLightBackground && styles.registerLinkOnLightBackground,
        ]}
        eventTrackingData={{
          componentName: registerComponentName,
          ...(experimentName && { experimentName }),
          ...(experimentVariant && { experimentVariant }),
          ...(experimentVariant && { sendOptimizelyEvents: true }),
        }}
        data-testid={registerComponentName}
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
