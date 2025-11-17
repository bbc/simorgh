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
    <div css={styles.coloredContainer}>
      <div css={styles.wrap}>
        <div css={styles.styledContent}>
          <div css={styles.textWrapper}>
            <h1 css={styles.styledTitle} id="banner-title">
              {title}
            </h1>
            <p css={styles.styledDescription} id="banner-description">
              {description}
            </p>
          </div>

          <div css={styles.ctaWrapper}>
            <button
              type="button"
              css={styles.styledButtonPrimary}
              onClick={handleInstallPWA}
              aria-label={
                buttonPrimary.shortText || buttonPrimary.longText || 'Install'
              }
            >
              <span className="short-text">{buttonPrimary.shortText}</span>
              <span className="long-text">{buttonPrimary.longText}</span>
            </button>

            <span css={styles.styledText}>or</span>

            <button
              type="button"
              css={styles.styledButtonSecondary}
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
