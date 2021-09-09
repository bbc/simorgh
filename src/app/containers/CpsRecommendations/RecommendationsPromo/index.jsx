import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { Link } from '@bbc/psammead-story-promo';
import { grid } from '@bbc/psammead-styles/detection';
import styled from '@emotion/styled';
import { shape, string, oneOfType } from 'prop-types';
import RecommendationsImage from '../RecommendationsPromoImage';
import { storyItem } from '#models/propTypes/storyItem';
import useCombinedClickTrackerHandler from '../../StoryPromo/useCombinedClickTrackerHandler';

const StyledPromoWrapper = styled.div`
  padding: ${GEL_SPACING};
  margin-top: 8px;
  background-color: #f6f6f6;
  > div {
    display: grid;
  }
`;

const StyledLink = styled(Link)`
  overflow-wrap: anywhere;
`;

const TextGridItem = styled.div`
  display: inline-block;

  @supports (${grid}) {
    display: block;
    width: initial;
    padding: initial;
    grid-column: 4 / span 9;
  }
`;

const ImageGridItem = styled.div`
  display: inline-block;
  position: relative;

  @supports (${grid}) {
    width: initial;
    grid-column: 1 / span 3;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const PromoGridWrapper = styled.div`
  position: relative;
  @supports (${grid}) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: ${GEL_SPACING};

    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      grid-column-gap: ${GEL_SPACING_DBL};
    }

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      display: block;
    }
  }
`;

const RecommendationsPromo = ({ promo, eventTrackingData }) => {
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);
  const headline = pathOr(null, ['headlines', 'headline'], promo);
  const url = pathOr(null, ['locators', 'assetUri'], promo);

  return (
    <StyledPromoWrapper data-e2e="story-promo-wrapper">
      <PromoGridWrapper>
        <ImageGridItem>
          <ImageWrapper>
            <RecommendationsImage item={promo} />
          </ImageWrapper>
        </ImageGridItem>
        <TextGridItem>
          <StyledLink
            href={url}
            onClick={eventTrackingData ? handleClickTracking : null}
          >
            {headline}
          </StyledLink>
        </TextGridItem>
      </PromoGridWrapper>
    </StyledPromoWrapper>
  );
};

RecommendationsPromo.propTypes = {
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
