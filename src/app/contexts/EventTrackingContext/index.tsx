import React, { createContext, PropsWithChildren, useContext } from 'react';

import { RequestContext } from '#contexts/RequestContext';
import { buildATIEventTrackingParams } from '#containers/ATIAnalytics/params';
import useToggle from '#hooks/useToggle';
import {
  ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  MOST_READ_PAGE,
  MOST_WATCHED_PAGE,
  INDEX_PAGE,
  FEATURE_INDEX_PAGE,
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  CORRESPONDENT_STORY_PAGE,
  TOPIC_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
  HOME_PAGE,
} from '#app/routes/utils/pageTypes';
import { PageTypes, Platforms } from '#app/models/types/global';
import { ServiceContext } from '../ServiceContext';

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
    [MOST_WATCHED_PAGE]: 'list-datadriven-watched',
    [INDEX_PAGE]: 'index-section',
    [FEATURE_INDEX_PAGE]: 'index-section-fix',
    [MEDIA_ASSET_PAGE]: 'article-media-asset',
    [STORY_PAGE]: 'article-sty',
    [PHOTO_GALLERY_PAGE]: 'article-photo-gallery',
    [CORRESPONDENT_STORY_PAGE]: 'article-csp',
    [TOPIC_PAGE]: 'topic-page',
    [LIVE_PAGE]: 'live-page',
    [HOME_PAGE]: 'index-home',
  }[pageType];

  if (!campaignID) {
    // eslint-disable-next-line no-console
    console.error(
      `ATI Event Tracking Error: Could not get the page type's campaign name`,
    );
  }

  return campaignID;
};

const NO_TRACKING_PROPS = {};

type EventTrackingProviderProps = {
  pageData?: object | null;
};

export const EventTrackingContextProvider = ({
  children,
  pageData = null,
}: PropsWithChildren<EventTrackingProviderProps>) => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { enabled: eventTrackingIsEnabled } = useToggle('eventTracking');

  // TODO: Enable event tracking for NextJS pages
  if (!eventTrackingIsEnabled || !pageData || requestContext.isNextJs) {
    return (
      <EventTrackingContext.Provider value={NO_TRACKING_PROPS}>
        {children}
      </EventTrackingContext.Provider>
    );
  }

  const campaignID = getCampaignID(
    requestContext.pageType as CampaignPageTypes,
  );
  const { pageIdentifier, platform, statsDestination } =
    buildATIEventTrackingParams(pageData, requestContext, serviceContext);
  const trackingProps = {
    campaignID,
    pageIdentifier,
    platform,
    producerId: serviceContext.atiAnalyticsProducerId,
    statsDestination,
  };
  const hasRequiredProps = Object.values(trackingProps).every(Boolean);

  return (
    <EventTrackingContext.Provider
      value={hasRequiredProps ? trackingProps : NO_TRACKING_PROPS}
    >
      {children}
    </EventTrackingContext.Provider>
  );
};
