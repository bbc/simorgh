import React, { createContext, useContext } from 'react';
import { node } from 'prop-types';

import { pageDataPropType } from '#models/propTypes/data';
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
} from '#app/routes/utils/pageTypes';
import { ServiceContext } from '../ServiceContext';

export const EventTrackingContext = createContext({});

const getCampaignID = pageType => {
  const campaignID = {
    [ARTICLE_PAGE]: 'article',
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

export const EventTrackingContextProvider = ({ children, pageData }) => {
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { enabled: eventTrackingIsEnabled } = useToggle('eventTracking');

  if (!eventTrackingIsEnabled || !pageData) {
    return (
      <EventTrackingContext.Provider value={NO_TRACKING_PROPS}>
        {children}
      </EventTrackingContext.Provider>
    );
  }

  const campaignID = getCampaignID(requestContext.pageType);
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

EventTrackingContextProvider.propTypes = {
  children: node.isRequired,
  pageData: pageDataPropType,
};

EventTrackingContextProvider.defaultProps = {
  pageData: null,
};
