import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
  Curation,
} from '#app/models/types/curationData';

export const COMPONENT_NAMES = {
  MESSAGE_BANNER: 'message-banner',
  SIMPLE_CURATION_GRID: 'simple-curation-grid',
  HIERARCHICAL_CURATION_GRID: 'hierarchical-curation-grid',
  NOT_SUPPORTED: 'not-supported',
  MOST_READ: 'most-read',
  RADIO_SCHEDULE: 'radio-schedule',
  EMBED: 'embed',
  BILLBOARD: 'billboard',
  PORTRAIT_VIDEO_CAROUSEL: 'portrait-video-carousel',
  USEFUL_LINKS: 'useful-links',
  SOCIAL_LINKS: 'social-links',
  MEDIA_COLLECTION: 'media-collection',
} as const;

const { NONE, BANNER, COLLECTION, RANKED, INSITU, LINKS } = VISUAL_STYLE;
const { MINIMUM, LOW, NORMAL, HIGH, MAXIMUM } = VISUAL_PROMINENCE;
const {
  MESSAGE_BANNER,
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  MOST_READ,
  NOT_SUPPORTED,
  RADIO_SCHEDULE,
  EMBED,
  BILLBOARD,
  PORTRAIT_VIDEO_CAROUSEL,
  USEFUL_LINKS,
  SOCIAL_LINKS,
  MEDIA_COLLECTION,
} = COMPONENT_NAMES;

export default ({
  visualStyle,
  visualProminence,
  radioSchedule,
  embed,
  mediaCollection,
}: Partial<Curation>) => {
  if (radioSchedule) return RADIO_SCHEDULE;
  if (embed) return EMBED;
  if (mediaCollection) return MEDIA_COLLECTION;

  const componentsByVisualStyleAndProminence = {
    [`${BANNER}_${MINIMUM}`]: NOT_SUPPORTED,
    [`${BANNER}_${LOW}`]: NOT_SUPPORTED,
    [`${BANNER}_${NORMAL}`]: MESSAGE_BANNER,
    [`${BANNER}_${MAXIMUM}`]: BILLBOARD,
    [`${BANNER}_${HIGH}`]: NOT_SUPPORTED,
    [`${NONE}_${NORMAL}`]: SIMPLE_CURATION_GRID,
    [`${NONE}_${HIGH}`]: HIERARCHICAL_CURATION_GRID,
    [`${COLLECTION}_${HIGH}`]: HIERARCHICAL_CURATION_GRID,
    [`${RANKED}_${NORMAL}`]: MOST_READ,
    [`${INSITU}_${NORMAL}`]: PORTRAIT_VIDEO_CAROUSEL,
    [`${LINKS}_${LOW}`]: USEFUL_LINKS,
    [`${LINKS}_${NORMAL}`]: SOCIAL_LINKS,
  };

  const visualStyleAndProminence = `${visualStyle}_${visualProminence}`;
  // originally unmapped combinations would return null, but now they return simple-curation-grid,
  // as this is the set of components that gets used in unmapped cases, and we need a componentName for tracking
  return (
    componentsByVisualStyleAndProminence[visualStyleAndProminence] ||
    SIMPLE_CURATION_GRID
  );
};
