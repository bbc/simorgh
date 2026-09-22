import { isMobile } from '#app/legacy/containers/PageHandlers/withOptimizelyProvider/userAttributes';
import { VIEW_EVENT } from '#app/lib/analyticsUtils/analytics.const';
import { ATIEventTrackingProps } from '../../types';
import { ResonanceEventModel } from '../types';

// Resonance calls this the Viewability model. We have called this buildResonanceEventModel to avoid confusion, since this is used for both click and view events.
// https://bbc.atlassian.net/wiki/spaces/DAS/pages/834246852/Resonance+-+TypeScript+Integration+Guide#Viewability
export default ({
  pageIdentifier,
  producerName,
  componentName,
  campaignID,
  type,
  url,
  experimentName,
  experimentVariant,
  itemTracker = {},
  groupTracker = {},
  isSignedIn = false,
  viewThreshold,
  platform,
}: ATIEventTrackingProps): ResonanceEventModel => {
  const {
    name = campaignID,
    itemCount,
    resourceId: groupResourceId,
    position: groupPosition,
    link,
    type: groupType,
  } = groupTracker;

  const {
    type: itemType,
    text,
    position,
    duration,
    label,
    mediaType,
    resourceId: itemResourceId,
  } = itemTracker;

  return {
    event: {
      action: type === VIEW_EVENT ? 'view' : 'select',
      grouping: pageIdentifier,
      pixelThreshold: viewThreshold,
      subcategory: componentName,
    },
    experience: {
      breakpoint: isMobile() ? 'mobile' : 'desktop',
      globalPlatform: platform,
      isAccount: isSignedIn,
    },
    group: {
      itemCount,
      link,
      name,
      position: groupPosition,
      resourceId: groupResourceId,
      type: groupType,
    },
    item: {
      type: itemType,
      text,
      position,
      duration,
      label,
      mediaType,
      resourceId: itemResourceId,
      attribution: producerName,
      campaignName: campaignID,
      link: url,
      name: label,
    },
    ...(experimentVariant && {
      mv: {
        engineName: 'Optimizely',
        variationId: experimentVariant,
        experimentId: experimentName,
      },
    }),
  };
};
