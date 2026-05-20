// biome-ignore-all lint/correctness/useHookAtTopLevel: we want this

import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import RadioSchedule from '#app/legacy/containers/RadioSchedule';
import type { EventTrackingData } from '#app/lib/analyticsUtils/types';
import {
  type Curation,
  VISUAL_PROMINENCE,
  VISUAL_STYLE,
} from '#app/models/types/curationData';
import type { ComponentExperimentProps } from '#app/models/types/global';
import Billboard from '../Billboard';
import Embed from '../Embeds/OEmbed';
import MediaLoader from '../MediaLoader';
import MessageBanner from '../MessageBanner';
import MostRead from '../MostRead';
import PortraitVideoCarousel from '../PortraitVideoCarousel';
import SocialLinks from '../SocialLinks';
import { GHOST } from '../ThemeProvider/palette';
import UsefulLinks from '../UsefulLinks';
import VisuallyHiddenText from '../VisuallyHiddenText';
import CurationGrid from './CurationGrid';
import getComponentName, { COMPONENT_NAMES } from './getComponentName';
import HierarchicalGrid from './HierarchicalGrid';
import styles from './index.styles';
import Subheading from './Subhead';

const {
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
    default:
      return CurationGrid;
  }
};

const enterFakeScreenCallback = () => {
  const consentBanner = document.getElementById('consent-banner');
  if (consentBanner) {
    consentBanner.style.zIndex = '-1';
  }
};

const exitFakeScreenCallback = () => {
  const consentBanner = document.getElementById('consent-banner');
  if (consentBanner) {
    consentBanner.style.zIndex = '2147483647';
  }
};

interface CurationProps extends Curation {
  // keep this local so we do not change the shared bff curation data shape
  experimentProps?: ComponentExperimentProps;
  curationContentType?: string;
  pageType?: string;
}

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
  mediaCollection,
  experimentProps,
  curationContentType,
  pageType,
}: CurationProps) => {
  const componentName = getComponentName({
    visualStyle,
    visualProminence,
    radioSchedule,
    embed,
    mediaCollection,
    curationContentType,
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

  const experimentTrackingProps = experimentProps || {};

  const eventTrackingData: EventTrackingData = {
    componentName,
    groupTracker: {
      name: curationSubheading,
      type: componentName,
      position: position + 1,
      ...(link && { link }),
      ...(curationId && { resourceId: curationId }),
      ...(summaries?.length > 0 && { itemCount: summaries.length }),
    },
    ...experimentTrackingProps,
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
          showSectionLabel={curationLength > 1}
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
            css={styles.pvCarousel}
            link={link}
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
          <MediaLoader
            blocks={mediaCollection}
            eventMapping={{
              enterFakeFullscreen: enterFakeScreenCallback,
              exitFakeFullscreen: exitFakeScreenCallback,
            }}
          />
        </section>
      ) : null;
    }
    default:
      if (summaries.length > 0) {
        const viewTracker = useViewTracker({
          ...eventTrackingData,
          viewThreshold: 0.2,
        });

        const curationSubheadingClickTracker =
          useClickTrackerHandler(eventTrackingData);

        // Show heading if more than one curation, or if only one and pageType is 'article'
        const shouldShowHeading = curationLength > 1 || pageType === 'article';

        const gridHeadingLevel =
          pageType === 'article' || curationLength > 1 ? 3 : 2;

        return shouldShowHeading ? (
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
                headingLevel={gridHeadingLevel}
                isFirstCuration={isFirstCuration}
                eventTrackingData={eventTrackingData}
              />
            </div>
          </section>
        ) : (
          <div {...viewTracker}>
            <GridComponent
              summaries={summaries}
              headingLevel={2}
              isFirstCuration={isFirstCuration}
              eventTrackingData={eventTrackingData}
            />
          </div>
        );
      }
      return null;
  }
};
