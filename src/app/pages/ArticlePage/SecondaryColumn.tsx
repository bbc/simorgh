/** @jsx jsx */

import { jsx, useTheme, Theme } from '@emotion/react';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { Article } from '#app/models/types/optimo';
import Curation from '#app/components/Curation';
import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import TopStoriesSection from './PagePromoSections/TopStoriesSection';
import styles from './ArticlePage.styles';

const adaptiveCurationsSectionStyles = ({ spacings, mq }: Theme) => ({
  marginBottom: `${spacings.TRIPLE}rem`,
  padding: `${spacings.DOUBLE}rem`,
  [mq.GROUP_4_MIN_WIDTH]: {
    display: 'none',
  },
});

const SecondaryColumn = ({
  pageData,
  sendOptimizelyEvents,
  experimentVariant,
}: {
  pageData: Article;
  sendOptimizelyEvents: boolean;
  experimentVariant: string | null;
}) => {
  const topStoriesContent = pageData?.secondaryColumn?.topStories;
  const featuresContent = pageData?.secondaryColumn?.features;
  // Use dummy data for development
  const billboardCurationData = pageData?.secondaryColumn?.billboardCuration;
  const multimediaCurationData = pageData?.secondaryColumn?.multimediaCuration;
  const theme = useTheme();
  const {
    palette: { GREY_2 },
  } = theme;

  if (
    !topStoriesContent &&
    !featuresContent &&
    !billboardCurationData &&
    !multimediaCurationData
  )
    return null;
  const showAdaptiveSection = experimentVariant === 'variant_a';
  // ask about putting the curations in a curationList in secondary Column data so that we can map over the list below when rendering curations

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
          css={adaptiveCurationsSectionStyles(theme)}
          aria-label="Adaptive Experience"
          data-testid="adaptive-curations-section"
        >
          <Curation
            visualStyle={VISUAL_STYLE.FEED}
            visualProminence={VISUAL_PROMINENCE.NORMAL}
            summaries={multimediaCurationData?.summaries}
            title={multimediaCurationData?.title}
            position={1} // this isn't needed but is a mandatory value. Do we make it optional now we might be using curations in article pages?
            curationId={multimediaCurationData?.curationId}
            curationLength={4}
            link={multimediaCurationData?.link}
          />
          <Curation
            visualStyle={VISUAL_STYLE.BANNER}
            visualProminence={VISUAL_PROMINENCE.MAXIMUM}
            summaries={billboardCurationData?.summaries}
            title={billboardCurationData?.title}
            position={1} // this isn't needed but is a mandatory value. Do we make it optional now we might be using curations in article pages?
            curationId={billboardCurationData?.curationId}
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
            sendOptimizelyEvents={sendOptimizelyEvents}
          />
        </div>
      )}
      {featuresContent && (
        <div css={styles.featuresSection} data-testid="features">
          <FeaturesAnalysis
            content={featuresContent}
            sendOptimizelyEvents={sendOptimizelyEvents}
            parentColumns={{}}
            sectionLabelBackground={GREY_2}
          />
        </div>
      )}
    </div>
  );
};

export default SecondaryColumn;
