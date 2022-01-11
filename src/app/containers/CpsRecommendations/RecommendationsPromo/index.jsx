import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { getPica } from '@bbc/gel-foundations/typography';
import { C_EBON, C_METAL, C_GREY_2 } from '@bbc/psammead-styles/colours';
import { shape, string, oneOfType } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import { storyItem } from '#models/propTypes/storyItem';
import Grid from '../../../components/Grid';
import RecommendationsImage from '../RecommendationsPromoImage';
import useCombinedClickTrackerHandler from '../../StoryPromo/useCombinedClickTrackerHandler';

const StyledPromoWrapper = styled.div`
  position: relative;
  padding: ${GEL_SPACING};
  margin-top: ${GEL_SPACING};
  background-color: ${C_GREY_2};
`;

const ImageWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 4.7rem;
  vertical-align: top;

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 6.8rem;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 7.5rem;
  }
`;

const TextWrapper = styled.div`
  display: inline-block;
  width: calc(100% - 7.5rem);
  padding: 0 ${GEL_SPACING};
  vertical-align: top;
  height: 100%;

  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    width: calc(100% - 5rem);
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;

const Link = styled.a`
  position: static;
  color: ${C_EBON};
  text-decoration: none;
  overflow-wrap: break-word;

  &:before {
    bottom: 0;
    content: '';
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    white-space: nowrap;
    z-index: 1;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:visited {
    color: ${C_METAL};
  }
`;

const StyledHeadline = styled.div`
  ${({ service }) => getSerifMedium(service)}
  ${({ script }) => getPica(script)}
  color: ${C_EBON};
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

const RecommendationsPromo = ({ promo, eventTrackingData }) => {
  const { script, service } = useContext(ServiceContext);
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);
  const headline = pathOr(null, ['headlines', 'headline'], promo);
  const url = pathOr(null, ['locators', 'assetUri'], promo);
  const indexImage = pathOr(null, ['indexImage'], promo);

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
      <StyledPromoWrapper data-e2e="story-promo-wrapper">
        <ImageWrapper>
          <RecommendationsImage indexImage={indexImage} lazyLoad />
        </ImageWrapper>
        <TextWrapper>
          <StyledHeadline script={script} service={service}>
            <Link
              href={url}
              onClick={eventTrackingData ? handleClickTracking : null}
            >
              {headline}
            </Link>
          </StyledHeadline>
        </TextWrapper>
      </StyledPromoWrapper>
    </Grid>
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
