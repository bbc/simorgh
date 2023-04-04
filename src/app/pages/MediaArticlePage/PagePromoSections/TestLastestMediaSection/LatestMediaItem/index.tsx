/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import Promo from '#components/OptimoPromos';
import { LatestMediaItemProp } from '../LatestMediaTypes';
import { ServiceContext } from '../../../../../contexts/ServiceContext';
import {
  PlaceholderWrapper,
  PlaceholderInfo,
  StyledPromoMediaIndicator,
  StyledPromoTitle,
  StyledTimestamp,
  styles,
} from './index.styles';

const formatMediaDuration = (mediaDuration: string) => {
  const separator = ':';
  const duration = moment.duration(mediaDuration, 'seconds');
  const durationString = formatDuration({ duration, separator }) as string;
  return durationString;
};

const LatestMediaItem = ({
  item,
  ariaLabelledBy,
  eventTrackingData,
  ref,
}: LatestMediaItemProp) => {
  const { script } = useContext(ServiceContext);

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
            <div css={styles.placeholderInfo}>
              <div>
                {item.type && <StyledPromoMediaIndicator />}
                {formatMediaDuration(item.duration)}
              </div>
            </div>
          </PlaceholderWrapper>
          <div>
            <Promo.Link>
              <StyledPromoTitle as="h3" script={script}>
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
      <hr />
    </div>
  );
};

export default LatestMediaItem;
