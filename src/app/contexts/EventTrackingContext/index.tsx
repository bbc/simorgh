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
  MOST_READ_PAGE,
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
  LIVE_RADIO_PAGE,
  TV_PAGE,
  AUDIO_PAGE,
} from '../../routes/utils/pageTypes';
import { PageTypes, Platforms } from '../../models/types/global';
import { buildATIEventTrackingParams } from '../../components/ATIAnalytics/params';
import { ServiceContext } from '../ServiceContext';
import {
  ATIData,
  ATIEventTrackingProps,
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
    [MOST_READ_PAGE]: 'list-datadriven-read',
    [MEDIA_ASSET_PAGE]: 'article-media-asset',
    [STORY_PAGE]: 'article-sty',
    [PHOTO_GALLERY_PAGE]: 'article-photo-gallery',
    [CORRESPONDENT_STORY_PAGE]: 'article-csp',
    [TOPIC_PAGE]: 'topic-page',
    [LIVE_PAGE]: 'live-page',
    [HOME_PAGE]: 'index-home',
    [CPS_ASSET]: '',
    [STATIC_PAGE]: 'static-page',
    [UGC_PAGE]: '',
    [AV_EMBEDS]: 'av-embeds',
    [DOWNLOADS_PAGE]: 'downloads',
    [LIVE_RADIO_PAGE]: 'player-live',
    [AUDIO_PAGE]: 'player-episode',
    [TV_PAGE]: 'player-episode',
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
  atiData?: ATIData;
};

export const EventTrackingContextProvider = ({
  children,
  atiData,
}: PropsWithChildren<EventTrackingProviderProps>) => {
  const requestContext = useContext(RequestContext);
  const { pageType } = requestContext;

  const serviceContext = useContext(ServiceContext);
  const { atiAnalyticsProducerId, atiAnalyticsProducerName } = serviceContext;

  const { enabled: eventTrackingIsEnabled } = useToggle('eventTracking');

  const trackingProps = useMemo(() => {
    if (eventTrackingIsEnabled && atiData) {
      const campaignID = getCampaignID(pageType as CampaignPageTypes);

      const { pageIdentifier, platform, statsDestination } =
        buildATIEventTrackingParams({
          requestContext,
          serviceContext,
          atiData,
        }) as ATIEventTrackingProps;

      return {
        campaignID,
        pageIdentifier,
        platform,
        producerId: atiAnalyticsProducerId,
        producerName: atiAnalyticsProducerName,
        statsDestination,
      };
    }
    return null;
  }, [
    atiAnalyticsProducerId,
    atiAnalyticsProducerName,
    atiData,
    eventTrackingIsEnabled,
    pageType,
    requestContext,
    serviceContext,
  ]);

  if (!eventTrackingIsEnabled || !atiData) {
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
