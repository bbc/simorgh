import React from 'react';
import styled from '@emotion/styled';

import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';

import { C_GREY_2 } from '@bbc/psammead-styles/colours';

import { articleDataPropTypes } from '#models/propTypes/article';

import TopStories from '#containers/CpsTopStories';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { Secondary, gridColumnsSecondary } from './ArticlePageGrid';

const ResponsiveComponentWrapper = styled.div`
  margin-bottom: ${GEL_SPACING_TRPL};
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING};
    padding: ${GEL_SPACING_DBL};
  }
`;

const SecondaryColumn = ({ pageData }) => {
  const topStoriesContent = pageData?.secondaryColumn?.topStories;
  const featuresContent = pageData?.secondaryColumn?.features;

  if (!topStoriesContent && !featuresContent) return null;

  return (
    <Secondary>
      {topStoriesContent && (
        <ResponsiveComponentWrapper data-testid="top-stories">
          <TopStories
            content={topStoriesContent}
            parentColumns={gridColumnsSecondary}
            sectionLabelBackground={C_GREY_2}
          />
        </ResponsiveComponentWrapper>
      )}
      {featuresContent && (
        <ResponsiveComponentWrapper data-testid="features">
          <FeaturesAnalysis
            content={featuresContent}
            parentColumns={gridColumnsSecondary}
            sectionLabelBackground={C_GREY_2}
          />
        </ResponsiveComponentWrapper>
      )}
    </Secondary>
  );
};

SecondaryColumn.propTypes = {
  pageData: articleDataPropTypes.isRequired,
};

export default SecondaryColumn;
