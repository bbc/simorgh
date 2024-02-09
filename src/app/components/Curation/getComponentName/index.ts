import {
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
  CurationProps,
} from '#app/models/types/curationData';

export const COMPONENT_NAMES = {
  MESSAGE_BANNER: 'message-banner',
  SIMPLE_CURATION_GRID: 'simple-curation-grid',
  HIERARCHICAL_CURATION_GRID: 'hierarchical-curation-grid',
  NOT_SUPPORTED: 'not-supported',
  MOST_READ: 'most-read',
  RADIO_SCHEDULE: 'radio-schedule'
} as const;

const { NONE, BANNER, COLLECTION, RANKED } = VISUAL_STYLE;
const { MINIMUM, LOW, NORMAL, HIGH, MAXIMUM } = VISUAL_PROMINENCE;
const {
  MESSAGE_BANNER,
  SIMPLE_CURATION_GRID,
  HIERARCHICAL_CURATION_GRID,
  MOST_READ,
  NOT_SUPPORTED,
  RADIO_SCHEDULE
} = COMPONENT_NAMES;

export default ({
  visualStyle,
  visualProminence,
  curationType = ''
  }: CurationProps) => {

  // Do we definitely want it so that if Visual Style and Prominence are anything other than
  // NONE and NORMAL, we don't want the radio schedule to show regardless of it having
  // the radio-schedule curation type?
  // without adding style and prominence, it is a radio schedule if it has 'radio-schedule'
  // curation type and the others don't matter
  // As long as the people creating the page know this combination of conditions have to hold
  // it is fine to be more specific. If they don't know, the radio-schedule won't show
    
  if(curationType === 'radio-schedule' && visualStyle === NONE && visualProminence === NORMAL){
    return RADIO_SCHEDULE;
  }

  // I haven't included curationType in this because if I do, we would
  // also need to put one in for 'most-popular' and I don't know if this is 
  // something we want to do?
  // Maybe we can to keep it all the same? Keeps it consistent, but also adds another
  // condition which has to be satisfied for most read to show

  // If we include the third condition of curationType, the radio schedule can never accidentally
  // be given a different style and prominence and then fall through the above condition into instead one
  // of these and then cause problems with the radio schedule trying to be a message banner
  const componentsByVisualStyleAndProminence = {
    [`${BANNER}_${MINIMUM}`]: NOT_SUPPORTED,
    [`${BANNER}_${LOW}`]: NOT_SUPPORTED,
    [`${BANNER}_${NORMAL}`]: MESSAGE_BANNER,
    [`${BANNER}_${HIGH}`]: NOT_SUPPORTED,
    [`${BANNER}_${MAXIMUM}`]: NOT_SUPPORTED,
    [`${NONE}_${NORMAL}`]: SIMPLE_CURATION_GRID,
    [`${NONE}_${HIGH}`]: HIERARCHICAL_CURATION_GRID,
    [`${COLLECTION}_${HIGH}`]: HIERARCHICAL_CURATION_GRID,
    [`${RANKED}_${NORMAL}`]: MOST_READ,
  };

  const visualStyleAndProminence = `${visualStyle}_${visualProminence}`;

  return componentsByVisualStyleAndProminence[visualStyleAndProminence] || null;
};
