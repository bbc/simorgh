/** @jsxRuntime classic */
/** @jsx jsx */

import path from 'ramda/src/path';
import { jsx, useTheme } from '@emotion/react';

import { articleDataPropTypes } from '#models/propTypes/article';

import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';
import styles from './MediaArticlePage.styles';

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
        <div
          css={styles.topStoriesAndFeaturesSection}
          data-testid="top-stories"
        >
          <TopStoriesSection content={topStoriesContent} />
        </div>
      )}
      {featuresContent && (
        <div css={styles.topStoriesAndFeaturesSection} data-testid="features">
          <FeaturesAnalysis
            content={featuresContent}
            parentColumns={{}}
            sectionLabelBackground={GREY_2}
          />
        </div>
      )}
    </div>
  );
};

SecondaryColumn.propTypes = {
  pageData: articleDataPropTypes.isRequired,
};

export default SecondaryColumn;
