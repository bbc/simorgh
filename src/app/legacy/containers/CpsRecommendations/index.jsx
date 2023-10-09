import React, { useContext } from 'react';
import { useTheme } from '@emotion/react';
import { arrayOf, shape, oneOfType } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import SectionLabel from '#psammead/psammead-section-label/src';
import SkipLinkWrapper from '#components/SkipLinkWrapper';
import { storyItem, optimoStoryItem } from '#models/propTypes/storyItem';
import useToggle from '#hooks/useToggle';
import { GridItemMediumNoMargin } from '#components/Grid';

import { ARTICLE_PAGE } from '../../../routes/utils/pageTypes';
import { RequestContext } from '../../../contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';
import RecommendationsPromoList from './RecommendationsPromoList';
import RecommendationsPromo from './RecommendationsPromo';
import ErrorBoundary from './ErrorBoundary';

const RecommendationsWrapper = styled.div`
  background-color: ${props =>
    props.isArticlePage
      ? props.theme.palette.GREY_2
      : props.theme.palette.GHOST};
  margin: ${GEL_SPACING_TRPL} 0;
  padding: ${GEL_SPACING_DBL} ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: 0 0 ${GEL_SPACING_TRPL};
    padding: 0 ${GEL_SPACING_DBL} ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: 0 0 ${GEL_SPACING_TRPL};
    padding: ${GEL_SPACING_DBL} 0;
  }
`;

const LabelComponent = styled(SectionLabel)`
  margin: 0;
  padding: 0;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 0 ${GEL_SPACING};
  }
`;

const CpsRecommendations = ({ items }) => {
  const { recommendations, translations, script, service, dir } =
    useContext(ServiceContext);
  const { pageType } = useContext(RequestContext);
  const { enabled } = useToggle('cpsRecommendations');
  const isArticlePage = pageType === ARTICLE_PAGE;
  const labelId = 'recommendations-heading';
  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': labelId,
  };
  const {
    palette: { GREY_2, GHOST },
  } = useTheme();

  const { hasStoryRecommendations } = recommendations;

  if (!hasStoryRecommendations || !enabled || !items.length) return null;

  const titlePath = ['Recommended stories', ['recommendationTitle']];

  const title = pathOr(...titlePath, translations);

  const { text, endTextVisuallyHidden } = path(['skipLink'], recommendations);

  const terms = {
    '%title%': title,
  };

  const isSinglePromo = items.length === 1;

  const endTextId = `end-of-recommendations`;

  const skipLink = {
    endTextId,
    terms,
    text,
    endTextVisuallyHidden,
  };

  return (
    <ErrorBoundary recommendations={items}>
      <GridItemMediumNoMargin>
        <RecommendationsWrapper
          data-e2e={labelId}
          {...a11yAttributes}
          isArticlePage={isArticlePage}
        >
          <SkipLinkWrapper service={service} {...skipLink}>
            {title ? (
              <LabelComponent
                script={script}
                service={service}
                dir={dir}
                labelId={labelId}
                columnType="main"
                mobileDivider={false}
                overrideHeadingAs="strong"
                bar={false}
                backgroundColor={isArticlePage ? GREY_2 : GHOST}
              >
                {title}
              </LabelComponent>
            ) : null}
            {isSinglePromo ? (
              <RecommendationsPromo promo={items[0]} />
            ) : (
              <RecommendationsPromoList promoItems={items} />
            )}
          </SkipLinkWrapper>
        </RecommendationsWrapper>
      </GridItemMediumNoMargin>
    </ErrorBoundary>
  );
};

export default CpsRecommendations;

CpsRecommendations.propTypes = {
  items: arrayOf(oneOfType([shape(storyItem), shape(optimoStoryItem)])),
};

CpsRecommendations.defaultProps = {
  items: [],
};
