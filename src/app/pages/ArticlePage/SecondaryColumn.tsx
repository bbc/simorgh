import { useTheme } from '@emotion/react';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { Article } from '#app/models/types/optimo';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';
import styles from './ArticlePage.styles';

const SecondaryColumn = ({ pageData }: { pageData: Article }) => {
  const topStoriesContent = pageData?.secondaryColumn?.topStories;
  const featuresContent = pageData?.secondaryColumn?.features;
  const billboardCurationData = pageData?.secondaryColumn?.billboardCuration;
  const mediaCurationData = pageData?.secondaryColumn?.mediaCuration;
  const {
    palette: { GREY_2 },
  } = useTheme();

  if (
    !topStoriesContent &&
    !featuresContent &&
    !billboardCurationData &&
    !mediaCurationData
  )
    return null;

  return (
    <div css={styles.secondaryColumn}>
      {topStoriesContent && (
        <div
          css={styles.topStoriesSection}
          data-testid="top-stories"
          data-experiment-position="secondaryColumn"
        >
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
