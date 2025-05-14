/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PortraitVideoItemProps } from '#app/models/types/portraitVideo';
import Heading from '../../Heading';
import styles from './index.styles';

export default (item: PortraitVideoItemProps) => {
  const { images, headlines, onClick } = item;
  const defaultImage = { url: '', altText: '' };

  const image = images?.[0] ?? defaultImage;
  const { url = '', altText = '' } = image;
  const headline = headlines?.promoHeadline || '';

  return (
    <button type="button" onClick={onClick} css={styles.promoItemButton}>
      {image && (
        <img src={url} alt={altText} css={styles.image} loading="lazy" />
      )}
      <div css={styles.gradientOverlay}>
        <Heading level={3} size="longPrimer" css={styles.promoHeading}>
          {headline}
        </Heading>
      </div>
    </button>
  );
};
