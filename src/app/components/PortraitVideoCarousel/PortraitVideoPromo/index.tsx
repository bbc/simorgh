/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PortraitVideoItemProps } from '#app/models/types/portraitVideo';
import Image from '#app/components/Image';
import Heading from '../../Heading';
import styles from './index.styles';

export default (item: PortraitVideoItemProps) => {
  const { images, headlines, onClick } = item;

  const imageUrl = images?.[0]?.url;
  const alt = images?.[0]?.altText || '';
  const headline = headlines?.promoHeadline || '';

  return (
    <button type="button" onClick={onClick} css={styles.promoItemButton}>
      {imageUrl && (
        <Image alt={alt} src={imageUrl} css={styles.image} lazyLoad />
      )}
      <div css={styles.gradientOverlay}>
        <Heading level={3} size="longPrimer" css={styles.promoHeading}>
          {headline}
        </Heading>
      </div>
    </button>
  );
};
