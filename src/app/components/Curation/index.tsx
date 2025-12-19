import {
  Curation,
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import RadioSchedule from '#app/legacy/containers/RadioSchedule';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
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
import PortraitVideoCarousel from '../PortraitVideoCarousel';
import UsefulLinks from '../UsefulLinks';
import SocialLinks from '../SocialLinks';
import styles from './index.styles';
import MediaLoader from '../MediaLoader';

const {
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  MESSAGE_BANNER,
  NOT_SUPPORTED,
  MOST_READ,
  RADIO_SCHEDULE,
  EMBED,
  BILLBOARD,
  PORTRAIT_VIDEO_CAROUSEL,
  USEFUL_LINKS,
  SOCIAL_LINKS,
  MEDIA_COLLECTION,
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
  portraitVideo,
  renderVisuallyHiddenH2Title = false,
  curationId,
  timeOfDayExperimentName,
  timeOfDayVariant,
  mediaCollection,
}: Curation) => {
  const componentName = getComponentName({
    visualStyle,
    visualProminence,
    radioSchedule,
    embed,
    mediaCollection,
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

  const eventTrackingData: EventTrackingData = {
    componentName,
    groupTracker: {
      name: curationSubheading,
      type: `${componentName}`,
      position: position + 1,
      ...(link && { link }),
      ...(curationId && { resourceId: curationId }),
      ...(summaries?.length > 0 && { itemCount: summaries.length }),
    },
  };

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
              eventTrackingData={eventTrackingData}
              showLiveLabel={summaryIsLive}
              altText={imageAlt}
              summaries={summaries}
              timeOfDayExperimentName={timeOfDayExperimentName || undefined}
              timeOfDayVariant={timeOfDayVariant ?? undefined}
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
            id={`message-banner-${nthCurationByStyleAndProminence}`}
            eventTrackingData={eventTrackingData}
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
          eventTrackingData={eventTrackingData}
        />
      );
    case RADIO_SCHEDULE:
      return (
        <RadioSchedule
          initialData={radioSchedule}
          toggleName="homePageRadioSchedule"
          eventTrackingData={eventTrackingData}
        />
      );
    case EMBED:
      return embed ? <Embed oembed={embed} /> : null;
    case PORTRAIT_VIDEO_CAROUSEL:
      if (portraitVideo?.blocks && portraitVideo?.blocks?.length > 0) {
        return (
          <PortraitVideoCarousel
            title={title}
            blocks={portraitVideo.blocks}
            eventTrackingData={eventTrackingData}
            timeOfDayVariant={timeOfDayVariant ?? undefined}
          />
        );
      }
      return null;
    case USEFUL_LINKS:
      return (
        <UsefulLinks
          summaries={summaries}
          title={title}
          id={`useful-links-${nthCurationByStyleAndProminence}`}
          eventTrackingData={eventTrackingData}
        />
      );
    case SOCIAL_LINKS:
      return (
        <SocialLinks
          summaries={summaries}
          title={title}
          id={`social-links-${nthCurationByStyleAndProminence}`}
          eventTrackingData={eventTrackingData}
        />
      );
    case MEDIA_COLLECTION: {
      const mediaCollectionId = `media-collection-${nthCurationByStyleAndProminence}`;

      return mediaCollection ? (
        <section
          role="region"
          aria-labelledby="bbcMediaPlayer0"
          data-testid={mediaCollectionId}
        >
          <MediaLoader blocks={mediaCollection} />
        </section>
      ) : null;
    }
    case SIMPLE_CURATION_GRID:
    case HIERARCHICAL_CURATION_GRID:
    default:
      if (summaries.length > 0) {
        const viewTracker = useViewTracker({
          ...eventTrackingData,
          viewThreshold: 0.2,
          ...(timeOfDayExperimentName &&
            timeOfDayVariant && {
              sendOptimizelyEvents: true,
              experimentName: timeOfDayExperimentName,
              experimentVariant: timeOfDayVariant,
            }),
        });

        const curationSubheadingClickTracker =
          useClickTrackerHandler(eventTrackingData);

        return curationLength > 1 ? (
          <section aria-labelledby={id} role="region">
            <div {...viewTracker}>
              {curationSubheading &&
                (renderVisuallyHiddenH2Title ? (
                  <VisuallyHiddenText id={id} as="h2">
                    {curationSubheading}
                  </VisuallyHiddenText>
                ) : (
                  <Subheading
                    id={id}
                    link={link}
                    {...(link ? curationSubheadingClickTracker : {})}
                  >
                    {curationSubheading}
                  </Subheading>
                ))}
              <GridComponent
                summaries={summaries}
                headingLevel={3}
                isFirstCuration={isFirstCuration}
                eventTrackingData={eventTrackingData}
                timeOfDayExperimentName={timeOfDayExperimentName || undefined}
                timeOfDayVariant={timeOfDayVariant ?? undefined}
              />
            </div>
          </section>
        ) : (
          <div {...viewTracker}>
            <GridComponent
              summaries={summaries}
              headingLevel={2} // if there is only one curation, all promos should be h2, and no subheading
              isFirstCuration={isFirstCuration}
              eventTrackingData={eventTrackingData}
              timeOfDayExperimentName={timeOfDayExperimentName || undefined}
              timeOfDayVariant={timeOfDayVariant ?? undefined}
            />
          </div>
        );
      }
      return null;
  }
};
