import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { shape, number, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import { storyItem } from '#models/propTypes/storyItem';
import { buildUniquePromoId } from '#app/containers/StoryPromo/utilities';
import { getIsLive } from '#lib/utilities/getStoryPromoInfo';
import Promo from '#containers/NewStoryPromo';
import { StyledPromoHeading } from './index.styles';

const TopStoriesItem = ({ item, index, labelId }) => {
  const { script, translations } = useContext(ServiceContext);

  const overtypedHeadline = pathOr('', ['headlines', 'overtyped'], item);
  const headline =
    overtypedHeadline || pathOr('', ['headlines', 'headline'], item);

  const mediaType = pathOr(null, ['media', 'format'], item);
  const mediaDuration = pathOr(null, ['media', 'duration'], item);
  const isPhotoGallery = pathOr(null, ['cpsType'], item) === 'PGL';

  const timestamp = pathOr(null, ['timestamp'], item);
  const url = pathOr(null, ['locators', 'assetUri'], item);
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

  const headingTagOverride = timestamp ? '' : 'div';

  return (
    <Promo to={url} id={linkId} mediaType={mediaType}>
      <Promo.ContentWrapper>
        {mediaType && <Promo.MediaIndicator />}
        <StyledPromoHeading
          script={script}
          headingTagOverride={headingTagOverride}
        >
          <Promo.Link>
            {isLive ? (
              <Promo.LiveLabel
                liveText={liveLabel}
                ariaHidden={liveLabelIsEnglish}
                offScreenText={liveLabelIsEnglish ? 'Live' : null}
              >
                <Promo.Content
                  mediaDuration={mediaDuration}
                  headline={headline}
                  isPhotoGallery={isPhotoGallery}
                />
              </Promo.LiveLabel>
            ) : (
              <Promo.Content
                mediaDuration={mediaDuration}
                headline={headline}
                isPhotoGallery={isPhotoGallery}
              />
            )}
          </Promo.Link>
        </StyledPromoHeading>
        <Promo.Timestamp>{timestamp}</Promo.Timestamp>
      </Promo.ContentWrapper>
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
