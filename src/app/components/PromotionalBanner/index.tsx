import Heading from '../Heading';
import { Close } from '../icons';
import Paragraph from '../Paragraph';
import Text from '../Text';
import VisuallyHiddenText from '../VisuallyHiddenText';
import styles from './index.styles';
import type { PromotionalBannerProps } from './index.types';

const PromotionalBanner = ({
  title,
  description,
  isDismissible = true,
  buttonSeparatorText,
  primaryButton,
  secondaryButton,
  onClose,
  onPrimaryClick,
  onSecondaryClick,
  bannerLabel,
  closeLabel,
  id = 'promotional-banner',
  children,
}: PromotionalBannerProps) => (
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
          {children ?? (
            <>
              {primaryButton && (
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
              )}

              {primaryButton && secondaryButton && (
                <Paragraph size="bodyCopy" css={styles.dividerText}>
                  {buttonSeparatorText}
                </Paragraph>
              )}

              {secondaryButton && (
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
              )}
            </>
          )}
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

export default PromotionalBanner;
