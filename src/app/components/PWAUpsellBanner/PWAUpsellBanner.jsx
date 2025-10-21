import React, { useState } from 'react';
import styles from './PWAUpsellBanner.styles';
import { Close } from '../icons';

export const PWAUpsellBanner = ({
  title,
  description,
  isDismissible = true,
  buttonOne,
  buttonTwo,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = event => {
    event.preventDefault();
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

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
            <button type="button" css={styles.StyledButtonOne}>
              {buttonOne}
            </button>

            <text css={styles.StyledText}>or</text>

            <button
              type="button"
              css={styles.StyledButtonTwo}
              onClick={handleClose}
            >
              {buttonTwo}
            </button>
          </div>

          {isDismissible && (
            <div css={styles.CloseButtonWrapper}>
              <a
                aria-label="Close submenu"
                css={styles.subNavCloseButton}
                href="closeButton"
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
