import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { string } from 'prop-types';

import Promo from '../../../Promo';
import { StyledPromoHeading } from '../index.styles';

const TopStoriesItem = ({ url, heading, mediaType, timestamp }) => {
  const { script, service } = useContext(ServiceContext);
  return (
    <Promo.BoxWrapper>
      {mediaType && <Promo.MediaIndicator mediaType={mediaType} />}
      <StyledPromoHeading script={script} service={service}>
        <Promo.Link href={url}>{heading}</Promo.Link>
      </StyledPromoHeading>
      <Promo.Timestamp>{timestamp}</Promo.Timestamp>
    </Promo.BoxWrapper>
  );
};

TopStoriesItem.propTypes = {
  mediaType: string,
  heading: string.isRequired,
  timestamp: string,
  url: string.isRequired,
};

TopStoriesItem.defaultProps = { mediaType: '', timestamp: '' };

export default TopStoriesItem;
