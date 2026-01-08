import { useTheme } from '@emotion/react';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { Article } from '#app/models/types/optimo';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';
import styles from './ArticlePage.styles';

const adaptiveCurationsSectionStyles = ({ spacings, mq }: Theme) =>
  css({
    marginBottom: `${spacings.TRIPLE}rem`,
    padding: `${spacings.DOUBLE}rem`,
    [mq.GROUP_4_MIN_WIDTH]: {
      display: 'none',
    },
  });

const SecondaryColumn = ({
  pageData,
  timeOfDayExperimentVariant,
  timeOfDayExperimentName,
  referrerVariant,
  referrerExperimentName,
}: {
  pageData: Article;
  timeOfDayExperimentVariant?: string | null;
  timeOfDayExperimentName?: string;
  referrerVariant?: string | null;
  referrerExperimentName?: string;
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
            {...(timeOfDayExperimentVariant && {
              experimentProps: {
                sendOptimizelyEvents: true,
                experimentName: timeOfDayExperimentName,
                experimentVariant: timeOfDayExperimentVariant,
              },
            })}
            {...(referrerVariant && {
              experimentProps: {
                sendOptimizelyEvents: true,
                experimentName: referrerExperimentName,
                experimentVariant: referrerVariant,
              },
            })}
          />
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
