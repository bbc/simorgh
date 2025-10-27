import React from 'react';
import styles from './banner.styles';
import { Close } from '../icons';

export const PWAUpsellBanner = ({
  title,
  description,
  isDismissible = true,
  buttonPrimary,
  buttonSecondary,
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
              onClick={buttonPrimary?.onClick}
            >
              {buttonPrimary?.text}
            </button>

            <text css={styles.StyledText}>or</text>

            <button
              type="button"
              css={styles.StyledButtonTwo}
              onClick={buttonSecondary?.onClick}
            >
              {buttonSecondary.text}
            </button>
          </div>

          {isDismissible && (
            <div css={styles.CloseButtonWrapper}>
              <button
                type="button"
                css={styles.subNavCloseButton}
                onClick={buttonSecondary?.onClick}
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
