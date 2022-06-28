import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { shape } from 'prop-types';
import path from 'ramda/src/path';
import { storyItem } from '#models/propTypes/storyItem';
import Promo from '../../../Promo';
import { StyledPromoHeading } from '../index.styles';

const TopStoriesItem = ({ item }) => {
  const { script, service } = useContext(ServiceContext);
  const timestamp = path(['timestamp'], item);
  const mediaType = path(['media', 'format'], item);
  const url = path(['locators', 'assetUri'], item);

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

TopStoriesItem.propTypes = {
  item: shape(storyItem).isRequired,
};

TopStoriesItem.defaultProps = {};

export default TopStoriesItem;
