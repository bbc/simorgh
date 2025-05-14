/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PortraitVideoItemProps } from '#app/models/types/portraitVideoCarousel';
import Heading from '../../Heading';
import styles from './index.styles';

export default (item: PortraitVideoItemProps) => {
  const { images, headlines, id, onClick } = item;
  const image = images?.[0]?.url;
  const alt = images?.[0]?.altText || '';
  const headline = headlines?.promoHeadline || '';

  return (
    <button
      key={id}
      type="button"
      onClick={onClick}
      css={styles.promoItemButton}
    >
      {image && <img src={image} alt={alt} css={styles.image} loading="lazy" />}
      <div css={styles.gradientOverlay}>
        <Heading level={3} size="longPrimer" css={styles.promoHeading}>
          {headline}
        </Heading>
      </div>
    </button>
  );
};
