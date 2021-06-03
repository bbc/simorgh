import React, { useEffect, useState, useContext } from 'react';
import 'isomorphic-fetch';
import { oneOf, string, elementType, shape, node } from 'prop-types';
import {
  MostReadList,
  MostReadItemWrapper,
  MostReadRank,
  MostReadLink,
} from '@bbc/psammead-most-read';
import { scriptPropType } from '@bbc/gel-foundations/dist/prop-types';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import nodeLogger from '#lib/logger.node';
import { shouldRenderLastUpdated } from '#lib/utilities/filterPopularStaleData/isDataStale';
import LastUpdated from './LastUpdated';
import processMostRead from '../utilities/processMostRead';
import mostReadShape from '../utilities/mostReadShape';
import {
  MOST_READ_CLIENT_REQUEST,
  MOST_READ_FETCH_ERROR,
} from '#lib/logger.const';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

const TrackedMostReadLink = ({
  dir,
  service,
  script,
  title,
  href,
  size,
  eventTrackingData,
  children,
}) => {
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  return (
    <MostReadLink
      dir={dir}
      service={service}
      script={script}
      title={title}
      href={href}
      size={size}
      onClick={clickTrackerHandler}
    >
      {children}
    </MostReadLink>
  );
};

TrackedMostReadLink.propTypes = {
  dir: oneOf(['rtl', 'ltr']),
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  title: string.isRequired,
  href: string.isRequired,
  children: node, // this node will be a timestamp container
  size: oneOf(['default', 'small']),
  eventTrackingData: shape({
    componentName: string,
  }),
};

TrackedMostReadLink.defaultProps = {
  dir: 'ltr',
  children: null,
  size: 'default',
  eventTrackingData: null,
};

const logger = nodeLogger(__filename);

const CanonicalMostRead = ({
  endpoint,
  columnLayout,
  size,
  initialData,
  wrapper: Wrapper,
  eventTrackingData,
}) => {
  const { isAmp } = useContext(RequestContext);
  const {
    service,
    script,
    dir,
    datetimeLocale,
    serviceDatetimeLocale,
    timezone,
    mostRead: { lastUpdated, numberOfItems },
  } = useContext(ServiceContext);
  const viewRef = useViewTracker(eventTrackingData);

  const filteredData = processMostRead({
    data: initialData,
    isAmp,
    numberOfItems,
    service,
  });

  const [items, setItems] = useState(filteredData);

  useEffect(() => {
    if (!items) {
      const handleResponse = url => async response => {
        if (!response.ok) {
          throw Error(
            `Unexpected response (HTTP status code ${response.status}) when requesting ${url}`,
          );
        }
        const mostReadData = await response.json();
        setItems(
          processMostRead({
            data: mostReadData,
            isAmp,
            numberOfItems,
            service,
          }),
        );
      };

      const fetchMostReadData = pathname => {
        logger.info(MOST_READ_CLIENT_REQUEST, { url: endpoint });

        return fetch(pathname)
          .then(handleResponse(pathname))
          .catch(error => {
            logger.error(MOST_READ_FETCH_ERROR, {
              url: pathname,
              error: error.toString(),
            });
          });
      };

      fetchMostReadData(endpoint);
    }
  }, [
    endpoint,
    numberOfItems,
    datetimeLocale,
    lastUpdated,
    script,
    service,
    timezone,
    items,
    isAmp,
  ]);

  if (!items) {
    return null;
  }

  const locale = serviceDatetimeLocale || datetimeLocale;

  return (
    <Wrapper>
      <MostReadList
        numberOfItems={items.length}
        dir={dir}
        columnLayout={columnLayout}
      >
        {items.map((item, i) => (
          <MostReadItemWrapper
            dir={dir}
            key={item.id}
            columnLayout={columnLayout}
            ref={viewRef}
          >
            <MostReadRank
              service={service}
              script={script}
              listIndex={i + 1}
              numberOfItems={items.length}
              dir={dir}
              columnLayout={columnLayout}
              size={size}
            />

            <TrackedMostReadLink
              dir={dir}
              service={service}
              script={script}
              title={item.title}
              href={item.href}
              size={size}
              eventTrackingData={eventTrackingData}
            >
              {shouldRenderLastUpdated(item.timestamp) && (
                <LastUpdated
                  prefix={lastUpdated}
                  script={script}
                  service={service}
                  timestamp={item.timestamp}
                  locale={locale}
                  timezone={timezone}
                />
              )}
            </TrackedMostReadLink>
          </MostReadItemWrapper>
        ))}
      </MostReadList>
    </Wrapper>
  );
};

CanonicalMostRead.propTypes = {
  endpoint: string.isRequired,
  columnLayout: oneOf(['oneColumn', 'twoColumn', 'multiColumn']),
  size: oneOf(['default', 'small']),
  initialData: mostReadShape,
  wrapper: elementType,
  eventTrackingData: shape({
    componentName: string,
  }),
};

CanonicalMostRead.defaultProps = {
  columnLayout: 'multiColumn',
  size: 'default',
  initialData: null,
  wrapper: React.Fragment,
  eventTrackingData: null,
};

export default CanonicalMostRead;
