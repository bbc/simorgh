import {
  VIEW_EVENT,
  CLICK_EVENT,
} from '#app/lib/analyticsUtils/analytics.const';
import { isMobile } from '#app/legacy/containers/PageHandlers/withOptimizelyProvider/userAttributes';
import { ATIEventTrackingProps } from '../../types';
import buildResonanceEventConfig from '.';

jest.mock(
  '#app/legacy/containers/PageHandlers/withOptimizelyProvider/userAttributes',
  () => ({
    isMobile: jest.fn(),
  }),
);

describe('buildResonanceEventConfig', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseProps: ATIEventTrackingProps = {
    pageIdentifier: 'pidgin.topics.c95y35941vrt.page',
    producerName: 'producerName',
    componentName: 'componentName',
    campaignID: 'campaignID',
    type: VIEW_EVENT,
    url: 'https://www.bbc.com/pidgin',
    platform: 'canonical',
  };

  it('should return the correct event action for a view event', () => {
    const result = buildResonanceEventConfig(baseProps);

    expect(result.event.action).toEqual('view');
  });

  it('should return the correct event action for a non-view event', () => {
    const result = buildResonanceEventConfig({
      ...baseProps,
      type: CLICK_EVENT,
    });

    expect(result.event.action).toEqual('select');
  });

  it('should set the breakpoint to mobile when isMobile returns true', () => {
    (isMobile as jest.Mock).mockReturnValue(true);

    const result = buildResonanceEventConfig(baseProps);

    expect(result.experience.breakpoint).toEqual('mobile');
  });

  it('should set the breakpoint to desktop when isMobile returns false', () => {
    (isMobile as jest.Mock).mockReturnValue(false);

    const result = buildResonanceEventConfig(baseProps);

    expect(result.experience.breakpoint).toEqual('desktop');
  });

  it('should default isSignedIn to false when not provided', () => {
    const result = buildResonanceEventConfig(baseProps);

    expect(result.experience.isAccount).toEqual(false);
  });

  it('should use the provided isSignedIn value', () => {
    const result = buildResonanceEventConfig({
      ...baseProps,
      isSignedIn: true,
    });

    expect(result.experience.isAccount).toEqual(true);
  });

  it('should pass through the pixelThreshold and subcategory', () => {
    const result = buildResonanceEventConfig({
      ...baseProps,
      viewThreshold: 50,
    });

    expect(result.event.pixelThreshold).toEqual(50);
    expect(result.event.subcategory).toEqual('componentName');
  });

  it('should map groupTracker fields onto the group object, falling back to campaignID for name', () => {
    const result = buildResonanceEventConfig(baseProps);

    expect(result.group).toEqual({
      itemCount: undefined,
      link: undefined,
      name: 'campaignID',
      position: undefined,
      resourceId: undefined,
      type: undefined,
    });
  });

  it('should use the groupTracker name when provided instead of campaignID', () => {
    const result = buildResonanceEventConfig({
      ...baseProps,
      groupTracker: {
        name: 'groupName',
        itemCount: 5,
        resourceId: 'groupResourceId',
        position: 1,
        link: 'https://www.bbc.com/group',
        type: 'groupType',
      },
    });

    expect(result.group).toEqual({
      itemCount: 5,
      link: 'https://www.bbc.com/group',
      name: 'groupName',
      position: 1,
      resourceId: 'groupResourceId',
      type: 'groupType',
    });
  });

  it('should map itemTracker fields onto the item object', () => {
    const result = buildResonanceEventConfig({
      ...baseProps,
      itemTracker: {
        type: 'itemType',
        text: 'itemText',
        position: 2,
        duration: 30,
        label: 'itemLabel',
        mediaType: 'video',
        resourceId: 'itemResourceId',
      },
    });

    expect(result.item).toEqual({
      type: 'itemType',
      text: 'itemText',
      position: 2,
      duration: 30,
      label: 'itemLabel',
      mediaType: 'video',
      resourceId: 'itemResourceId',
      attribution: 'producerName',
      campaignName: 'campaignID',
      link: 'https://www.bbc.com/pidgin',
      name: 'itemLabel',
    });
  });

  it('should not include the mv object when experimentVariant is not provided', () => {
    const result = buildResonanceEventConfig(baseProps);

    expect(result).not.toHaveProperty('mv');
  });

  it('should include the mv object when experimentVariant is provided', () => {
    const result = buildResonanceEventConfig({
      ...baseProps,
      experimentName: 'experimentName',
      experimentVariant: 'experimentVariant',
    });

    expect(result.mv).toEqual({
      engineName: 'Optimizely',
      variationId: 'experimentVariant',
      experimentId: 'experimentName',
    });
  });

  it('should pass through the platform value', () => {
    const result = buildResonanceEventConfig(baseProps);

    expect(result.experience.globalPlatform).toEqual('canonical');
  });
});
