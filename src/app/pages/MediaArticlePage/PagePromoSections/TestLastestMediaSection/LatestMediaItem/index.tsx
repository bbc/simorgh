import React, { useContext } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import Promo from '#components/OptimoPromos';
import { LatestMediaItemProp } from '../LatestMediaTypes';
import { ServiceContext } from '../../../../../contexts/ServiceContext';
import {
  StyledPromoContentWrapper,
  StyledPromoMediaIndicator,
  StyledPromoTitle,
  StyledPromoWrapper,
} from './index.styles';

const LatestMediaItem = ({
  item,
  ariaLabelledBy,
  eventTrackingData,
  ref,
}: LatestMediaItemProp) => {
  const { script } = useContext(ServiceContext);

  if (!item || isEmpty(item)) return null;

  return (
    <div>
      <StyledPromoWrapper ref={ref}>
        <Promo
          to={item.link}
          ariaLabelledBy={ariaLabelledBy}
          mediaType={item.type}
          eventTrackingData={eventTrackingData}
        >
          <Promo.Link>
            <StyledPromoContentWrapper>
              {item.type && <StyledPromoMediaIndicator />}
              <StyledPromoTitle as="h3" script={script}>
                {item.title}
              </StyledPromoTitle>
            </StyledPromoContentWrapper>
          </Promo.Link>
        </Promo>
      </StyledPromoWrapper>

      <hr />
    </div>
  );
};

export default LatestMediaItem;
