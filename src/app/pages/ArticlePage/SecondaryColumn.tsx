import { useTheme } from '@emotion/react';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { Article } from '#app/models/types/optimo';
import { ComponentExperimentProps } from '#app/models/types/global';
import OnwardJourneyPlaceholder from '#app/components/OnwardJourneyPlaceholder';
import { useOnwardJourneyRequest } from '#app/contexts/ArticleOnwardJourneysContext';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';
import styles from './ArticlePage.styles';

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
  const onwardJourneyContext = useOnwardJourneyRequest();

  if (
    !topStoriesContent &&
    !featuresContent &&
    !onwardJourneyContext?.isEnabled
  ) {
    return null;
  }

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
      {!topStoriesContent && !featuresContent && (
        <OnwardJourneyPlaceholder onwardJourney="topStoriesAndFeatures" />
      )}
    </div>
  );
};

export default SecondaryColumn;
