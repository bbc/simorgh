import React, { useContext } from 'react';
import { arrayOf, shape, node } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import SectionLabel from '@bbc/psammead-section-label';
import SkipLinkWrapper from '#components/SkipLinkWrapper';

import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import { GridItemMediumNoMargin } from '#app/components/Grid';
import RecommendationsPromo from './RecommendationsPromo';
import RecommendationsPromoList from './RecommendationsPromoList';

const Wrapper = styled.div`
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;

// eslint-disable-next-line react/prop-types
const SkipWrapper = ({ skipLink, service, children }) => {
  return (
    <SkipLinkWrapper service={service} {...skipLink}>
      {children}
    </SkipLinkWrapper>
  );
};

const RecommendationsWrapper = styled.div`
  background-color: ${C_GHOST};
  margin: ${GEL_SPACING_TRPL} 0;
  padding: ${GEL_SPACING_DBL} 0;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin: 0 0 ${GEL_SPACING_TRPL};
    padding: 0 0 ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 0 ${GEL_SPACING_TRPL};
  }
`;

const SingleContentWrapper = styled.div`
  ${({ columnType }) =>
    columnType === 'secondary' &&
    `
    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding-top: ${GEL_SPACING_DBL};
    }
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_TRPL};
    }
  `}
`;

const LabelComponent = styled(SectionLabel)`
  margin: 0;
  padding: 0;
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 0 ${GEL_SPACING_DBL};
  }
`;

const CpsRecommendations = ({ items }) => {
  const { recommendations, translations, script, service, dir } = useContext(
    ServiceContext,
  );
  const { enabled } = useToggle('cpsRecommendations');
  const labelId = 'recommendations-heading';
  const a11yAttributes = {
    as: 'section',
    role: 'region',
    'aria-labelledby': labelId,
  };

  const hasSingleContent = items.length === 1;
  const [singleContent] = items;

  const CpsOnwardJourneyWrapper = ({ children }) => (
    <Wrapper data-e2e={labelId} {...a11yAttributes}>
      {children}
    </Wrapper>
  );

  CpsOnwardJourneyWrapper.propTypes = {
    children: node.isRequired,
  };

  const { hasStoryRecommendations } = recommendations;

  if (!hasStoryRecommendations || !enabled || !items.length) return null;

  const title = pathOr(
    'You may also be interested in',
    ['recommendationTitle'],
    translations,
  );

  const { text, endTextVisuallyHidden } = path(['skipLink'], recommendations);

  const terms = {
    '%title%': title,
  };

  const endTextId = 'end-of-recommendations';

  const skipLinkProps = {
    endTextId,
    terms,
    text,
    endTextVisuallyHidden,
  };

  return (
    <GridItemMediumNoMargin>
      <RecommendationsWrapper>
        <CpsOnwardJourneyWrapper>
          <SkipWrapper skipLink={skipLinkProps} service={service}>
            {title ? (
              <LabelComponent
                script={script}
                service={service}
                dir={dir}
                labelId={labelId}
                columnType="main"
                overrideHeadingAs="strong"
                bar={false}
                backgroundColor={C_GHOST}
              >
                {title}
              </LabelComponent>
            ) : null}
            {hasSingleContent ? (
              <SingleContentWrapper columnType="main">
                <RecommendationsPromo promo={singleContent} dir={dir} />
              </SingleContentWrapper>
            ) : (
              <RecommendationsPromoList promoItems={items} dir={dir} />
            )}
          </SkipWrapper>
        </CpsOnwardJourneyWrapper>
      </RecommendationsWrapper>
    </GridItemMediumNoMargin>
  );
};

export default CpsRecommendations;

CpsRecommendations.propTypes = {
  items: arrayOf(shape(storyItem)),
};

CpsRecommendations.defaultProps = {
  items: [],
};
