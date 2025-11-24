/** @jsx jsx */
import { jsx } from '@emotion/react';
import type { PromotionalBannerProps } from './index.types';
import styles from './index.styles';
import { Close } from '../icons';
import Text from '../Text';
import Paragraph from '../Paragraph';
import Heading from '../Heading';

const PromotionalBanner = ({
  title,
  description,
  isDismissible = true,
  orText,
  primaryButton,
  secondaryButton,
  handleClose,
}: PromotionalBannerProps) => (
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
            onClick={primaryButton?.onClick}
            aria-label={primaryButton.text || primaryButton.longText}
          >
            <span className="short-text">{primaryButton.text}</span>
            {primaryButton.longText && (
              <span className="long-text">{primaryButton.longText}</span>
            )}
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

export default PromotionalBanner;
