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
}: PromotionalBannerProps) => {
  const [isPrimaryLongText, setIsPrimaryLongText] = useState(false);

  useMediaQuery(
    `(min-width: ${GROUP_2_MIN_WIDTH_BP}rem)`,
    (event: { matches: boolean | ((prevState: boolean) => boolean) }) => {
      setIsPrimaryLongText(event.matches);
    },
  );

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
              onClick={primaryButton?.onClick}
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
