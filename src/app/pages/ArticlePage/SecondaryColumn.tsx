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
import secondaryColumnStyles from './SecondaryColumn.module.scss';

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
  const hasTopStories = Boolean(topStoriesContent?.length);
  const hasFeatures = Boolean(featuresContent?.length);

  if (!hasTopStories && !hasFeatures && !onwardJourneyContext?.isEnabled) {
    return null;
  }

  return (
    <div css={styles.secondaryColumn}>
      {hasTopStories && (
        <div
          css={styles.topStoriesSection}
          className={
            shouldUseTopBarOJs ? secondaryColumnStyles.desktopOnly : undefined
          }
          data-testid="top-stories"
          data-experiment-position="secondaryColumn"
        >
          <TopStoriesSection
            content={topStoriesContent ?? []}
            experimentProps={experimentProps}
          />
        </div>
      )}
      {hasFeatures && (
        <div css={styles.featuresSection} data-testid="features">
          <FeaturesAnalysis
            content={featuresContent ?? []}
            parentColumns={{}}
            sectionLabelBackground={GREY_2}
            experimentProps={experimentProps}
          />
        </div>
      )}
      {!hasTopStories &&
        !hasFeatures &&
        onwardJourneyContext?.isEnabled &&
        (shouldUseTopBarOJs ? (
          <div className={secondaryColumnStyles.desktopOnly}>
            <OnwardJourneyPlaceholder onwardJourney="topStoriesAndFeatures" />
          </div>
        ) : (
          <OnwardJourneyPlaceholder onwardJourney="topStoriesAndFeatures" />
        ))}
    </div>
  );
};

export default SecondaryColumn;
