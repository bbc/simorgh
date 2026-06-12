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
  topImage,
  variant,
}: PromotionalBannerProps) => {
  const variantOverrides = variant ? styles.variantStyles[variant] : undefined;

  return (
    <aside
      css={[styles.banner, variantOverrides?.banner]}
      role="complementary"
      aria-labelledby={id}
    >
      <VisuallyHiddenText as="strong" id={id}>
        {bannerLabel}
      </VisuallyHiddenText>
      <div css={styles.innerContainer}>
        <div css={[styles.content, variantOverrides?.content]}>
          {topImage}
          <div css={[styles.textContainer, variantOverrides?.textContainer]}>
            <Heading
              level={2}
              css={[styles.title, variantOverrides?.title]}
              size="paragon"
            >
              {title}
            </Heading>
            <Paragraph
              css={[styles.description, variantOverrides?.description]}
              size="longPrimer"
            >
              {description}
            </Paragraph>
          </div>

          <div
            css={[styles.actionsContainer, variantOverrides?.actionsContainer]}
          >
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
                      <span className="long-text">
                        {primaryButton.longText}
                      </span>
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
            css={[styles.closeButton, variantOverrides?.closeButton]}
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
