import React from 'react';
import styles from './PWAUpsellBanner.styles';

export const PWAUpsellBanner = ({
  title,
  description,
  handleClose,
  isDismissible = true,
  buttonOne,
  buttonTwo,
}) => {
  return (
    <div css={styles.ColoredContainer}>
      <div css={styles.Wrap}>
        <div css={styles.StyledContent}>
          <div css={styles.TextWrapper}>
            <h1 css={styles.StyledTitle}>{title}</h1>
            <p css={styles.StyledDescription}>{description}</p>
          </div>

          <div css={styles.CTAWrapper}>
            <button type="button">{buttonOne}</button>
            <button type="button">{buttonTwo}</button>
          </div>

          {isDismissible && (
            <div css={styles.CloseButtonWrapper}>
              <button type="button" onClick={handleClose}>
                X
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWAUpsellBanner;
