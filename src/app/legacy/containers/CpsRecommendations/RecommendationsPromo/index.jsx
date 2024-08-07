import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import { getPica } from '#psammead/gel-foundations/src/typography';

import { RequestContext } from '../../../../contexts/RequestContext';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import Grid from '../../../components/Grid';
import RecommendationsImage from '../RecommendationsPromoImage';
import useCombinedClickTrackerHandler from '../../StoryPromo/useCombinedClickTrackerHandler';
import extractPromoData from './utility';

const StyledPromoWrapper = styled.div`
  position: relative;
  padding: ${GEL_SPACING};
  margin-top: ${GEL_SPACING};
  background-color: ${props => props.theme.palette.GHOST};
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
  width: ${props => (props.theme.isLite ? '100%' : 'calc(100% - 7.5rem)')};
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
  color: ${props => props.theme.palette.GREY_10};
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
    color: ${props => props.theme.palette.METAL};
  }
`;

const StyledHeadline = styled.div`
  ${({ service }) => getSerifMedium(service)}
  ${({ script }) => getPica(script)}
  color: ${props => props.theme.palette.GREY_10};
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

const RecommendationsPromo = ({ promo, eventTrackingData = null }) => {
  const { script, service } = useContext(ServiceContext);
  const { isLite } = useContext(RequestContext);
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);

  const { headline, url, indexImage } = extractPromoData({ promo });

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
        {!isLite && (
          <ImageWrapper>
            <RecommendationsImage indexImage={indexImage} lazyLoad />
          </ImageWrapper>
        )}
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

export default RecommendationsPromo;
