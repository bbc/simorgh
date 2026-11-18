import React from 'react';
import clsx from 'clsx';
import Paragraph from '#app/components/Paragraph';
import CallToActionLink from '#app/components/CallToActionLink';
import { AccountIcon } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './index.module.scss';

export interface AccountActionButtonsProps {
  signInUrl?: string;
  registerUrl?: string;
  signInText: string;
  registerText: string;
  separatorText?: string;
  onSignInClick?: React.MouseEventHandler<HTMLAnchorElement>;
  onRegisterClick?: React.MouseEventHandler<HTMLAnchorElement>;
  signInComponentName: string;
  registerComponentName: string;
  onLightBackground?: boolean;
  signInRef?: React.Ref<HTMLAnchorElement>;
  experimentName?: string;
  experimentVariant?: string;
  signInAccessibleLabel?: string;
}

const AccountActionButtons = ({
  signInUrl,
  registerUrl,
  signInText,
  registerText,
  separatorText,
  onSignInClick,
  onRegisterClick,
  signInComponentName,
  registerComponentName,
  onLightBackground = false,
  signInRef,
  experimentName,
  experimentVariant,
  signInAccessibleLabel,
}: AccountActionButtonsProps) => {
  if (!signInUrl || !registerUrl) return null;

  const focusIndicatorClassName = onLightBackground
    ? undefined
    : 'focusIndicatorInvert';

  const signInButtonContent = (
    <>
      <CallToActionLink.ButtonLikeWrapper
        aria-hidden={signInAccessibleLabel ? true : undefined}
      >
        <AccountIcon className={styles.accountIcon} isInverted />
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
        onClick={onSignInClick}
        className={clsx(
          focusIndicatorClassName,
          styles.callToActionLink,
          styles.signInLink,
        )}
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
          className={clsx(
            styles.separatorText,
            onLightBackground && styles.separatorTextOnLightBackground,
          )}
        >
          {separatorText}
        </Paragraph>
      )}

      <CallToActionLink
        url={registerUrl}
        onClick={onRegisterClick}
        className={clsx(
          focusIndicatorClassName,
          styles.callToActionLink,
          styles.registerLink,
          onLightBackground && styles.registerLinkOnLightBackground,
        )}
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
