/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  CurationProps,
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
import idSanitiser from '../../lib/utilities/idSanitiser';
import MostRead from '../MostRead';
import { GHOST } from '../ThemeProvider/palette';
import FlourishEmbed from '../Embeds/FlourishEmbed';
import EmbedHtml from '../Embeds/EmbedHtml';
import Embed from '../Embeds/OEmbed';

const {
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  MESSAGE_BANNER,
  NOT_SUPPORTED,
  MOST_READ,
  RADIO_SCHEDULE,
  // FLOURISH_VIS,
  // VJ_INCLUDE,
  EMBED,
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

const Curation = ({
  visualStyle = NONE,
  visualProminence = NORMAL,
  promos = [],
  title = '',
  topStoriesTitle = '',
  link = '',
  headingLevel = 2,
  position = 0,
  curationLength = 0,
  mostRead,
  // vjFetchResponse,
  nthCurationByStyleAndProminence = 1,
  radioSchedule,
  embed,
}: CurationProps) => {
  const componentName = getComponentName({
    visualStyle,
    visualProminence,
    radioSchedule,
    link: link || promos[0].link,
    // vjFetchResponse,
    embed,
  });

  const GridComponent = getGridComponent(componentName);

  const isFirstCuration = position === 0;
  const curationSubheading = title || topStoriesTitle;
  const id = idSanitiser(curationSubheading);
  // const vjHTML = vjFetchResponse;
  switch (componentName) {
    case NOT_SUPPORTED:
      return null;
    // case FLOURISH_VIS:
    //   return (
    //     <section aria-labelledby={id} role="region">
    //       <FlourishEmbed
    //         width={700}
    //         height={575}
    //         iFrameSrc={promos[0].link?.replace(
    //           'files.bbci.com',
    //           'files.bbci.co.uk',
    //         )}
    //         iFrameId={promos[0].id}
    //         iFrameTitle={curationSubheading}
    //       />
    //     </section>
    //   );
    // case VJ_INCLUDE:
    //   return vjHTML ? <EmbedHtml embeddableContent={vjHTML} /> : null;
    case MESSAGE_BANNER:
      return promos.length > 0 ? (
        <MessageBanner
          heading={title}
          description={promos[0].description}
          link={promos[0].link}
          linkText={promos[0].title}
          image={promos[0].imageUrl}
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
      return <Embed oembed={embed} type="" />;
    case SIMPLE_CURATION_GRID:
    case HIERARCHICAL_CURATION_GRID:
    default:
      return curationLength > 1 &&
        promos.length > 0 &&
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
            promos={promos}
            headingLevel={isFirstCuration ? 3 : headingLevel}
            isFirstCuration={isFirstCuration}
          />
        </section>
      ) : (
        <GridComponent
          promos={promos}
          headingLevel={headingLevel}
          isFirstCuration={isFirstCuration}
        />
      );
  }
};

export default Curation;
