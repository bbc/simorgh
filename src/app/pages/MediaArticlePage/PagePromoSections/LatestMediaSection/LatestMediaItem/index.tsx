import { forwardRef } from 'react';

import Promo from '../../../../../legacy/components/OptimoPromos';
import { LatestMediaItemProp } from '../types';
import LatestMediaIndicator from '../LatestMediaIndicator';
import styles from './index.styles';

const LatestMediaItem = forwardRef<HTMLDivElement, LatestMediaItemProp>(
  ({ item, ariaLabelledBy, eventTrackingData }, viewTracker) => {
    if (!item || Object.keys(item).length === 0) return null;

    const timestamp = item.firstPublished;

    const src = item.imageUrl.replace('{width}', '240');

    return (
      <div {...viewTracker} className={styles.promoWrapper}>
        <Promo
          to={item.link}
          ariaLabelledBy={ariaLabelledBy}
          mediaType={item.type}
          eventTrackingData={eventTrackingData}
          className={`removeBackground ${styles.promoStyle}`}
        >
          <div className={styles.imageWrapper}>
            <Promo.Image
              src={src}
              altText={item.imageAlt ?? 'Media image placeholder'}
              width={240}
              height={135}
            />
            <LatestMediaIndicator duration={item.duration} />
          </div>
          <div className={styles.textWrapper(false)}>
            <Promo.Title as="h3" className={styles.promoTitle}>
              <Promo.Link
                className={`focusIndicatorInvert ${styles.promoLink}`}
              >
                <Promo.Content
                  mediaDuration={item.duration}
                  headline={item.title}
                  isPhotoGallery={false}
                  isLive={false}
                />
              </Promo.Link>
            </Promo.Title>
            <Promo.Timestamp className={styles.timeStamp}>
              {timestamp}
            </Promo.Timestamp>
          </div>
        </Promo>
      </div>
    );
  },
);

export default LatestMediaItem;
