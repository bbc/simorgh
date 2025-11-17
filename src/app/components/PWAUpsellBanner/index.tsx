/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import styles from './index.styles';
import { Close } from '../icons';
import { ButtonBase } from './index.types';

interface PWAUpsellBannerProps {
  title: string;
  description: string;
  isDismissible?: boolean;
  buttonPrimary: ButtonBase & { shortText: string; longText: string };
  buttonSecondary: ButtonBase & { text: string };
  handleClose: () => void;
  handleInstallPWA: () => void;
}

const PWAUpsellBanner: React.FC<PWAUpsellBannerProps> = ({
  title,
  description,
  isDismissible = true,
  buttonPrimary,
  buttonSecondary,
  handleClose,
  handleInstallPWA,
}) => {
  return (
    <div css={styles.ColoredContainer}>
      <div css={styles.Wrap}>
        <div css={styles.StyledContent}>
          <div css={styles.TextWrapper}>
            <h1 css={styles.StyledTitle} id="banner-title">
              {title}
            </h1>
            <p css={styles.StyledDescription} id="banner-description">
              {description}
            </p>
          </div>

          <div css={styles.CTAWrapper}>
            <button
              type="button"
              css={styles.StyledButtonPrimary}
              onClick={handleInstallPWA}
              aria-label={
                buttonPrimary.shortText || buttonPrimary.longText || 'Install'
              }
            >
              <span className="short-text">{buttonPrimary.shortText}</span>
              <span className="long-text">{buttonPrimary.longText}</span>
            </button>

            <span css={styles.StyledText}>or</span>

            <button
              type="button"
              css={styles.StyledbuttonSecondary}
              onClick={buttonSecondary?.onClick}
              aria-label={buttonSecondary.text || 'Not now'}
            >
              {buttonSecondary.text}
            </button>
          </div>

          {isDismissible && (
            <div>
              <button
                type="button"
                aria-label="close"
                css={styles.subNavCloseButton}
                onClick={handleClose}
              />
              <Close css={styles.subNavCloseButtonIcon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWAUpsellBanner;
