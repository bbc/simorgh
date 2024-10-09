import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import { RequestContext } from '../RequestContext';
import useToggle from '../../hooks/useToggle';
import {
  ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  MOST_READ_PAGE,
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  TOPIC_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
  HOME_PAGE,
  CPS_ASSET,
  STATIC_PAGE,
  UGC_PAGE,
  AV_EMBEDS,
  DOWNLOADS_PAGE,
} from '../../routes/utils/pageTypes';
import { PageTypes, Platforms } from '../../models/types/global';
import { buildATIEventTrackingParams } from '../../components/ATIAnalytics/params';
import { ServiceContext } from '../ServiceContext';
import {
  ATIData,
  ATIEventTrackingProps,
  PageData,
} from '../../components/ATIAnalytics/types';

type EventTrackingContextProps =
  | {
      campaignID: string;
      pageIdentifier: string;
      platform: Platforms;
      producerId: string;
      statsDestination: string;
    }
  | Record<string, never>;

export const EventTrackingContext = createContext<EventTrackingContextProps>(
  {} as EventTrackingContextProps,
);

type CampaignPageTypes = Exclude<PageTypes, 'error'>;

const getCampaignID = (pageType: CampaignPageTypes) => {
  const campaignID = {
    [ARTICLE_PAGE]: 'article',
    [MEDIA_ARTICLE_PAGE]: 'article-sfv',
    [FRONT_PAGE]: 'index-home',
    [MEDIA_PAGE]: 'player-episode-tv',
    [MOST_READ_PAGE]: 'list-datadriven-read',
    [FEATURE_INDEX_PAGE]: 'index-section-fix',
    [MEDIA_ASSET_PAGE]: 'article-media-asset',
    [STORY_PAGE]: 'article-sty',
    [PHOTO_GALLERY_PAGE]: 'article-photo-gallery',
    [CORRESPONDENT_STORY_PAGE]: 'article-csp',
    [TOPIC_PAGE]: 'topic-page',
    [LIVE_PAGE]: 'live-page',
    [HOME_PAGE]: 'index-home',
    [CPS_ASSET]: '',
    [STATIC_PAGE]: '',
    [UGC_PAGE]: '',
    [AV_EMBEDS]: 'av-embeds',
    [DOWNLOADS_PAGE]: 'downloads',
  }[pageType];

  if (!campaignID) {
    // eslint-disable-next-line no-console
    console.warn(
      `ATI Event Tracking Error: Could not get the page type's campaign name`,
    );
  }

  return campaignID;
};

const NO_TRACKING_PROPS = {};

type EventTrackingProviderProps = {
  data?: PageData;
  atiData?: ATIData;
};

export const EventTrackingContextProvider = ({
  children,
  data,
  atiData,
}: PropsWithChildren<EventTrackingProviderProps>) => {
  const requestContext = useContext(RequestContext);
  const { pageType } = requestContext;

  const serviceContext = useContext(ServiceContext);
  const { atiAnalyticsProducerId } = serviceContext;

  const { enabled: eventTrackingIsEnabled } = useToggle('eventTracking');

  const trackingProps = useMemo(() => {
    if (eventTrackingIsEnabled || (data && atiData)) {
      const campaignID = getCampaignID(pageType as CampaignPageTypes);

      const { pageIdentifier, platform, statsDestination } =
        buildATIEventTrackingParams({
          requestContext,
          serviceContext,
          data,
          atiData,
        }) as ATIEventTrackingProps;

      return {
        campaignID,
        pageIdentifier,
        platform,
        producerId: atiAnalyticsProducerId,
        statsDestination,
      };
    }
    return null;
  }, [
    atiAnalyticsProducerId,
    atiData,
    data,
    eventTrackingIsEnabled,
    pageType,
    requestContext,
    serviceContext,
  ]);

  if (!eventTrackingIsEnabled || (!data && !atiData)) {
    return (
      <EventTrackingContext.Provider value={NO_TRACKING_PROPS}>
        {children}
      </EventTrackingContext.Provider>
    );
  }

  const hasRequiredProps = Object.values(
    trackingProps as EventTrackingContextProps,
  ).every(Boolean);

  return (
    <EventTrackingContext.Provider
      value={
        hasRequiredProps
          ? (trackingProps as EventTrackingContextProps)
          : NO_TRACKING_PROPS
      }
    >
      {children}
    </EventTrackingContext.Provider>
  );
};
