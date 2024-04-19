/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  Curation,
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import RadioSchedule from '#app/legacy/containers/RadioSchedule';
import idSanitiser from '#app/lib/utilities/idSanitiser';
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
import isLive from '#app/lib/utilities/isLive';

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
  headingLevel = 2,
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
  const environmentIsLive = isLive();

  const isFirstCuration = position === 0;
  const curationSubheading = title || topStoriesTitle;
  const id = idSanitiser(curationSubheading);

  switch (componentName) {
    case NOT_SUPPORTED:
      return null;
    case BILLBOARD:
      return !environmentIsLive && summaries.length > 0 ? (
        <Billboard
          heading={title}
          description={summaries[0].description}
          link={summaries[0].link}
          image={summaries[0].imageUrl}
          eventTrackingData={{
            componentName: `billboard-${nthCurationByStyleAndProminence}`,
            detailedPlacement: `${position + 1}`,
          }}
          showLiveLabel={summaries[0].isLive}
        />
      ) : null;
    case MESSAGE_BANNER:
      return environmentIsLive && summaries.length > 0 ? (
        <MessageBanner
          heading={title}
          description={summaries[0].description}
          link={summaries[0].link}
          linkText={summaries[0].title}
          image={summaries[0].imageUrl}
          eventTrackingData={{
            componentName: `message-banner-${nthCurationByStyleAndProminence}`,
            detailedPlacement: `${position + 1}`,
          }}
        />
      ) : null;
    case MOST_READ:
      return (
        <MostRead
          data={mostRead}
          columnLayout="twoColumn"
          headingBackgroundColour={GHOST}
        />
      );
    case RADIO_SCHEDULE:
      return <RadioSchedule initialData={radioSchedule} />;
    case EMBED:
      return embed ? <Embed oembed={embed} /> : null;
    case SIMPLE_CURATION_GRID:
    case HIERARCHICAL_CURATION_GRID:
    default:
      return curationLength > 1 &&
        summaries.length > 0 &&
        (title || isFirstCuration) ? (
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
            headingLevel={isFirstCuration ? 3 : headingLevel}
            isFirstCuration={isFirstCuration}
          />
        </section>
      ) : (
        <GridComponent
          summaries={summaries}
          headingLevel={headingLevel}
          isFirstCuration={isFirstCuration}
        />
      );
  }
};
