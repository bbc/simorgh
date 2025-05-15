/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PortraitVideoPromoProps } from '#app/models/types/portraitVideo';
import Image from '#app/components/Image';
import Heading from '../../Heading';
import styles from './index.styles';

export default (item: PortraitVideoPromoProps) => {
  const { images, headlines, onClick } = item;

  const imageUrl = images?.[0]?.url;
  const alt = images?.[0]?.altText || '';
  const headline = headlines?.promoHeadline || '';

  return (
    <button type="button" onClick={onClick} css={styles.button}>
      {imageUrl && (
        <Image alt={alt} src={imageUrl} css={styles.image} lazyLoad />
      )}
      <div css={styles.gradientOverlay}>
        <Heading level={3} size="longPrimer" css={styles.heading}>
          {headline}
        </Heading>
      </div>
    </button>
  );
};
