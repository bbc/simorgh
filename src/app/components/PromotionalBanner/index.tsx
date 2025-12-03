import type { PromotionalBannerProps } from './index.types';
import styles from './index.styles';
import { Close } from '../icons';
import Text from '../Text';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import VisuallyHiddenText from '../VisuallyHiddenText';

const PromotionalBanner = ({
  title,
  description,
  isDismissible = true,
  orText,
  primaryButton,
  secondaryButton,
  onClose,
  onPrimaryClick,
  onSecondaryClick,
  bannerLabel,
  closeLabel,
  id = 'promotional-banner',
}: PromotionalBannerProps) => {
  return (
    <aside css={styles.banner} role="complementary" aria-labelledby={id}>
      <VisuallyHiddenText as="strong" id={id}>
        {bannerLabel}
      </VisuallyHiddenText>
      <div css={styles.innerContainer}>
        <div css={styles.content}>
          <div css={styles.textContainer}>
            <Heading level={2} css={styles.title} size="paragon">
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
              onClick={onPrimaryClick}
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
              onClick={onSecondaryClick}
            >
              {secondaryButton?.text}
            </Text>
          </div>
        </div>
        {isDismissible && onClose && (
          <Text
            as="button"
            type="button"
            css={styles.closeButton}
            onClick={onClose}
          >
            <VisuallyHiddenText>{closeLabel}</VisuallyHiddenText>
            <Close css={styles.closeButtonIcon} />
          </Text>
        )}
      </div>
    </aside>
  );
};

export default PromotionalBanner;
