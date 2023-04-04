/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import Promo from '#components/OptimoPromos';
import { LatestMediaItemProp } from '../LatestMediaTypes';
import { ServiceContext } from '../../../../../contexts/ServiceContext';
import {
  // StyledPromoMediaIndicator,
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
          <Promo.Image src={src} altText="Hello" width={50} height={50} />
          {/* {item.type && <StyledPromoMediaIndicator />} */}
          <div>
            <Promo.Link>
              <StyledPromoTitle as="h3" script={script}>
                {item.title}
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
