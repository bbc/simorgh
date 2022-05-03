import React from 'react';
import path from 'ramda/src/path';
import styled from '@emotion/styled';

import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#legacy/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#legacy/gel-foundations/src/spacings';

import { C_GREY_2 } from '#legacy/psammead-styles/src/colours';

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
  const topStoriesContent = path(['secondaryColumn', 'topStories'], pageData);
  const featuresContent = path(['secondaryColumn', 'features'], pageData);

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
