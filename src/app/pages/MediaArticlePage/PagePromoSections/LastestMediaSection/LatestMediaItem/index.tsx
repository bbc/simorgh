/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import isEmpty from 'ramda/src/isEmpty';
import Promo from '#components/OptimoPromos';
import { LatestMediaItemProp } from '../LatestMediaTypes';
import LatestMediaIndicator from '../LatestMediaIndicator';
import {
  ImageWrapper,
  StyledPromoTitle,
  StyledTimestamp,
  styles,
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
      <Promo
        to={item.link}
        ariaLabelledBy={ariaLabelledBy}
        mediaType={item.type}
        eventTrackingData={eventTrackingData}
      >
        <ImageWrapper>
          <Promo.Image src={src} altText="Hello" width={50} height={50} />
          <LatestMediaIndicator>{item.duration}</LatestMediaIndicator>
        </ImageWrapper>
        <div css={styles.textWrapper}>
          <Promo.Link>
            <StyledPromoTitle as="h3">
              <Promo.Content
                mediaDuration={item.description}
                headline={item.title}
                isPhotoGallery={false}
                isLive={false}
              />
            </StyledPromoTitle>
          </Promo.Link>
          <StyledTimestamp>{timestamp}</StyledTimestamp>
        </div>
      </Promo>
    </div>
  );
};

export default LatestMediaItem;
