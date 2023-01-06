import React from 'react';
import path from 'ramda/src/path';
import { arrayOf, bool, shape, string } from 'prop-types';
import styled from '@emotion/styled';
import {
  StoryPromoLi,
  StoryPromoUl,
} from '#psammead/psammead-story-promo-list/src';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import { GEL_SPACING_DBL } from '#psammead/gel-foundations/src/spacings';
import { C_LUNAR } from '#psammead/psammead-styles/src/colours';
import { storyItem } from '#models/propTypes/storyItem';
import useViewTracker from '#hooks/useViewTracker';
import Grid from '../../../components/Grid';
import StoryPromo from '../../StoryPromo';

const MediaStoryPromoLi = styled(StoryPromoLi)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    border-bottom: 0.0625rem solid ${C_LUNAR};
    padding: ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
  }
`;

const MostWatchedOl = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

MostWatchedOl.defaultProps = {
  role: 'list',
  'data-e2e': 'most-watched-ol',
};

const RelatedContentPromoList = ({
  promoItems,
  dir,
  isMediaContent,
  eventTrackingData,
}) => {
  const blockLevelEventTrackingData = path(['block'], eventTrackingData);
  const viewRef = useViewTracker(blockLevelEventTrackingData);

  return (
    <Grid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 8,
      }}
      as={isMediaContent ? MostWatchedOl : StoryPromoUl}
      enableGelGutters
    >
      {promoItems.map((item, index) => (
        <Grid
          item
          columns={{
            group0: 6,
            group1: 6,
            group2: 6,
            group3: 6,
            group4: isMediaContent ? 8 : 4,
            group5: isMediaContent ? 8 : 4,
          }}
          as={isMediaContent ? MediaStoryPromoLi : StoryPromoLi}
          key={item.id || item.uri}
          ref={viewRef}
        >
          <StoryPromo
            item={item}
            index={index}
            dir={dir}
            displaySummary={false}
            isSingleColumnLayout={isMediaContent}
            eventTrackingData={eventTrackingData}
            labelId="rel-content"
          />
        </Grid>
      ))}
    </Grid>
  );
};

RelatedContentPromoList.propTypes = {
  dir: string.isRequired,
  isMediaContent: bool,
  promoItems: arrayOf(shape(storyItem)).isRequired,
  eventTrackingData: shape({
    componentName: string,
  }),
};

RelatedContentPromoList.defaultProps = {
  isMediaContent: false,
  eventTrackingData: null,
};

export default RelatedContentPromoList;
