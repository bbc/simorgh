/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PortraitVideoPromoProps } from '#app/models/types/portraitVideo';
import Image from '#app/components/Image';
import Text from '#app/components/Text';
import { Play } from '#app/components/icons';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './index.styles';

export default (item: PortraitVideoPromoProps) => {
  const { images, headlines, video, onClick } = item;

  const imageUrl = images?.[0]?.url;
  const alt = images?.[0]?.altText || '';
  const headline = headlines?.promoHeadline || '';
  const duration = video?.version.duration;
  const mediaType = 'video';
  const action = 'play video';

  const hiddenText = `${headline}, ${mediaType}, ${duration && duration}, ${action}`;

  return (
    <button type="button" onClick={onClick} css={styles.button}>
      <div css={styles.gradientOverlay}>
        <p>
          <VisuallyHiddenText as="strong">{hiddenText}</VisuallyHiddenText>
        </p>
        {duration && (
          <div css={styles.durationContainer} aria-hidden="true">
            <Play css={styles.playIcon} />
            <time>
              <Text size="brevier" css={styles.duration}>
                {duration}
              </Text>
            </time>
          </div>
        )}
        <Text size="pica" css={styles.title} aria-hidden="true">
          {headline}
        </Text>
      </div>
      {imageUrl && (
        <Image alt={alt} src={imageUrl} css={styles.image} lazyLoad />
      )}
    </button>
  );
};
