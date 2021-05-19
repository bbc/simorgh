import React, { createContext, useContext } from 'react';
import { node } from 'prop-types';

import { pageDataPropType } from '#models/propTypes/data';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildATIClickParams } from '#containers/ATIAnalytics/params';
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
} from '#app/routes/utils/pageTypes';

export const EventTrackingContext = createContext({});

export const EventTrackingContextProvider = ({ children, pageData }) => {
  let pageIdentifier;
  let platform;
  let statsDestination;

  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { enabled: eventTrackingIsEnabled } = useToggle('eventTracking');

  if (pageData && eventTrackingIsEnabled) {
    try {
      ({ pageIdentifier, platform, statsDestination } = buildATIClickParams(
        pageData,
        requestContext,
        serviceContext,
      ));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `ATI Event Tracking Error: Could not parse tracking values from page data:\n${error.message}`,
      );
    }
  }

  const { pageType } = requestContext;
  const campaignName = {
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
  }[pageType];

  if (!campaignName && pageData) {
    // eslint-disable-next-line no-console
    console.error(
      `ATI Event Tracking Error: Could not get the page type's campaign name`,
    );
  }

  const hasRequiredProps = [
    campaignName,
    pageIdentifier,
    platform,
    statsDestination,
  ].every(Boolean);
  const trackingData = hasRequiredProps
    ? {
        campaignName,
        pageIdentifier,
        platform,
        statsDestination,
      }
    : {};

  return (
    <EventTrackingContext.Provider value={trackingData}>
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
