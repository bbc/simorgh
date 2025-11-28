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
  id = 'promotional-banner',
}: PromotionalBannerProps) => {
  return (
    <aside css={styles.banner} role="complementary" aria-labelledby={id}>
      <div css={styles.innerContainer}>
        <div css={styles.content}>
          <div css={styles.textContainer}>
            <Heading level={2} css={styles.title} size="paragon" id={id}>
              {title}
            </Heading>
            <Paragraph css={styles.description} size="longPrimer">
              {description}
            </Paragraph>
          </div>

          <div css={styles.actionsContainer}>
            <Text
              as="button"
              type="button"
              css={styles.primaryButton}
              className="focusIndicatorInvert"
              onClick={primaryButton?.onClick}
              size="bodyCopy"
              fontVariant="sansBold"
            >
              <span className="short-text">{primaryButton.text}</span>
              {primaryButton.longText && (
                <span className="long-text">{primaryButton.longText}</span>
              )}
            </Text>

            <Paragraph size="bodyCopy" css={styles.dividerText}>
              {orText}
            </Paragraph>

            <Text
              as="button"
              type="button"
              css={styles.secondaryButton}
              className="focusIndicatorInvert"
              size="bodyCopy"
              fontVariant="sansBold"
              onClick={secondaryButton?.onClick}
            >
              {secondaryButton.text}
            </Text>
          </div>
        </div>
        {isDismissible && (
          <Text
            as="button"
            type="button"
            aria-label="close"
            css={styles.closeButton}
            onClick={handleClose}
          >
            <Close css={styles.closeButtonIcon} />
          </Text>
        )}
      </div>
    </aside>
  );
};

export default PromotionalBanner;
