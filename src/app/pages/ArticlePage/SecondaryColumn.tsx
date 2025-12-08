import { useTheme, Theme, css } from '@emotion/react';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { Article } from '#app/models/types/optimo';
import Curation from '#app/components/Curation';
import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
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
  personalisedContentExperimentVariant,
  personalisedContentExperimentName,
  timeOfDayExperimentVariant,
  timeOfDayExperimentName,
}: {
  pageData: Article;
  personalisedContentExperimentVariant?: string | null;
  personalisedContentExperimentName?: string;
  timeOfDayExperimentVariant?: string | null;
  timeOfDayExperimentName?: string;
}) => {
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

  const showAdaptiveSection =
    // Morning
    timeOfDayExperimentVariant === 'article_time_of_day_a' ||
    // Evening
    timeOfDayExperimentVariant === 'article_time_of_day_b';

  // ideally we would want to be agnostic about the type of Curation we want to render here and have the decision made in the BFF
  // however, we cannot do this with the billboard curation as we would need to fetch the whole topic it is in, which is the whole home page,
  // in order to get its visual prominence and style.
  // The other way would be to hard code the visual prominence and style in the bff and include it in the data
  // just for speed we will just keep the hardcoded style and prominence here for now, and can be improved later if we do more experiments with curations like this

  // it is possible to get the prominence and style for the media curation in the bff and send it through to simorgh, but as we are not doing that for the billboard one
  // we can just keep that hardcoded here too

  return (
    <div css={styles.secondaryColumn}>
      {showAdaptiveSection && (
        <section
          css={adaptiveCurationsSectionStyles}
          aria-label="Adaptive Experience" // can change this name if people want
          data-testid="adaptive-curations-section"
        >
          <Curation
            visualStyle={VISUAL_STYLE.FEED} // this is a vivo stream in. a simple-curation-grid
            visualProminence={VISUAL_PROMINENCE.NORMAL}
            summaries={mediaCurationData?.summaries}
            title={mediaCurationData?.title}
            position={0}
            curationId={mediaCurationData?.curationId}
            curationLength={mediaCurationData?.summaries?.length}
            link={mediaCurationData?.link}
            timeOfDayExperimentName={timeOfDayExperimentName || undefined}
            timeOfDayVariant={timeOfDayExperimentVariant || undefined}
          />
          <Curation
            visualStyle={VISUAL_STYLE.BANNER} // this is a billboard
            visualProminence={VISUAL_PROMINENCE.MAXIMUM}
            summaries={billboardCurationData?.summaries}
            position={1}
            curationId={billboardCurationData?.curationId}
            timeOfDayExperimentName={timeOfDayExperimentName || undefined}
            timeOfDayVariant={timeOfDayExperimentVariant || undefined}
          />
        </section>
      )}
      {topStoriesContent && (
        <div
          css={styles.topStoriesSection}
          data-testid="top-stories"
          data-experiment-position="secondaryColumn"
        >
          <TopStoriesSection
            content={topStoriesContent}
            // EXPERIMENT: Time of Day Experiment
            {...(timeOfDayExperimentVariant && {
              experimentProps: {
                sendOptimizelyEvents: true,
                experimentName: timeOfDayExperimentName,
                experimentVariant: timeOfDayExperimentVariant,
              },
            })}
            // EXPERIMENT: Location based Topics Experiment
            {...(personalisedContentExperimentVariant && {
              experimentProps: {
                sendOptimizelyEvents: true,
                experimentName: personalisedContentExperimentName,
                experimentVariant: personalisedContentExperimentVariant,
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
            // EXPERIMENT: Time of Day Experiment
            {...(timeOfDayExperimentVariant && {
              experimentProps: {
                sendOptimizelyEvents: true,
                experimentName: timeOfDayExperimentName,
                experimentVariant: timeOfDayExperimentVariant,
              },
            })}
            // EXPERIMENT: Location based Topics Experiment
            {...(personalisedContentExperimentVariant && {
              experimentProps: {
                sendOptimizelyEvents: true,
                experimentName: personalisedContentExperimentName,
                experimentVariant: personalisedContentExperimentVariant,
              },
            })}
          />
        </div>
      )}
    </div>
  );
};

export default SecondaryColumn;
