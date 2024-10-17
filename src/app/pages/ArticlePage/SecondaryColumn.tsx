/** @jsx jsx */

import { jsx, useTheme } from '@emotion/react';

import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { Article } from '#app/models/types/optimo';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';

import styles from './ArticlePage.styles';

const SecondaryColumn = ({ pageData }: { pageData: Article }) => {
  const topStoriesContent = pageData?.secondaryColumn?.topStories;
  const featuresContent = pageData?.secondaryColumn?.features;

  const {
    palette: { GREY_2 },
  } = useTheme();

  if (!topStoriesContent && !featuresContent) return null;

  return (
    <div css={styles.secondaryColumn}>
      {topStoriesContent && (
        <div css={styles.topStoriesSection} data-testid="top-stories">
          <TopStoriesSection content={topStoriesContent} />
        </div>
      )}
      {featuresContent && (
        <div css={styles.featuresSection} data-testid="features">
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

export default SecondaryColumn;
