import { useTheme } from '@emotion/react';

import type { ComponentExperimentProps } from '#app/models/types/global';
import type { Article } from '#app/models/types/optimo';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import styles from './ArticlePage.styles';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';

const SecondaryColumn = ({
  pageData,
  experimentProps,
}: {
  pageData: Article;
  experimentProps?: ComponentExperimentProps;
}) => {
  const topStoriesContent = pageData?.secondaryColumn?.topStories;
  const featuresContent = pageData?.secondaryColumn?.features;
  const {
    palette: { GREY_2 },
  } = useTheme();

  if (!topStoriesContent && !featuresContent) return null;

  return (
    <div css={styles.secondaryColumn}>
      {topStoriesContent && (
        <div
          css={styles.topStoriesSection}
          data-testid="top-stories"
          data-experiment-position="secondaryColumn"
        >
          <TopStoriesSection
            content={topStoriesContent}
            experimentProps={experimentProps}
          />
        </div>
      )}
      {featuresContent && (
        <div css={styles.featuresSection} data-testid="features">
          <FeaturesAnalysis
            content={featuresContent}
            parentColumns={{}}
            sectionLabelBackground={GREY_2}
            experimentProps={experimentProps}
          />
        </div>
      )}
    </div>
  );
};

export default SecondaryColumn;
