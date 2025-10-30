import React, { useState, useEffect } from 'react';
import styles from './banner.styles';
import { Close } from '../icons';

export const PWAUpsellBanner = ({
  title,
  description,
  isDismissible = true,
  buttonPrimary,
  buttonSecondary,
  serviceBackground,
  handleClose,
  handleAddShortcut,
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
              onClick={handleAddShortcut}
            >
              <span className="short-text">{buttonPrimary.shortText}</span>
              <span className="long-text">{buttonPrimary.longText}</span>
            </button>

            <span css={styles.StyledText}>or</span>

            <button
              type="button"
              css={styles.StyledbuttonSecondary}
              onClick={buttonSecondary?.onClick}
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

export default PWAUpsellBanner;
