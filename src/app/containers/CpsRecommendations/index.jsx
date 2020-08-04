import React, { useContext } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import styled from 'styled-components';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import { StoryPromoLiBase, StoryPromoUl } from '@bbc/psammead-story-promo-list';
import { C_LUNAR, C_GHOST } from '@bbc/psammead-styles/colours';
import { GEL_SPACING, GEL_SPACING_HLF } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';

import StoryPromo from '../StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import CpsOnwardJourney from '../CpsOnwardJourney';
import Grid from '../../components/Grid';
import SkipLinkWrapper from '../../components/SkipLinkWrapper';

const StyledStoryPromoWrapper = styled.div`
  > div {
    display: grid;
    margin: ${GEL_SPACING_HLF} 0;
    background-color: ${C_GHOST};
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      margin: ${GEL_SPACING_HLF} 0;
    }
  }
`;

const RecommendationsWrapper = styled.div`
  background-color: ${C_LUNAR};
  padding-bottom: ${GEL_SPACING};
`;

const CpsRecommendations = ({ items, parentColumns }) => {
  const { recommendations, dir, translations, service } = useContext(
    ServiceContext,
  );
  const { enabled } = useToggle('cpsRecommendations');

  const { hasStoryRecommendations } = recommendations;

  if (!hasStoryRecommendations || !enabled || !items.length) return null;

  const title = pathOr(
    'You may also be interested in',
    ['recommendationTitle'],
    translations,
  );

  const { text, endTextVisuallyHidden } = path(['skipLink'], recommendations);

  const skipLinkTerms = {
    '%title%': title,
  };

  const endTextId = 'end-of-recommendations';

  const singleTransform = item => {
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
        dir={dir}
      >
        <StyledStoryPromoWrapper>
          <StoryPromo
            item={item}
            dir={dir}
            isRecommendation
            displaySummary={false}
          />
        </StyledStoryPromoWrapper>
      </Grid>
    );
  };

  const listTransform = promoItems => (
    <Grid
      columns={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 1,
        group5: 1,
      }}
      as={StoryPromoUl}
      enableGelGutters
      dir={dir}
    >
      {promoItems.map(item => (
        <Grid
          item
          columns={{
            group0: 1,
            group1: 1,
            group2: 1,
            group3: 1,
            group4: 1,
            group5: 1,
          }}
          as={StoryPromoLiBase}
          border={false}
          key={item.id || item.uri}
          dir={dir}
        >
          {singleTransform(item)}
        </Grid>
      ))}
    </Grid>
  );

  return (
    <SkipLinkWrapper
      service={service}
      endTextId={endTextId}
      text={text}
      endTextVisuallyHidden={endTextVisuallyHidden}
      terms={skipLinkTerms}
    >
      <RecommendationsWrapper>
        <CpsOnwardJourney
          labelId="recommendations-heading"
          title={title}
          content={items}
          parentColumns={parentColumns}
          singleTransform={singleTransform}
          listTransform={listTransform}
          sectionLabelOverrideAs="strong"
          sectionLabelBar={false}
          sectionLabelBackground={C_LUNAR}
          columnType="main"
        />
      </RecommendationsWrapper>
    </SkipLinkWrapper>
  );
};

export default CpsRecommendations;

CpsRecommendations.propTypes = {
  items: arrayOf(shape(storyItem)),
  parentColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
};

CpsRecommendations.defaultProps = {
  items: [],
  parentColumns: null,
};
