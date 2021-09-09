import React, { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';
import styled from '@emotion/styled';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { getPica } from '@bbc/gel-foundations/typography';
import { grid } from '@bbc/psammead-styles/detection';
import { C_EBON, C_METAL } from '@bbc/psammead-styles/colours';
import { shape, string, oneOfType } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
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

const ImageGridItem = styled.div`
  display: inline-block;
  position: relative;

  @supports (${grid}) {
    width: initial;
    grid-column: 1 / span 4;
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      grid-column: 1 / span 3;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const TextGridItem = styled.div`
  display: inline-block;

  @supports (${grid}) {
    display: block;
    width: initial;
    padding: initial;
    grid-column: 5 / span 8;
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      grid-column: 4 / span 9;
    }
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

const StyledHeadline = styled.h3`
  ${({ service }) => getSerifMedium(service)}
  ${({ script }) => getPica(script)}
  color: ${C_EBON};
  margin: 0;
  padding: ${GEL_SPACING} 0;
`;

const RecommendationsPromo = ({ promo, eventTrackingData }) => {
  const { script, service } = useContext(ServiceContext);
  const handleClickTracking = useCombinedClickTrackerHandler(eventTrackingData);
  const headline = pathOr(null, ['headlines', 'headline'], promo);
  const url = pathOr(null, ['locators', 'assetUri'], promo);
  const indexImage = pathOr(null, ['indexImage'], promo);

  return (
    <StyledPromoWrapper data-e2e="story-promo-wrapper">
      <PromoGridWrapper>
        <ImageGridItem>
          <ImageWrapper>
            <RecommendationsImage indexImage={indexImage} />
          </ImageWrapper>
        </ImageGridItem>
        <TextGridItem>
          <StyledHeadline script={script} service={service}>
            <Link
              href={url}
              onClick={eventTrackingData ? handleClickTracking : null}
            >
              {headline}
            </Link>
          </StyledHeadline>
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
