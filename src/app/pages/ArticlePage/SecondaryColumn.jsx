/** @jsxRuntime classic */
/** @jsx jsx */

import path from 'ramda/src/path';
import styled from '@emotion/styled';
import { jsx, useTheme } from '@emotion/react';

import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';

import { articleDataPropTypes } from '#models/propTypes/article';

import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';

import styles from './ArticlePage.styles';

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

  const {
    palette: { GREY_2 },
  } = useTheme();

  if (!topStoriesContent && !featuresContent) return null;

  return (
    <div css={styles.secondaryColumn}>
      {topStoriesContent && (
        <ResponsiveComponentWrapper data-testid="top-stories">
          <TopStoriesSection content={topStoriesContent} />
        </ResponsiveComponentWrapper>
      )}
      {featuresContent && (
        <ResponsiveComponentWrapper data-testid="features">
          <FeaturesAnalysis
            content={featuresContent}
            parentColumns={{}}
            sectionLabelBackground={GREY_2}
          />
        </ResponsiveComponentWrapper>
      )}
    </div>
  );
};

SecondaryColumn.propTypes = {
  pageData: articleDataPropTypes.isRequired,
};

export default SecondaryColumn;
