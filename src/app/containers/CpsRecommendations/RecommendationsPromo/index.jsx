import React from 'react';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import styled from '@emotion/styled';
import { shape, string, oneOfType } from 'prop-types';
import Grid from '../../../components/Grid';
import StoryPromo from '../../StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';

const StyledStoryPromoWrapper = styled.div`
  margin-top: 8px;
  background-color: #f6f6f6;
  > div {
    display: grid;
    margin: ${GEL_SPACING};
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      margin: ${GEL_SPACING};
    }
  }
`;

const RecommendationsPromo = ({ promo, dir, eventTrackingData }) => {
  return (
    <Grid
      columns={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 1,
        group5: 1,
      }}
      enableGelGutters
    >
      <StyledStoryPromoWrapper data-e2e="story-promo-wrapper">
        <StoryPromo
          item={promo}
          dir={dir}
          isRecommendation
          displaySummary={false}
          eventTrackingData={eventTrackingData}
        />
      </StyledStoryPromoWrapper>
    </Grid>
  );
};

RecommendationsPromo.propTypes = {
  dir: string.isRequired,
  promo: oneOfType([shape(storyItem)]).isRequired,
  eventTrackingData: shape({
    block: shape({
      componentName: string,
    }),
    link: shape({
      componentName: string,
      url: string,
      format: string,
    }),
  }),
};

RecommendationsPromo.defaultProps = {
  eventTrackingData: null,
};

export default RecommendationsPromo;
