import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { shape, number, string } from 'prop-types';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { storyItem } from '#models/propTypes/storyItem';
import { buildUniquePromoId } from '#app/containers/StoryPromo/utilities';
import { getIsLive } from '#lib/utilities/getStoryPromoInfo';
import Promo from '../../../Promo';
import { StyledPromoHeading } from '../index.styles';

const TopStoriesItem = ({ item, index, labelId }) => {
  const { translations } = useContext(ServiceContext);
  const timestamp = path(['timestamp'], item);
  const mediaType = path(['media', 'format'], item);
  const url = path(['locators', 'assetUri'], item);
  const isLive = getIsLive(item);

  const liveLabel = pathOr('LIVE', ['media', 'liveLabel'], translations);

  // As screenreaders mispronounce the word 'LIVE', we use visually hidden
  // text to read 'Live' instead, which screenreaders pronounce correctly.
  const liveLabelIsEnglish = liveLabel === 'LIVE';

  const linkId = buildUniquePromoId({
    sectionType: 'top-stories',
    promoGroupId: labelId,
    promoItem: item,
    promoIndex: index,
  });

  return (
    <Promo to={url} id={linkId}>
      <Promo.BoxWrapper>
        {mediaType && <Promo.MediaIndicator type={mediaType} />}
        <StyledPromoHeading>
          <Promo.Link>
            {isLive ? (
              <Promo.LiveLabel
                liveText={liveLabel}
                ariaHidden={liveLabelIsEnglish}
                offScreenText={liveLabelIsEnglish ? 'Live' : null}
              >
                <Promo.Content item={item} />
              </Promo.LiveLabel>
            ) : (
              <Promo.Content item={item} />
            )}
          </Promo.Link>
        </StyledPromoHeading>
        <Promo.Timestamp>{timestamp}</Promo.Timestamp>
      </Promo.BoxWrapper>
    </Promo>
  );
};

TopStoriesItem.propTypes = {
  item: shape(storyItem).isRequired,
  index: number,
  labelId: string.isRequired,
};

TopStoriesItem.defaultProps = { index: null };

export default TopStoriesItem;
