import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { shape } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import Promo from '../../../Promo';
import { StyledPromoHeading } from '../index.styles';

const TopStoriesItem = ({ item }) => {
  const { script, service } = useContext(ServiceContext);
  const timestamp = pathOr(null, ['timestamp'], item);
  const mediaType = pathOr(null, ['media', 'format'], item);
  const url = pathOr(null, ['locators', 'assetUri'], item);

  return (
    <Promo.BoxWrapper>
      {mediaType && <Promo.MediaIndicator type={mediaType} />}
      <StyledPromoHeading script={script} service={service}>
        <Promo.Link href={url}>
          <Promo.Content item={item} id="random-idFornow" />
        </Promo.Link>
      </StyledPromoHeading>
      <Promo.Timestamp>{timestamp}</Promo.Timestamp>
    </Promo.BoxWrapper>
  );
};

TopStoriesItem.propTypes = {};

TopStoriesItem.defaultProps = { mediaType: '', timestamp: '' };

export default TopStoriesItem;
