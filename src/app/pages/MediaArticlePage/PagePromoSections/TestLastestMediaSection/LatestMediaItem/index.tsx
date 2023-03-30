import React, { useContext } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import Promo from '#components/OptimoPromos';
import { LatestMediaItemProp } from '../LatestMediaTypes';
import { ServiceContext } from '../../../../../contexts/ServiceContext';
import styles, { StyledTopStoriesWrapper } from './index.styles';

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
      <StyledTopStoriesWrapper ref={ref}>
        <Promo
          to={item.link}
          ariaLabelledBy={ariaLabelledBy}
          mediaType={item.type}
          eventTrackingData={eventTrackingData}
        >
          <Promo.ContentWrapper>
            <Promo.Title css={styles.StyledTitleCss} as="h3" script={script}>
              {/* <Promo.Link>{mediaType && <Promo.MediaIndicator />}</Promo.Link> */}
            </Promo.Title>
          </Promo.ContentWrapper>
          <p>{item.description}</p>
        </Promo>
      </StyledTopStoriesWrapper>

      <hr />
    </div>
  );
};

export default LatestMediaItem;
