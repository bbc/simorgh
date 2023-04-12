/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import isEmpty from 'ramda/src/isEmpty';
import Promo from '#components/OptimoPromos';
import { LatestMediaItemProp } from '../LatestMediaTypes';
import LatestMediaIndicator from '../LatestMediaIndicator';
import {
  StyledPromoTitle,
  StyledTimestamp,
  styles,
  StyledPromo,
} from './index.styles';

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
      <StyledPromo
        to={item.link}
        ariaLabelledBy={ariaLabelledBy}
        mediaType={item.type}
        eventTrackingData={eventTrackingData}
        className="removeBackground"
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
          <StyledPromoTitle as="h3">
            <Promo.Link css={styles.promoLink}>
              <Promo.Content
                mediaDuration={item.duration}
                headline={item.title}
                isPhotoGallery={false}
                isLive={false}
              />
            </Promo.Link>
          </StyledPromoTitle>
          <StyledTimestamp>{timestamp}</StyledTimestamp>
        </div>
      </StyledPromo>
    </div>
  );
};

export default LatestMediaItem;
