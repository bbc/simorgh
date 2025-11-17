/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import styles from './index.styles';
import { Close } from '../icons';
import { ButtonBase } from './index.types';
import Text from '../Text';
import Paragraph from '../Paragraph';
import Heading from '../Heading';

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
            <Heading level={2} css={styles.styledTitle} id="banner-title">
              {title}
            </Heading>
            <Paragraph css={styles.styledDescription} id="banner-description">
              {description}
            </Paragraph>
          </div>

          <div css={styles.ctaWrapper}>
            <Text
              as="button"
              type="button"
              css={styles.styledButtonPrimary}
              onClick={handleInstallPWA}
              aria-label={buttonPrimary.shortText || buttonPrimary.longText}
            >
              <span className="short-text">{buttonPrimary.shortText}</span>
              <span className="long-text">{buttonPrimary.longText}</span>
            </Text>

            <span css={styles.styledText}>or</span>

            <Text
              as="button"
              type="button"
              css={styles.styledButtonSecondary}
              onClick={buttonSecondary?.onClick}
              aria-label={buttonSecondary.text}
            >
              {buttonSecondary.text}
            </Text>
          </div>

          {isDismissible && (
            <div>
              <Text
                as="button"
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
