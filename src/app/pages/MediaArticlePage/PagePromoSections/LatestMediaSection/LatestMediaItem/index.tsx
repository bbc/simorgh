/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import isEmpty from 'ramda/src/isEmpty';
import Promo from '#components/OptimoPromos';
import { LatestMediaItemProp } from '../types';
import LatestMediaIndicator from '../LatestMediaIndicator';
import styles from './index.styles';

const LatestMediaItem = ({
  item,
  ariaLabelledBy,
  eventTrackingData,
  ref,
}: LatestMediaItemProp) => {
  if (!item || isEmpty(item)) return null;

  const timestamp = item.firstPublished;

  const src = item.imageUrl.replace('{width}', '240');

  return (
    <div ref={ref} css={styles.promoWrapper}>
      <Promo
        to={item.link}
        ariaLabelledBy={ariaLabelledBy}
        mediaType={item.type}
        eventTrackingData={eventTrackingData}
        className="removeBackground"
        css={styles.promoStyle}
      >
        <div css={styles.imageWrapper}>
          <Promo.Image
            src={src}
            altText={item.imageAlt ?? 'media image'}
            width={50}
            height={50}
          />
          <LatestMediaIndicator duration={item.duration} />
        </div>
        <div css={styles.textWrapper}>
          <Promo.Title as="h3" css={styles.promoTitle}>
            <Promo.Link css={styles.promoLink}>
              <Promo.Content
                mediaDuration={item.duration}
                headline={item.title}
                isPhotoGallery={false}
                isLive={false}
              />
            </Promo.Link>
          </Promo.Title>
          <Promo.Timestamp css={styles.timeStamp}>{timestamp}</Promo.Timestamp>
        </div>
      </Promo>
    </div>
  );
};

export default LatestMediaItem;
