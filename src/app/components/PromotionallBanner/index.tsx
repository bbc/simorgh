/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import styles from './index.styles';
import { Close } from '../icons';
import { ButtonBase } from './index.types';
import Text from '../Text';
import Paragraph from '../Paragraph';
import Heading from '../Heading';

interface PromotionalBannerProps {
  title: string;
  description: string;
  orText: string;
  isDismissible?: boolean;
  primaryButton: ButtonBase & { shortText: string; longText: string };
  secondaryButton: ButtonBase & { text?: string };
  handleClose: () => void;
  handlePrimaryAction: () => void;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  title,
  description,
  isDismissible = true,
  orText,
  primaryButton,
  secondaryButton,
  handleClose,
  handlePrimaryAction,
}) => {
  return (
    <div css={styles.banner}>
      <div css={styles.innerContainer}>
        <div css={styles.content}>
          <div css={styles.textContainer}>
            <Heading level={2} css={styles.title} id="banner-title">
              {title}
            </Heading>
            <Paragraph css={styles.description} id="banner-description">
              {description}
            </Paragraph>
          </div>

          <div css={styles.actionsContainer}>
            <Text
              as="button"
              type="button"
              css={styles.primaryButton}
              onClick={handlePrimaryAction}
              aria-label={primaryButton.shortText || primaryButton.longText}
            >
              <span className="short-text">{primaryButton.shortText}</span>
              <span className="long-text">{primaryButton.longText}</span>
            </Text>

            <span css={styles.dividerText}>{orText}</span>

            <Text
              as="button"
              type="button"
              css={styles.secondaryButton}
              onClick={secondaryButton?.onClick}
              aria-label={secondaryButton.text}
            >
              {secondaryButton.text}
            </Text>
          </div>

          {isDismissible && (
            <div>
              <Text
                as="button"
                type="button"
                aria-label="close"
                css={styles.closeButton}
                onClick={handleClose}
              />
              <Close css={styles.closeButtonIcon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
