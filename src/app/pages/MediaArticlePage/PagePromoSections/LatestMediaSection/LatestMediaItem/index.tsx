/** @jsx jsx */
import { forwardRef } from 'react';
import { jsx } from '@emotion/react';

import Promo from '../../../../../legacy/components/OptimoPromos';
import { LatestMediaItemProp } from '../types';
import LatestMediaIndicator from '../LatestMediaIndicator';
import styles from './index.styles';

const LatestMediaItem = forwardRef<HTMLDivElement, LatestMediaItemProp>(
  ({ item, ariaLabelledBy, eventTrackingData }, viewRef) => {
    if (!item || Object.keys(item).length === 0) return null;

    const timestamp = item.firstPublished;

    const src = item.imageUrl.replace('{width}', '240');

    return (
      <div ref={viewRef} css={styles.promoWrapper}>
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
              altText={item.imageAlt ?? 'Media image placeholder'}
              width={240}
              height={135}
            />
            <LatestMediaIndicator duration={item.duration} />
          </div>
          <div css={styles.textWrapper}>
            <Promo.Title as="h3" css={styles.promoTitle}>
              <Promo.Link
                css={styles.promoLink}
                className="focusIndicatorInvert"
              >
                <Promo.Content
                  mediaDuration={item.duration}
                  headline={item.title}
                  isPhotoGallery={false}
                  isLive={false}
                />
              </Promo.Link>
            </Promo.Title>
            <Promo.Timestamp css={styles.timeStamp}>
              {timestamp}
            </Promo.Timestamp>
          </div>
        </Promo>
      </div>
    );
  },
);

export default LatestMediaItem;
