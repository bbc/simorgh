/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Curation,
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import RadioSchedule from '#app/legacy/containers/RadioSchedule';
import VisuallyHiddenText from '../VisuallyHiddenText';
import CurationGrid from './CurationGrid';
import HierarchicalGrid from './HierarchicalGrid';
import Subheading from './Subhead';
import getComponentName, { COMPONENT_NAMES } from './getComponentName';
import MessageBanner from '../MessageBanner';
import MostRead from '../MostRead';
import { GHOST } from '../ThemeProvider/palette';
import Embed from '../Embeds/OEmbed';
import Billboard from '../Billboard';
import styles from './index.styles';

const {
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  MESSAGE_BANNER,
  NOT_SUPPORTED,
  MOST_READ,
  RADIO_SCHEDULE,
  EMBED,
  BILLBOARD,
} = COMPONENT_NAMES;

const { NONE } = VISUAL_STYLE;
const { NORMAL } = VISUAL_PROMINENCE;

const getGridComponent = (componentName: string | null) => {
  switch (componentName) {
    case HIERARCHICAL_CURATION_GRID:
      return HierarchicalGrid;
    case SIMPLE_CURATION_GRID:
    default:
      return CurationGrid;
  }
};

export default ({
  visualStyle = NONE,
  visualProminence = NORMAL,
  summaries = [],
  title = '',
  topStoriesTitle = '',
  link = '',
  position = 0,
  curationLength = 0,
  mostRead,
  radioSchedule,
  nthCurationByStyleAndProminence = 1,
  embed,
}: Curation) => {
  const componentName = getComponentName({
    visualStyle,
    visualProminence,
    radioSchedule,
    embed,
  });
  const GridComponent = getGridComponent(componentName);

  const isFirstCuration = position === 0;
  const curationSubheading = title || topStoriesTitle;
  const id =
    `${visualProminence}-${visualStyle}-${nthCurationByStyleAndProminence}`.toLowerCase();

  // extract the first summary as the basis for the msg banner and the billboard
  const [firstSummary] = summaries;
  const {
    description,
    link: summaryLink,
    imageAlt,
    imageUrl,
    isLive: summaryIsLive,
    title: linkText,
  } = firstSummary || {};

  const messageBannerId = `message-banner-${nthCurationByStyleAndProminence}`;

  switch (componentName) {
    case NOT_SUPPORTED:
      return null;
    case BILLBOARD: {
      const billboardId = `billboard-${nthCurationByStyleAndProminence}`;
      if (firstSummary) {
        return (
          <div css={styles.billboardContainer}>
            <Billboard
              heading={firstSummary.title}
              description={description as string}
              link={summaryLink}
              image={imageUrl}
              id={billboardId}
              eventTrackingData={{
                componentName: billboardId,
                detailedPlacement: `${position + 1}`,
              }}
              showLiveLabel={summaryIsLive}
              altText={imageAlt}
            />
          </div>
        );
      }
      return null;
    }
    case MESSAGE_BANNER:
      if (firstSummary) {
        return (
          <MessageBanner
            heading={title}
            description={description}
            link={summaryLink}
            linkText={linkText}
            image={imageUrl}
            id={messageBannerId}
            eventTrackingData={{
              componentName: messageBannerId,
              detailedPlacement: `${position + 1}`,
            }}
          />
        );
      }
      return null;
    case MOST_READ:
      return (
        <MostRead
          data={mostRead}
          columnLayout="twoColumn"
          headingBackgroundColour={GHOST}
        />
      );
    case RADIO_SCHEDULE:
      return (
        <RadioSchedule
          initialData={radioSchedule}
          toggleName="homePageRadioSchedule"
        />
      );
    case EMBED:
      return embed ? <Embed oembed={embed} /> : null;
    case SIMPLE_CURATION_GRID:
    case HIERARCHICAL_CURATION_GRID:
    default:
      if (summaries.length > 0) {
        return curationLength > 1 && (title || isFirstCuration) ? (
          <section aria-labelledby={id} role="region">
            {isFirstCuration ? (
              <VisuallyHiddenText id={id} as="h2">
                {curationSubheading}
              </VisuallyHiddenText>
            ) : (
              <Subheading id={id} link={link}>
                {curationSubheading}
              </Subheading>
            )}
            <GridComponent
              summaries={summaries}
              headingLevel={3} // if there are multiple curations, each curation's heading will be h2 and the promos within will be h3
              isFirstCuration={isFirstCuration}
            />
          </section>
        ) : (
          <GridComponent
            summaries={summaries}
            headingLevel={2} // if there is only one curation, all promos should be h2
            isFirstCuration={isFirstCuration}
          />
        );
      }
      return null;
  }
};
