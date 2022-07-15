import React, { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { shape, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import { storyItem } from '#models/propTypes/storyItem';
import { getIsLive } from '#lib/utilities/getStoryPromoInfo';
import Promo from '#components/OptimoPromos';
import { StyledPromoTitle, StyledTimestamp } from './index.styles';

const TopStoriesItem = ({ item, a11yId }) => {
  const { script, translations } = useContext(ServiceContext);

  if (!item || isEmpty(item)) return null;

  const eventTrackingData = {
    block: {
      componentName: 'top-stories',
    },
  };

  const overtypedHeadline = pathOr('', ['headlines', 'overtyped'], item);
  const headline =
    overtypedHeadline ||
    pathOr('', ['headlines', 'headline'], item) ||
    pathOr('', ['name'], item);

  const mediaType = pathOr(null, ['media', 'format'], item);
  const mediaDuration = pathOr(null, ['media', 'duration'], item);
  const isPhotoGallery = pathOr(null, ['cpsType'], item) === 'PGL';

  const timestamp = pathOr(null, ['timestamp'], item);

  const assetUri = pathOr('', ['locators', 'assetUri'], item);
  const uri = pathOr('', ['uri'], item);

  const isLive = getIsLive(item);

  const liveLabel = pathOr('LIVE', ['media', 'liveLabel'], translations);

  // As screenreaders mispronounce the word 'LIVE', we use visually hidden
  // text to read 'Live' instead, which screenreaders pronounce correctly.
  const liveLabelIsEnglish = liveLabel === 'LIVE';

  const titleTagOverride = timestamp ? '' : 'div';

  return (
    <Promo
      toLink={assetUri || uri}
      a11yId={a11yId}
      mediaType={mediaType}
      eventTrackingData={eventTrackingData}
    >
      <Promo.ContentWrapper>
        {mediaType && <Promo.MediaIndicator />}
        <StyledPromoTitle script={script} titleTagOverride={titleTagOverride}>
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
        </StyledPromoTitle>
        <StyledTimestamp>{timestamp}</StyledTimestamp>
      </Promo.ContentWrapper>
    </Promo>
  );
};

TopStoriesItem.propTypes = {
  item: shape(storyItem).isRequired,
  a11yId: string.isRequired,
};

export default TopStoriesItem;
