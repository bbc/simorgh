import { useTheme } from '@emotion/react';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import useToggle from '#hooks/useToggle';
import { Article } from '#app/models/types/optimo';
import { ComponentExperimentProps } from '#app/models/types/global';
import ListenLiveCTA from '#app/components/ListenLiveCTA';
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
  const currentLiveProgramme = pageData?.secondaryColumn?.currentLiveProgramme;
  const { enabled: listenLiveCtaEnabled } = useToggle('listenLiveCta');
  const {
    palette: { GREY_2 },
  } = useTheme();

  console.log('pageData', pageData);
  console.log('listenLiveCtaEnabled', listenLiveCtaEnabled);
  console.log('currentLiveProgramme', currentLiveProgramme);

  const showListenLiveCTA = Boolean(
    listenLiveCtaEnabled && currentLiveProgramme,
  );

  if (!topStoriesContent && !featuresContent && !showListenLiveCTA) return null;

  return (
    <div css={styles.secondaryColumn}>
      {showListenLiveCTA && <ListenLiveCTA programme={currentLiveProgramme} />}
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
