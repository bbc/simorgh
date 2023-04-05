/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import isEmpty from 'ramda/src/isEmpty';
import Promo from '#components/OptimoPromos';
import { LatestMediaItemProp } from '../LatestMediaTypes';
import LatestMediaIndicator from '../LatestMediaIndicator';
import {
  PlaceholderWrapper,
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
    <div ref={ref} css={styles.gridOuter}>
      <Promo
        to={item.link}
        ariaLabelledBy={ariaLabelledBy}
        mediaType={item.type}
        eventTrackingData={eventTrackingData}
      >
        <div css={styles.gridInner}>
          <PlaceholderWrapper>
            <Promo.Image src={src} altText="Hello" width={50} height={50} />
            <LatestMediaIndicator>{item.duration}</LatestMediaIndicator>
          </PlaceholderWrapper>
          <div>
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
        </div>
      </Promo>
    </div>
  );
};

export default LatestMediaItem;
