import React from 'react';
import styles from './index.styles';
import { Close } from '../icons';

export default ({
  title,
  description,
  isDismissible = true,
  buttonPrimary,
  buttonSecondary,
  serviceBackground,
  handleClose,
  handleInstallPWA,
}) => {
  return (
    <div css={[styles.ColoredContainer, styles[serviceBackground]]}>
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
              aria-label={buttonPrimary.shortText || buttonPrimary.longText}
            >
              <span className="short-text">{buttonPrimary.shortText}</span>
              <span className="long-text">{buttonPrimary.longText}</span>
            </button>

            <span css={styles.StyledText}>or</span>

            <button
              type="button"
              css={styles.StyledbuttonSecondary}
              onClick={buttonSecondary?.onClick}
              aria-label={buttonSecondary.text}
            >
              {buttonSecondary.text}
            </button>
          </div>

          {isDismissible && (
            <div css={styles.CloseButtonWrapper}>
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
