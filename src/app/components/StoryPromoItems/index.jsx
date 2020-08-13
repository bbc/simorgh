import React from 'react';
import {
  StoryPromoLi,
  StoryPromoUl,
  StoryPromoLiBase,
} from '@bbc/psammead-story-promo-list';
import { arrayOf, shape, bool, string, number } from 'prop-types';
import styled from 'styled-components';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import { GEL_SPACING_HLF } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import StoryPromo from '#containers/StoryPromo';
import { storyItem } from '#models/propTypes/storyItem';
import Grid from '../Grid';

const ConditionalStyleWrapper = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children;
};

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

export const SinglePromoItem = ({
  dir,
  displayImage,
  displaySummary,
  isRecommendation,
  promo,
}) => {
  return (
    <StoryPromo
      dir={dir}
      displayImage={displayImage}
      displaySummary={displaySummary}
      isRecommendation={isRecommendation}
      item={promo}
    />
  );
};

export const SinglePromoItemGrid = ({
  dir,
  displayImage,
  displaySummary,
  isRecommendation,
  promo,
  singlePromoItemGridColumns,
}) => {
  return (
    <Grid columns={singlePromoItemGridColumns} enableGelGutters dir={dir}>
      <ConditionalStyleWrapper
        condition={isRecommendation}
        wrapper={children => (
          <StyledStoryPromoWrapper>{children}</StyledStoryPromoWrapper>
        )}
      >
        {SinglePromoItem({
          dir,
          promo,
          displayImage,
          displaySummary,
          isRecommendation,
        })}
      </ConditionalStyleWrapper>
    </Grid>
  );
};

export const MultiplePromoItems = ({
  content,
  dir,
  displayImage,
  displaySummary,
}) => {
  return (
    <StoryPromoUl>
      {content.map(item => (
        <StoryPromoLi key={item.id || item.uri}>
          {SinglePromoItem({
            promo: item,
            dir,
            displayImage,
            displaySummary,
          })}
        </StoryPromoLi>
      ))}
    </StoryPromoUl>
  );
};

export const MultiplePromoItemsGrid = ({
  dir,
  content,
  displaySummary,
  isRecommendation,
  singlePromoItemGridColumns,
  storyPromoBorder,
  storyPromoLiGridColumns,
  storyPromoUlGridColumns,
}) => {
  const storyPromoList = isRecommendation ? StoryPromoLiBase : StoryPromoLi;
  return (
    <Grid
      columns={storyPromoUlGridColumns}
      as={StoryPromoUl}
      enableGelGutters
      dir={dir}
    >
      {content.map(item => (
        <Grid
          border={storyPromoBorder}
          item
          columns={storyPromoLiGridColumns}
          as={storyPromoList}
          key={item.id || item.uri}
          dir={dir}
        >
          {SinglePromoItemGrid({
            dir,
            displaySummary,
            isRecommendation,
            promo: item,
            singlePromoItemGridColumns,
          })}
        </Grid>
      ))}
    </Grid>
  );
};

SinglePromoItem.propTypes = {
  dir: string,
  promo: shape({ storyItem }).isRequired,
  displayImage: bool,
  displaySummary: bool,
  isRecommendation: bool,
};

SinglePromoItem.defaultProps = {
  dir: string,
  displayImage: true,
  displaySummary: true,
  isRecommendation: null,
};

SinglePromoItemGrid.propTypes = {
  dir: string,
  promo: shape({ storyItem }).isRequired,
  isRecommendation: bool,
  displayImage: bool,
  displaySummary: bool,
  singlePromoItemGridColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }),
};

SinglePromoItemGrid.defaultProps = {
  dir: string,
  displayImage: true,
  displaySummary: true,
  isRecommendation: null,
  singlePromoItemGridColumns: null,
};

MultiplePromoItems.propTypes = {
  content: arrayOf(shape(storyItem)).isRequired,
  dir: string.isRequired,
  displayImage: bool,
  displaySummary: bool,
};

MultiplePromoItemsGrid.propTypes = {
  dir: string,
  displaySummary: bool,
  content: arrayOf(shape(storyItem)).isRequired,
  isRecommendation: bool,
  storyPromoBorder: bool,
  storyPromoLiGridColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }).isRequired,
  storyPromoUlGridColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }).isRequired,
  singlePromoItemGridColumns: shape({
    group0: number,
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number,
  }).isRequired,
};

MultiplePromoItems.defaultProps = {
  displayImage: true,
  displaySummary: true,
};

MultiplePromoItemsGrid.defaultProps = {
  dir: 'ltr',
  displaySummary: true,
  isRecommendation: null,
  storyPromoBorder: null,
};
