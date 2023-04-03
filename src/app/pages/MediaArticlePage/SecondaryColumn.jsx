import React from 'react';
import path from 'ramda/src/path';
import styled from '@emotion/styled';
// import { useTheme } from '@emotion/react';

import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';

import { articleDataPropTypes } from '#models/propTypes/article';

import LatestMediaSection from './PagePromoSections/TestLastestMediaSection';
import { Secondary } from './MediaArticlePageGrid';

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
  const latestMediaContent = path(['secondaryColumn', 'latestMedia'], pageData);

  if (!topStoriesContent && !featuresContent) return null;

  return (
    <Secondary>
      {latestMediaContent && (
        <ResponsiveComponentWrapper data-testid="latest-media">
          <LatestMediaSection content={latestMediaContent} />
        </ResponsiveComponentWrapper>
      )}
    </Secondary>
  );
};

SecondaryColumn.propTypes = {
  pageData: articleDataPropTypes.isRequired,
};

export default SecondaryColumn;
