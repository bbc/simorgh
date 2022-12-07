import React, { useContext, forwardRef } from 'react';
import { shape, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import { storyItem } from '#models/propTypes/storyItem';
import { getIsLive } from '#lib/utilities/getStoryPromoInfo';
import Promo from '#components/OptimoPromos';
import { ServiceContext } from '../../../../../contexts/ServiceContext';
import {
  StyledTitle,
  StyledTimestamp,
  TitleWithContent,
  StyledTopStoriesWrapper,
} from './index.styles';

const TopStoriesItem = forwardRef(
  ({ item, ariaLabelledBy, eventTrackingData }, viewRef) => {
    const { script, translations } = useContext(ServiceContext);

    if (!item || isEmpty(item)) return null;

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

    const titleTag = timestamp || isLive ? 'h3' : 'div';

    const titleHasContent = titleTag === 'h3';

    const Title = titleHasContent ? TitleWithContent : StyledTitle;

    return (
      <StyledTopStoriesWrapper ref={viewRef}>
        <Promo
          to={assetUri || uri}
          ariaLabelledBy={ariaLabelledBy}
          mediaType={mediaType}
          eventTrackingData={eventTrackingData}
        >
          <Promo.ContentWrapper>
            {mediaType && <Promo.MediaIndicator />}
            <Title as={titleTag} script={script}>
              <Promo.Link>
                {isLive ? (
                  <Promo.LiveLabel
                    liveText={liveLabel}
                    ariaHidden={liveLabelIsEnglish}
                    offScreenText={liveLabelIsEnglish ? 'Live' : null}
                    id={ariaLabelledBy}
                  >
                    <Promo.Content
                      mediaDuration={mediaDuration}
                      headline={headline}
                      isPhotoGallery={isPhotoGallery}
                      isLive={isLive}
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
            </Title>
            <StyledTimestamp>{timestamp}</StyledTimestamp>
          </Promo.ContentWrapper>
        </Promo>
      </StyledTopStoriesWrapper>
    );
  },
);

TopStoriesItem.propTypes = {
  item: shape(storyItem).isRequired,
  ariaLabelledBy: string.isRequired,
  eventTrackingData: shape({ block: shape({ componentName: string }) }),
};

TopStoriesItem.defaultProps = { eventTrackingData: null };

export default TopStoriesItem;
