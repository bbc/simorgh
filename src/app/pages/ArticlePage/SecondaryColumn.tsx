import { use } from 'react';
import { useTheme } from '@emotion/react';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { Article } from '#app/models/types/optimo';
import { ComponentExperimentProps } from '#app/models/types/global';
import OnwardJourneyPlaceholder from '#app/components/OnwardJourneyPlaceholder/lazy';
import { useOnwardJourneyRequest } from '#app/contexts/ArticleOnwardJourneysContext';
import { RequestContext } from '#app/contexts/RequestContext';
import isTopBarOnwardJourneyExperiment from '#app/lib/utilities/isTopBarOnwardJourneyExperiment';
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
  const { serverSideExperiments } = use(RequestContext);
  const onwardJourneyContext = useOnwardJourneyRequest();
  const shouldUseTopBarOJs =
    onwardJourneyContext?.isEnabled &&
    isTopBarOnwardJourneyExperiment(serverSideExperiments);
  const shouldRenderTopStories = topStoriesContent && !shouldUseTopBarOJs;

  if (
    !shouldRenderTopStories &&
    !featuresContent &&
    (!onwardJourneyContext?.isEnabled || shouldUseTopBarOJs)
  ) {
    return null;
  }

  return (
    <div css={styles.secondaryColumn}>
      {shouldRenderTopStories && (
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
      {!shouldRenderTopStories && !featuresContent && !shouldUseTopBarOJs && (
        <OnwardJourneyPlaceholder onwardJourney="topStoriesAndFeatures" />
      )}
    </div>
  );
};

export default SecondaryColumn;
