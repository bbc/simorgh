/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState } from 'react';
import { GROUP_2_MIN_WIDTH_BP } from '../ThemeProvider/mediaQueries';
import type { PromotionalBannerProps } from './index.types';
import styles from './index.styles';
import { Close } from '../icons';
import Text from '../Text';
import Paragraph from '../Paragraph';
import Heading from '../Heading';
import useMediaQuery from '../../hooks/useMediaQuery';

const PromotionalBanner = ({
  title,
  description,
  isDismissible = true,
  orText,
  primaryButton,
  secondaryButton,
  handleClose,
  bannerAriaLabel,
}: PromotionalBannerProps) => {
  const [isPrimaryLongText, setIsPrimaryLongText] = useState(false);

  useMediaQuery(
    `(min-width: ${GROUP_2_MIN_WIDTH_BP}rem)`,
    (event: { matches: boolean | ((prevState: boolean) => boolean) }) => {
      setIsPrimaryLongText(event.matches);
    },
  );

  return (
    <aside
      css={styles.banner}
      role="complementary"
      aria-label={bannerAriaLabel}
    >
      <div css={styles.innerContainer}>
        <div css={styles.content}>
          <div css={styles.textContainer}>
            <Heading
              level={2}
              css={styles.title}
              size="paragon"
              id="banner-title"
            >
              {title}
            </Heading>
            <Paragraph
              css={styles.description}
              size="longPrimer"
              id="banner-description"
            >
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
              aria-label={
                isPrimaryLongText ? primaryButton.longText : primaryButton?.text
              }
            >
              {isPrimaryLongText ? primaryButton.longText : primaryButton?.text}
            </Text>

            <Text as="span" size="bodyCopy" css={styles.dividerText}>
              {orText}
            </Text>

            <Text
              as="button"
              type="button"
              css={styles.secondaryButton}
              className="focusIndicatorInvert"
              size="bodyCopy"
              fontVariant="sansBold"
              onClick={secondaryButton?.onClick}
              aria-label={secondaryButton.text}
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
